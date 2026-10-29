# Platforms

Where Musetric's models run, and what each kind of platform tends to do to
them. This page keeps the general picture only; each concrete problem, with
its device, version, reproduction and workaround, lives in an issue.

## Where the models run

Every model runs in a web page, through onnxruntime-web and the product's own
WGSL, with the same code and the same model file on every platform, and none
runs natively ([R-8](../decisions/r08-models-run-in-the-page.md)). All of them
run on WebGPU but S-KEY, the small key model, which runs on wasm in the same
page on every platform. The page is the executor: inside the app it is a
WebView (Android System WebView, WKWebView on Apple systems, WebView2 on
Windows), and the desktop server can also start a headless browser for it. The Rust host
decodes the audio, drives the processing queue and hands the executor one
model run at a time.

So the platform under the models is a browser engine, its WebGPU
implementation and the GPU driver below it, and all three change with
updates the project does not control.

## What to expect

- **Mobile GPUs on Android** are where results go wrong silently. Shader
  compilers and drivers of phone GPUs, Qualcomm's among them, can miscompile
  a kernel or drop its work without an error, differently from one GPU
  generation to the next, and a browser update can break a device that worked
  the day before. A wrong result looks like a normal one. They may read
  float16 subnormals as zero, so a float16 graph goes wrong first on quiet
  input. The defects found so far and their workarounds:
  [#975](https://github.com/musetric/musetric/issues/975).
- **Apple systems** (macOS, iPadOS, iOS on Apple silicon, from version 26,
  the first whose WKWebView has WebGPU:
  [R-40](../decisions/r40-apple-from-version-26.md)) are where memory
  runs out. WebKit limits the memory of the process that holds the page, GPU
  memory included, and the limit is far stricter on an iPhone than on a Mac;
  GPU work stops when the app leaves the screen, and some WebGPU limits are
  lower than elsewhere:
  [#1052](https://github.com/musetric/musetric/issues/1052),
  [#1088](https://github.com/musetric/musetric/issues/1088).
- **Desktop GPUs** are mostly stable. Integrated GPUs occasionally miscompile
  as phones do, and on a laptop with two GPUs the browser engine may pick the
  integrated one unless told otherwise.
- **A WebView is not the browser.** It lacks some features the browser has,
  its audio timing differs, and its version follows its own updates. A result
  in a desktop browser proves nothing about the app on a phone.
- **A declared limit is not a proven one.** The limits an adapter reports,
  such as the largest buffer it binds, are not proof that a buffer of that
  size works on it; a model that needs one probes it on the device.
- **WebGPU fails quietly.** A shader that does not compile gives an invalid
  pipeline whose dispatches do nothing, so the output stays zero instead of an
  error; limits differ by platform, and a model has to fit the lowest of them.
- **The runtime shapes memory and responsiveness.** How much GPU memory a
  model holds is set by onnxruntime-web's allocation plan more than by the
  size of its weights, and a long queue of GPU work freezes a phone's screen:
  [#958](https://github.com/musetric/musetric/issues/958),
  [#957](https://github.com/musetric/musetric/issues/957).

## How it is kept under control

- The parity run compares every step from the original model to WebGPU on
  each kind of device: [#972](https://github.com/musetric/musetric/issues/972).
  Its cases include quiet and lowered-level input.
- A GPU defect is located against the same device's wasm provider on the
  same bytes, narrowed by moving families of nodes off the GPU, worked
  around by a graph rewrite in the lab, then pinned and confirmed by the
  parity run.
- A suspected driver defect is told apart from our own shader by running the
  same WGSL through Dawn on desktop Vulkan and D3D12: exact there and wrong on
  the phone points at the driver.
- One model file serves every device; a platform's defect is worked around
  in that file or in the runtime, not with a second file for that platform.
- A new problem gets its own issue, and a platform defect is added to #975;
  this page changes only when the general picture does.

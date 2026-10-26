# The product

Musetric is one application for Windows, macOS, Android and iOS; Linux is
not supported yet ([R-6](decisions/r06-linux-not-supported-yet.md)). A Tauri
shell runs the Rust host and shows the React
interface in the platform's WebView, and the models run on WebGPU in a web
page, the same way everywhere. How each part works is in the source and the
readmes of [musetric/musetric](https://github.com/musetric/musetric); where the
models run and what each platform does to them is in
[environment/platforms.md](environment/platforms.md).

## Where it stands

Musetric is preparing its first release; nothing has been released yet. The
release is the goal of
[musetric/musetric#1099](https://github.com/musetric/musetric/issues/1099),
and it waits on three things:

- **Correct results on phones.** The defects of mobile GPUs are worked around
  one by one ([#975](https://github.com/musetric/musetric/issues/975)), and
  no check yet follows a step from the original model to the result on a
  phone ([#972](https://github.com/musetric/musetric/issues/972)).
- **Processing that fits the device.** On the iPhone the models do not fit
  in the memory the page may use
  ([#1088](https://github.com/musetric/musetric/issues/1088)), macOS restarts
  processing in a loop
  ([#1052](https://github.com/musetric/musetric/issues/1052)), and processing
  must become several times faster without losing quality
  ([#1080](https://github.com/musetric/musetric/issues/1080)) while the phone
  stays responsive
  ([#957](https://github.com/musetric/musetric/issues/957)) and within its
  memory ([#958](https://github.com/musetric/musetric/issues/958)).
- **The release itself.** No build has been published, installed and updated
  yet ([#1100](https://github.com/musetric/musetric/issues/1100)), the macOS
  build is not signed
  ([#1101](https://github.com/musetric/musetric/issues/1101)), and the site
  neither offers the app nor lets a visitor try it in the browser
  ([#1115](https://github.com/musetric/musetric/issues/1115),
  [R-39](decisions/r39-browser-version-is-the-site.md)).

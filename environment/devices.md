# Test devices

General know-how for running pages, measurements and builds on test devices.
Which devices are available is a fact of the environment at hand; find it out
for each task, as [practices/resources.md](../practices/resources.md) says.

## Every device

- **Record the environment of every result**: the device, the system, the
  browser or WebView and its version, the GPU, and the temperature. Each of
  them changes the result, and a result without them cannot be compared or
  repeated.
- **Leave nothing behind after a run**: close the pages it opened and remove
  the port mappings it made. A page left open from an interrupted run can
  wake up later and report into the next run's server.
- **Heat changes timings.** Phones and fanless machines slow down as they
  warm; a timing run notes the temperature before and after, and old and new
  variants alternate within one session.
- **An emulator or a simulator stands for no device.** Its GPU, WebView and
  memory are not those of a phone; a result there checks the code, not the
  device.
- **WebGPU exists only in a secure context**: on `localhost` or over HTTPS. A
  page served by address over the network has no WebGPU.
- **One configuration, one browser process.** A session leaves GPU memory
  behind it, so several configurations measured in one process disturb each
  other; each starts in a fresh process.
- **A measurement in the background is not valid.** The system throttles a
  page's timers when it leaves the front and may end its process.
- **No error does not mean an option applied.** onnxruntime-web ignores an
  option it does not know without a word; an option is checked by what it
  visibly changes, or by provoking it with a value it must refuse.
- **A log line counts for a run only when it is tied to that run**, by the
  run's own identifier: other pages and earlier runs write into the same log.

## Android phones

- A phone attached over USB opens pages served by the computer through
  `adb reverse`, so a page on the phone reaches the computer's server as
  `localhost`.
- Keep the screen on and the phone unlocked during a run. A locked or
  sleeping phone hides the page, which then stops sending its results; to cool
  a phone, leave it idle with the screen on.
- Vendors' own system apps can come to the front over the browser and pause
  the page; check that the page is in front and visible before a series.
- A long run's output overruns logcat's default buffer of 256 KiB; enlarge
  it before the run (`adb logcat -G 16M`).
- An app's WebView renders in a separate sandboxed process that belongs to
  the WebView package, not to the app: a process list filtered by the app's
  package misses it, and the app's memory is the sum of both processes.
- Some of the system's own reports do not see what matters under load: its
  memory report misses the GPU memory of WebGPU, its thermal status can stay
  at zero while the phone already slows down, and its frame histogram ends in
  a bucket of frames whose length is unknown. Read the GPU memory, the clocks
  and per-frame timestamps directly. framestats keeps only the latest frames:
  once its ring is full, every statistic taken from it, the median included,
  covers only the end of the run.
- **The system takes a swipe that starts near the edge.** In gesture navigation
  a swipe inward from the side is Back, and the page sees it cancelled; a
  press held before it moves stays with the page. Whatever a finger drags keeps
  out of these zones, about 32 px on either side of a Galaxy S24; they vary with
  the phone and its settings, so they are measured on it, by the touches the
  page receives. `setSystemGestureExclusionRects` is no way out for long: it
  honors 200 dp per side, counted from the bottom, and does not reach a vendor's
  own window over the app, such as the Edge Panels handle of a Samsung phone:
  [#1196](https://github.com/musetric/musetric/pull/1196).
- **The thermal gate of a run.** A run starts at thermal status 0 or 1, no
  new run starts at 2, and a run stops at 3 or above to cool; a phone is never
  driven to 4 for an experiment. Record the status before, during and after,
  and whether it was read at all: a page outside the app has no thermal
  bridge, and a missing status is not 0.

## Apple devices

- An iPhone or an iPad is inspected over USB with Web Inspector, from a Mac
  or through a WebKit debug proxy. Only a debug build of the app lets its
  WebView be inspected.
- Memory is the limit to watch: measure the process's footprint next to its
  kill limit, and give each heavy measurement a page process of its own, so
  that nothing of an earlier measurement stays in it; what the project's
  earlier steps leave there is set up as
  [tracker.md](../practices/tracker.md#measurements) says. WebKit's memory
  categories are not the footprint the limit counts.
- Never look for a page's headroom by filling memory until the system kills
  it: that exhausts the system's compressed memory, and the system then ends
  dozens of processes, the browser among them.
- Safari's `error.stack` carries no message: the page hooks `uncapturederror`
  and the errors of pipeline creation itself. A page opened over the LAN gets
  WebGPU only over HTTPS; a self-signed certificate, accepted once, is enough.

## Desktop

- On a machine with two GPUs, a browser engine may come up on the
  integrated one, where the work never runs
  ([resources.md](../practices/resources.md#use-what-is-there-in-proportion)).
  Chromium picks one GPU for its whole GPU process: `powerPreference` does
  not move WebGPU off the integrated GPU, only the launch switch
  `--force_high_performance_gpu` does. Every launch of Chromium for the work
  passes it, tests and benches included, and the vendor and architecture of
  `adapter.info` show which GPU a page got before it computes.
- Several WebViews of one app that share a data folder must start with the
  same browser arguments, or the later ones fail to start.

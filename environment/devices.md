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
- **A browser in the background may stop answering.** A Galaxy S24 freezes
  Chrome once it leaves the front: its DevTools socket still accepts a
  connection but answers nothing, so a script that attaches to it waits until
  its timeout. A script brings the browser to the front before it connects.
- **A run that restarts the browser checks the tabs of others.** After a
  series that restarted Chrome with `am force-stop` before every
  configuration, one tab that another session had left open on the phone was
  gone. Such a run lists the open tabs by address before it starts and
  compares the list after it; a lost tab is opened again at the same address
  and reported.
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
  covers only the end of the run. On a Galaxy S24 the memory report gives no
  total for Chrome's renderer, a native-only sandboxed process, unless asked
  with `dumpsys meminfo --local <pid>`; a renderer read as 0 MB was not read.
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
- **A USB iPhone reaches the Mac as `localhost`** through an XCUITest runner
  that pairs every connection of the phone's pages with one the Mac opens over
  usbmux, as `adb reverse` does on Android: a page on `localhost` is a secure
  context, so it needs neither a certificate nor the local network permission
  ([the apple stand](https://github.com/musetric/lab/blob/ae99a9f/musetric_toolkit/engine_bench/apple/readme.md)).
  The same runner taps for a page that waits for a gesture and sends the app
  to the background.
- **iOS asks for the passcode to enable UI automation** after every restart
  and every lock, and the prompt expires in about a minute, so a phone driven
  by XCUITest stays unlocked for the whole session.
- **A WebContent process answers to launchd on iOS** (its responsible process
  is 1), so the page's process is found by the coalition of the app or Safari
  that hosts it. On a Mac it answers to the app, or to the app that started
  it when a script did; Chromium's renderers are the browser's children.
- **Safari starts an `AudioContext` only after a user gesture**; the app's
  WKWebView starts it without one. A driver gives Safari the gesture: a
  WebDriver click on a Mac, an XCUITest tap on an iPhone.
- **Safari outlives a WebDriver session** and reuses its WebContent processes
  in the next one, so a measurement that needs a fresh process quits Safari
  between configurations.
- **WebKit counts no underruns.** It has no `AudioContext.playbackStats`, and
  iOS logs no missed audio cycle, not even for a worklet stalled 1.5 s;
  coreaudiod on a Mac logs each IO overload with its client. In WebKit the
  worklet's own pauses between calls, against its callback period, stand in.
- **A covered window of the Mac app slows its WKWebView**: timers fall to
  about one a second and the audio clock loses time, so a measurement in the
  app brings its window to the front. The app's first window can be its
  hidden executor; a driver finds the main window by its title.
- **Safari on iOS may drop a page after a minute in the background** and load
  it anew on the return
  ([musetric/musetric#1278](https://github.com/musetric/musetric/issues/1278)),
  so a run that leaves Safari checks that its page is the same one.
- **Every page a run opens in Safari on a phone stays as a tab.** The run
  closes its own tabs by their titles afterwards and leaves the others; the
  tab overview also holds the switch to Private Browsing, which a careless tap
  turns on.

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

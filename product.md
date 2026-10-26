# The product

Musetric is one application for Windows, macOS, Android and iOS; Linux is
not supported yet ([R-6](decisions/r06-linux-not-supported-yet.md)). A Tauri
shell runs the Rust host and shows the React
interface in the platform's WebView, and the models run on WebGPU in a web
page, the same way everywhere. How each part works is in the source and the
readmes of [musetric/musetric](https://github.com/musetric/musetric); where the
models run and what each platform does to them is in
[environment/platforms.md](environment/platforms.md).

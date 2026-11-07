# App stores

What the stores ask of an app like Musetric. The first release is published
on GitHub Releases
([musetric/musetric#1100](https://github.com/musetric/musetric/issues/1100)).
Before it, the app is registered and in closed testing in every store it goes
to ([musetric/musetric#1208](https://github.com/musetric/musetric/issues/1208)),
since a store's review and testing take weeks; its public listings come after
the release.

- **Apple's guideline 2.5.2: an app downloads no code.** The models are data:
  the app downloads only their files, and the code that runs them ships in
  the bundle. The listing and the answers to a review say so in these words.
- **Privacy labels on Apple and Data safety on Google Play** are answered
  from what the app actually sends. It sends nothing of the user's: it
  downloads its models and, on the desktop, its updates. The privacy policy
  is checked against that before every submission.
- **Notarization** is needed for macOS outside the store as well
  ([musetric/musetric#1101](https://github.com/musetric/musetric/issues/1101)).
- **The packages stay small**: the models are downloaded after the
  installation, so no package carries them.
- **The Mac App Store takes only an app in the App Sandbox**
  ([App Sandbox](https://developer.apple.com/documentation/security/app-sandbox)).
  The sandbox does not limit the GPU: every iOS app runs in one, and
  Musetric runs WebGPU on iOS. It keeps the app's data in its container
  under `~/Library/Containers`, so a store build and a GitHub build keep
  separate projects; it opens a file outside the container only when the
  user picks it; the app needs its entitlements for incoming and outgoing
  connections and for the microphone; and the store delivers the updates,
  so the app's own updater is off there
  ([guideline 2.4.5](https://developer.apple.com/app-store/review/guidelines/)).
- **The Microsoft Store's MSIX package can run with full trust**, outside an
  app container
  ([Microsoft Learn](https://learn.microsoft.com/en-us/windows/msix/desktop/desktop-to-uwp-behind-the-scenes)).
  Whether it moves the app's data folder, and how the sandbox of the Mac
  App Store holds on the app's own build, are checked in
  [musetric/musetric#1208](https://github.com/musetric/musetric/issues/1208).

# App stores

What the stores ask of an app like Musetric. The first release is published
on GitHub Releases
([musetric/musetric#1100](https://github.com/musetric/musetric/issues/1100));
the stores come after it.

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
- **The Mac App Store and the Microsoft Store** mean a sandbox, which limits
  access to the GPU and to files; they are considered after GitHub Releases.

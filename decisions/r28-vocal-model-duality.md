# R-28. The vocal model is Duality, with an 11-second window

**Decided** 2026-09-25.

## Decision

Vocals are separated from the instrumental by Mel-Band RoFormer Duality of
Aname (`Aname-Tommy/Mel-Band-Roformer_Duality`, Apache-2.0), with a window of
1100 frames, about 11 seconds.

## Why

The model before it turned out, by its weights, to be a fine-tune of a model
published without a licence, which the MIT label on its own card could not
cover. Of the models with a clean licence, Duality sounded clearly best to the
owner on the same tracks. A 15-second window, the one Duality was fine-tuned
on, scored only 0.1 dB better in median and was 4 to 5 percent slower.

## Where it applies

- [musetric/musetric#938](https://github.com/musetric/musetric/pull/938) and
  the model repository `musetric/aname-mel-band-roformer-duality-onnx`.
- The licence is checked on the weights before a model is chosen:
  [practices/models.md](../practices/models.md).

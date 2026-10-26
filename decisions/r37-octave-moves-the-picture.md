# R-37. The octave moves the picture, not the sound

**Decided** 2026-10-12.

## Decision

The key is chosen as an octave and semitones apart: semitones within six up
or down, and an octave up or down. A change of octave does not shift the
sound of the song. It moves the singer's line in the picture and in the
comparison, so that a user can sing an octave away from the original and see
whether they hit the notes. Only the lead voice is concerned; the backing and
the instrumental never move by an octave.

## Why

Every way tried to shift the whole mix by an octave distorted it badly when
the owner listened to it.

## Where it applies

- [musetric/musetric#1040](https://github.com/musetric/musetric/pull/1040),
  [#1041](https://github.com/musetric/musetric/pull/1041),
  [#1043](https://github.com/musetric/musetric/pull/1043).
- How the singer's voice should sound in the user's octave:
  [#1042](https://github.com/musetric/musetric/issues/1042).

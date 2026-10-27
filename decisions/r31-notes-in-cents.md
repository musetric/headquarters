# R-31. Notes compares in cents with the singer's own line

**Decided** 2026-10-05; replaces the agreement of 2026-07-04 to round the
verdict to the semitone and not to split the line into notes.

## Decision

The notes view compares a take with the singer's real pitch line in cents,
not rounded to the semitone. The line is split into notes, so that the
gestures at the edges of a note, such as a scoop, an overshoot, a fall or the
onset of vibrato, belong to that note. No written score is needed.

## Why

Rounding and comparing column by column hide what makes a student's singing
differ from the singer's, and the gestures of pitch inside a note affect how
it sounds the most.

## Where it applies

- The comparison in cents: `packages/spectrogram/src/comparison`.

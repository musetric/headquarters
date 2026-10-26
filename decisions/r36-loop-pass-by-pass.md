# R-36. A line is practised in a loop, and only the chosen try is kept

**Decided** 2026-10-11 to 2026-10-16.

## Decision

A user can loop a line of the song: the line plays again and again, and each
pass records a try. The tries are compared, and leaving the loop either puts
the chosen try into the recording or drops them all. Playing a range of the
song, once or in a cycle, belongs to the player and serves more than the loop.

## Why

Practice on one phrase should feed the full recording without leaving the
weaker tries behind in it.

## Where it applies

- [musetric/musetric#1051](https://github.com/musetric/musetric/pull/1051).

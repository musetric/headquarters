# The player and its cursor

How the song's position is shown and moved: the cursor, every view that
follows the song, and every gesture of the project page. What this page states is
required of the code ([about.md](about.md#where-the-truth-is)); a change to
the cursor, to playback, to a gesture or to a view that follows the song
starts here. The details and the measurements are in the issues it links,
above all epic
[musetric/musetric#1201](https://github.com/musetric/musetric/issues/1201).

## One moment, the one the user hears

- **Every view shows the same moment, from one source.** The spectrogram and
  its notes, the cursor line, the time ruler, the chords, the lyrics, the
  tracks, the progress bar and the time show the moment the user hears now,
  in every screen frame. Two views never disagree; only what a view rounds
  for reading differs, such as the time to the second
  ([#1059](https://github.com/musetric/musetric/issues/1059),
  [#1369](https://github.com/musetric/musetric/issues/1369)).
- **Sound and picture stay in sync.** The output's delay, on Bluetooth up to
  about 0.4 s, cannot be changed, so the picture waits for the sound instead
  of running ahead of it. After a calibration the cursor is within 5 ms of
  what is heard ([#1072](https://github.com/musetric/musetric/issues/1072)).
- **While playing, the cursor never steps back** except at a seek or a loop's
  turn, and never stands still unless the user holds it or the player waits
  for missing audio.

## Play and Stop

- **Play:** the picture stands still where it is until the sound is heard,
  then moves at the song's speed: no creeping ahead, no jump back
  ([#1060](https://github.com/musetric/musetric/issues/1060),
  [#1414](https://github.com/musetric/musetric/issues/1414)).
- **Stop:** the sound already sent to the output plays out, and the cursor
  goes on with it and stops where it ended; the next Play starts there, so no
  beat is heard twice. The sound fades out over 5 ms
  ([#1369](https://github.com/musetric/musetric/issues/1369)).
- **No command is lost.** A Play, a Stop or a Record pressed while another
  command prepares runs after it, in order; a Stop while a take arms cancels
  the take ([#1371](https://github.com/musetric/musetric/issues/1371)).

## Input comes before playback

Any input of the user has a higher priority than playback. A finger and the
mouse do on each view what this section states, and nothing more.

- **A press on a control stays in the control.** A button, a menu or a switch
  that lies over a view, such as the recording picker, the lanes of the
  spectrum, Chords and Loop, takes the press whole: the view under it neither
  stops the song, nor moves, nor seeks
  ([#1421](https://github.com/musetric/musetric/issues/1421)).
- **A press on a view stops the song where it is**: on the spectrogram, the
  tracks, the progress bar or the cursor line, from the touch on, with no drag
  needed. The user stops to think, holds, and moves the song where they want.
  The sound already in the output does not hold the picture back: the views
  follow the press at once
  ([#1323](https://github.com/musetric/musetric/issues/1323)).
- **While a press holds or drags, every view shows the moment under it at
  once**, the picture included, and nothing sounds. A flick goes on with
  inertia in silence. When the press lets go, or the inertia stops, the song
  seeks once and plays on from the moment shown
  ([#1414](https://github.com/musetric/musetric/issues/1414)).
- **A command acts once and holds nothing**: a key, the wheel or a button.
  Space plays and stops, and the arrows seek 5 s back or ahead.
- **During a take** the user may still hold, drag and seek: the take records
  nothing while held, and a new run of it starts at the release; a seek drops
  a loop's try in progress
  ([#1034](https://github.com/musetric/musetric/issues/1034)).

### The spectrogram only moves

In Notes and in Spectrum alike, and for a finger and the mouse alike, the
song's moment is the one under the cursor line, and only moving the picture
moves it
([#1421](https://github.com/musetric/musetric/issues/1421)).

- **A drag moves the picture**: along time it moves the song under the line,
  across it moves the pitches, and a flick goes on with inertia.
- **A tap or a click seeks nowhere.** It stops the song while it presses, and
  the song plays on from where it stood.
- **A pinch zooms**: time around the cursor line, so the moment under the line
  stays, and pitch around the fingers. With the mouse, a drag with Shift
  zooms.
- **The wheel is a command**: Shift and the wheel zoom time around the cursor
  line, Ctrl and the wheel zoom pitch around the pointer, and the song neither
  stops nor seeks.
- **The cursor line stays where the user leaves it.** The mouse takes it at
  once and a finger after a still press of 350 ms; a finger that moves before
  that drags the picture. Dragging the line places it on the screen, so that
  the user sets where the song's moment sits, and the picture does not move
  while the line is dragged
  ([#1014](https://github.com/musetric/musetric/issues/1014)).
- **In a loop** the picture moves only within the loop. An edge of the loop is
  a control: a drag of it moves the edge, at least 1 s from the other,
  scrolls the view when it nears the side of the screen, and plays a second
  at the edge when let go
  ([#1051](https://github.com/musetric/musetric/issues/1051)).

### The tracks and the progress bar: the mouse clicks, a finger moves

- **The mouse seeks where it clicks**, and with its button held a drag
  follows the pointer.
- **A finger only moves the song**: a drag moves it, the width of the lanes
  or of the bar standing for the whole song, and a tap seeks nowhere.

### The lyrics

- **The line sung stands in the middle.** The lyrics bring the active line to
  the middle of their view, by whole lines, when it is below the middle or
  above the top edge, and leave it where it is while it is in the upper half,
  as after a seek back, until it reaches the middle.
- **They move only with the song and the user's seeks**: when a new line
  becomes active while the song plays or records, and at once at every seek
  the user makes. With the song stopped and no seek, nothing moves them.
- **A scroll by the user sets them free for 5 s.** For 5 s after the user's
  last scroll they stay where the user left them, except at a seek the user
  makes; then, while the song plays or records, they come back to the active
  line.
- **A tap on a word is a command**: it seeks to just before the word and
  holds nothing. While a loop's range is set, a tap on a word outside the loop
  moves the loop to that word's line.
- **A drag over words sets a loop over them**; a finger starts it with a still
  press of 350 ms.

### The volume of a track

- **Only a drag changes it**, in the mixer and on the tracks, by a finger and
  the mouse alike, and a tap changes nothing. The volume moves twice as fast
  as the drag, at the same rate along the whole bar, so a drag over half the
  bar takes it from silence to full.

## Seeks and waits

- **A seek shows its target at once.** The sound fades out over 5 ms, waits
  in silence while the audio around the target is still missing, then fades
  in ([#1364](https://github.com/musetric/musetric/issues/1364)).
- **A wait for missing audio shows nothing**: every view stands still at the
  target until the sound starts.
- **A missing piece of audio never moves the position**, and inside a loop a
  seek stays within it
  ([#1051](https://github.com/musetric/musetric/issues/1051)).

## Loops, tempo and the screen

- **A loop's turn** wraps the cursor to the loop's start with no step back and
  nothing shown past its end
  ([#1279](https://github.com/musetric/musetric/issues/1279)).
- **A new tempo** changes the cursor's speed when the new tempo is heard, with
  no jump; a new key never cuts the sound.
- **Back on screen** while the song plays, every view jumps at once to the
  moment heard ([#1278](https://github.com/musetric/musetric/issues/1278)).
- **The system's controls**, the lock screen and the headset, show the same
  position, updated on Play, Stop, a seek, a tempo change and the release of a
  hold.

## How it is checked

A check of this page acts as the user
([code.md](practices/code.md)): on a phone, a tap, a swipe, a flick or a pinch
goes to the real view, and the check reads what the views draw and what the
output plays. A number of the engine that is right proves nothing of the
picture: #1414 broke the drag while every such number held.

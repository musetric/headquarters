# The domain

How the product names and shapes what it is about: songs, stems, steps,
recordings and practice. Musetric takes from domain-driven design what
closes its own problems, and only that: one language shared with the people
who learn (its ubiquitous language), clear boundaries between the parts (its
bounded contexts), and each rule of the product kept in one place. It does
not take the method's ceremony.

- **One word for one thing, everywhere.** The interface, the decisions, the
  API, the database and the code call a thing by the same word, the one a
  singer, a musician or a teacher would use. Two words for one thing, or one
  word for two things, is a defect of the product, not a matter of style:
  every reader, a person or an agent, translates between them, and sooner or
  later translates wrong.
- **A name says what the thing is.** A name taken from how a thing is
  stored, computed or sent, or one that means something else to a musician,
  is replaced by the name of what the thing means. A rename changes the
  interface, the API, the database and the code at once, as a changed
  contract does.
- **The words of the product are defined in headquarters.**
  [product.md](../product.md) and the [decisions](../decisions/readme.md)
  name the concepts, and the code follows them. A new concept gets its name
  there in the same change that brings it into the code. A word that differs
  between them and the code is a contradiction, resolved as the
  [charter](../charter.md) requires.
- **Each part speaks its own language at its boundary.** A part that serves
  the product without being about music, such as the executor, the FFT or
  the codecs, knows nothing of songs or recordings: it speaks of its own
  jobs, frames and files, and the part that calls it translates. Knowledge
  of the product that leaks into such a part, or its technical words that
  leak into the product, are moved back.
- **A rule of the product has one home.** A rule such as "exactly one
  recording is active" ([R-34](../decisions/r34-several-recordings.md)) is
  kept next to the concept it governs and is found by its name, not inside a
  storage query or a transport handler. One implementation serves both sides
  of a boundary where it can ([code.md](code.md)); where it cannot, as when
  the host and the audio thread need the same rule, the copies share their
  test cases.
- **Where the method would clearly help, its absence is a reason to
  revisit.** A concept spread over many places, a rule kept in several
  copies, or two parts that each reach into the other is a problem of the
  product's design. It goes to an issue and is solved by reshaping that
  part toward a simpler whole, as the charter's
  [quality and simplicity](../charter.md#quality-and-simplicity) asks, not
  by adding structure on top of it.
- **No ceremony.** Layers, repositories, interfaces with one implementation,
  domain events and mappings between copies of one shape are not added to
  follow the method. Code that is compact, clear and does its job stays as
  it is. Signal processing, codecs, the GPU runtime and the audio thread are
  algorithms and runtime: the method's patterns do not apply to them, and
  their quality is the tests and the benchmark [code.md](code.md) asks of an
  algorithm.

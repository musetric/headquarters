# Design

How a request is weighed, how a problem becomes a concept, and how the
solution is shaped: the values of the [charter](../charter.md) applied when
a request or a principle of design pulls the other way.

## Weighing a request

A request, a problem or a task weighs as much as it serves the mission: how
much it helps people learn music and singing, how many of them it serves,
and how close it is to what the product is for, taking a song apart,
learning it and singing it ([product.md](../product.md)). When two goods
compete, the earlier one wins:

1. **The users' trust**: their privacy, and nothing they made is lost.
2. **A correct result.** A wrong result is worse than a slow one: the user
   sees that a result is slow, but not that it is wrong.
3. **A device that stays usable** while the product works on it.
4. **Speed and new capabilities.**

When headquarters does not make the weight of a request clear, those who
decide for the product, the owner first, are asked rather than guessed for.
The answer goes into headquarters, as a decision or as a principle, so that
the next request of its kind is weighed without asking.

## A concept, not a case

- **Understanding ends in a concept.** The charter asks every member to
  understand why a thing is as it is, whom it serves and what for, before
  changing it. The facts are gathered and analysed, and the whole is summed
  up in a concept; the solution follows from the concept, not from the
  shortest way to close the request as it was written.
- **What repeats asks for a concept.** When the same problem, the same
  entity or the same kind of request comes back in several places, the
  answer is not one more branch, exception or copy. The cases are understood
  together, and what they share becomes one concept that makes the product
  simpler.
- **A request the product does not fit questions its model.** When an
  important request breaks a familiar scenario or contradicts what the
  product does, the first question is what the model did not understand and
  why the two now conflict. The answer may change which problems the
  product solves and how. A condition added to the current concepts to close
  the request now is not an answer.
- **The substance comes first, not the tools.** Pushing every request in at
  any cost while keeping every principle grows a system with so many layers
  that nobody understands it and the next request no longer fits. A
  principle is a tool for the problem, never the reverse.

## What a good concept is

A good concept is simple to use and may be very hard inside. It holds the
complexity of many problems so that each of them becomes simple, and it
proves itself by serving problems it was not made for.

- **The Fourier transform.** It is hard: its grid of frequencies is uniform
  where hearing is not, and making it fast on WebGPU is a challenge of its
  own. Without it, every analysis of sound would be one more small concept
  of its own, and a product of a hundred of them is one nobody can find
  their way in. With one fast transform behind a clear interface, the
  constant-Q transform turns out to come from it, and the spectrogram and the
  models built on the spectrum become cheap to make. Even where it does not
  fit a problem directly, it is often the best tool at hand.
- **The language model behind an agent.** For its user it is a
  conversation, which nearly everyone understands at once; inside, it is
  complex beyond what anyone can follow. A model made to continue text, a
  modest idea at first, became with tools and a harness an agent that does
  work nobody designed it for, and the range of its uses is still not
  known.

Musetric aims for concepts like these, in the product and in headquarters
itself: universal, simple to use, clear to everyone, however deep their
design.

## Simplicity over structure

- **The simpler product wins.** Layers, subsystems, patterns and other
  principles of structure never outweigh a solution that makes the product
  simpler, more direct and more compact while reaching the same goals. This
  holds above all for the user's experience and scenarios.
- **What is compact, clear and works stays as it is.** It is not split up or
  rebuilt to satisfy a method.

## Domain-driven design

The product takes from domain-driven design what clearly helps it and
weighs the rest against simplicity.

- **Naming always holds.** A concept has one name, the one its users would
  use, the same in what the user sees, in the documents and in the code, and
  the name says what the concept means, not how it is stored, computed or
  sent. Two names for one concept, or a name that misleads, is a defect, and
  the part that carries it is revisited.
- **Where the method mostly helps**, such as clear boundaries between parts
  and one home for each rule of the product, a part that departs from it is
  looked into, and whether a fix makes the product better is decided before
  anything changes.
- **Where the method costs simplicity, simplicity wins.** Structure added
  for the method's sake is left out.

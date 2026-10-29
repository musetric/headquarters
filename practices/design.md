# Design

How a problem is understood and how its solution is shaped. The
[charter](../charter.md) puts quality and simplicity first; this page says
what that means when a request or a design principle pulls the other way.

## Understanding first

- **A problem is understood before it is solved.** The request, the goal of
  the product behind it and the scenario of the user are made clear, the
  facts are gathered and analysed, and the whole is summed up in a concept.
  The solution follows from the concept, not from the shortest way to close
  the request as it was written.
- **A request the product does not fit questions the model of the product.**
  When an important request breaks a familiar scenario or contradicts what
  the product does, the first question is what the model did not understand
  and why the two now conflict. The answer may change which problems the
  product solves and how. A condition or an edge case added to the current
  concepts to close the request now is not an answer.
- **The substance comes first, not the tools.** Pushing every request in at
  any cost while keeping every principle grows a system with so many layers
  that nobody understands it and the next request no longer fits. A
  principle is a tool for the problem, never the reverse.

## Simplicity over structure

- **The simpler solution wins.** Layers, subsystems, patterns and other
  principles of structure never outweigh a solution that is simpler, more
  direct and more local and reaches the same goals of the product. This
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

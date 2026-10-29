# Principles

What holds for the whole product, whatever the platform, the feature or the
part. The principles follow from the [charter](charter.md), and
[product.md](product.md) applies them to every concept and part of the
product. A change that would break a principle starts by revisiting the
principle, never by an exception to it.

- **One way, the same everywhere.** Each job is done by one implementation,
  and it behaves the same on every platform, on every device and in every
  place the product runs. A second path for one platform, one device or one
  case is a second product to keep, and it drifts from the first. A defect
  of one platform is fixed in the one way, not routed around it.
- **Nothing of the user's is lost.** What the user made survives every
  change they make and every interruption: a reload, a crash, a closed app.
  Finished work is kept, and interrupted work resumes where it stopped.
- **Honest with the user.** The product shows only what is so. Progress
  counts only real work, what the user exports sounds like what they heard,
  and what the product cannot do is refused plainly and early rather than
  failing later.
- **The device stays the user's.** The product works within what the device
  can give and leaves it usable while it works.
- **Clear without explanation.** What the product does, and what a change
  does to what the user made, is clear from what the user sees and hears.

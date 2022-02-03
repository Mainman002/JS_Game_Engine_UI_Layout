export function InsideArea (position, size) {
  return {
    left: position.x,
    right: position.x + size.w,
    up: position.y,
    down: position.y + size.h
  }
}

export function IntersectArea (position, size) {
  return {
    left: position.x - size.w * 0.5,
    right: position.x + size.w * 2 * 0.5,
    up: position.y - size.h * 0.5,
    down: position.y + size.h * 2 * 0.5
  }
}

export function CompareAreas (A, B) {
  const check = (
    A.left >= B.left &&
      A.right <= B.right &&
      A.up >= B.up &&
      A.down <= B.down
  )

  return check
}

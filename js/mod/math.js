export function RandomNum (_min, _max) {
  return Math.floor(Math.random() * (_max - _min + 1)) + _min
}

export function RandomRound (_min, _max) {
  return Math.floor(Math.random() * (Math.floor(_max) - Math.floor(_min) + 1)) + Math.floor(_min)
}

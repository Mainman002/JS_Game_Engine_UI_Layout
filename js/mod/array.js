export function ArrayMove (arr, OldIndex, NewIndex) {
  if (NewIndex >= arr.length) {
    let k = NewIndex - arr.length + 1
    while (k--) {
      arr.push(undefined)
    }
  }
  arr.splice(NewIndex, 0, arr.splice(OldIndex, 1)[0])
  return arr // for testing
};

// returns [2, 1, 3]
// console.log(array_move([1, 2, 3], 0, 1))

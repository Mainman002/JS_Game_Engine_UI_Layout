export function Init (ImageDict) {
  return ImageDict
}

// Used on objects to display images
export function NewImage (src) {
  const image = new Image()
  image.src = src
  return image
}

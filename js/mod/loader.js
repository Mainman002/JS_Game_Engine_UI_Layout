// export function Init (ImageDict) {
//   return ImageDict
// }

// Used on objects to display images
// export function NewImage (src) {
//   const image = new Image()
//   image.src = src
//   return image
// }


// Used to initialize project images
export function Loader_Init(image_dict) {
  return image_dict;
}

// Used on objects to display images
export function Loader_Image(src) {
const image = new Image;
image.src = src;
return image;
}
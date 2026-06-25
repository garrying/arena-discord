export function largeImage(image) {
  if (!image) return undefined;
  return image.large?.src || image.medium?.src || image.src;
}

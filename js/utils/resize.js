export default (container, image) => {
  const containerProportion = container.width / container.height;
  const imageProportion = image.width / image.height;
  const newImage = {
    width: 0,
    height: 0
  };
  if (imageProportion < containerProportion) {
    newImage.height = Math.floor(container.height);
    newImage.width = Math.floor(container.height * imageProportion);
  } else {
    newImage.width = Math.floor(container.width);
    newImage.height = Math.floor(container.width / imageProportion);
  }
  return newImage;
};

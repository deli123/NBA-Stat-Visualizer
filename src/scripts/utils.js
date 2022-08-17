export const generateRandomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

export const generateRandomInt = (min, max) => {
  //The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min) + min);
};

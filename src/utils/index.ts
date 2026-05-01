export const getRandomInclusive = (min: number, max: number): number => {
  max = Math.ceil(max);
  min = Math.floor(min);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isMobileView = () =>
  window.matchMedia("only screen and (max-width: 450px)").matches;

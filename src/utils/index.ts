export const getRandomInclusive = (min: number, max: number): number => {
  max = Math.ceil(max);
  min = Math.floor(min);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isMobileView = () =>
  window.matchMedia("only screen and (max-width: 450px)").matches;

export const shuffle = <T>(arr: T[]): T[] => {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

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
};

export const monthsAgo = (isoDate: string, now = new Date()): number => {
  const [y, m, d] = isoDate.split("-").map(Number);
  const start = new Date(y, m - 1, d);

  if (
    !y || !m || !d ||
    start.getFullYear() !== y ||
    start.getMonth() !== m - 1 ||
    start.getDate() !== d
  ) throw new Error("Invalid date. Use YYYY-MM-DD");

  let whole = (now.getFullYear() - y) * 12 + (now.getMonth() - (m - 1));
  let anchor = new Date(y, m - 1 + whole, d);
  if (anchor > now) anchor = new Date(y, m - 2 + whole--, d);
  const next = new Date(y, m + whole, d);

  return +(whole + (now.getTime() - anchor.getTime()) / (next.getTime() - anchor.getTime())).toFixed(1);
};

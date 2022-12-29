export const shortenNumber = (num: number) => {
  if (Number.isNaN(num)) {
    return 0;
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(0).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0).replace(/\.0$/, '') + 'K';
  }
  return num.toFixed(0).toString();
};

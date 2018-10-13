module.exports = {
  normalize: (num, max, targetMax) => {
    return Math.floor((num / max) * targetMax);
  },
};

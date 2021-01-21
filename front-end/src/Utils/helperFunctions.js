const toMiles = (meters) => {
  const miles = meters * 0.000621371;
  if (miles > 10) {
    return Math.round(miles * 10) / 10;
  }
  return Math.round(miles * 100) / 100;
};

module.exports = {
  toMiles,
};

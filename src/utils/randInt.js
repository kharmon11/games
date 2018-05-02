// Generate random integer between 'min' and 'max'. 'min' is inclusive while 'max' is exclusive.
// randInt(1,11) can generate '1' but not '11'

const randInt = function(min, max) {
  min = Math.floor(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min) + min);
};
export {randInt};

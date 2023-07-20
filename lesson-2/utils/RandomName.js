const randomNameGenerator = (num) => {
  let random = '';
  for (let i = 0; i < num; i++) {
    random += String.fromCharCode(97 + Math.floor(Math.random() * 27));
  }
  return random;
};

module.exports = randomNameGenerator;

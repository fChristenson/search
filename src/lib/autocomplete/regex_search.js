const words = require("./words");

module.exports = (str, limit = 10) => {
  const results = words.filter(word => {
    return new RegExp(str).test(word);
  });

  return results.slice(0, limit);
};

const regexSearch = require("./regex_search");
const levenshteinSearch = require("./levenshtein_search");

module.exports = str => {
  //return regexSearch(str);
  return levenshteinSearch(str);
};

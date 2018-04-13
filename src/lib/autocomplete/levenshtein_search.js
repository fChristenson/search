const words = require("./words");

const levenshteinDistance = (str1, str1Len, str2, str2Len) => {
  let cost = 0;

  if (str1Len === 0) return 0;
  if (str2Len === 0) return 0;

  const str1LetterPointer = str1[str1Len];
  const str2LetterPointer = str2[str2Len];

  if (str1LetterPointer !== str2LetterPointer) {
    cost = 1;
  }

  const str1Dec = levenshteinDistance(str1, str1Len - 1, str2, str2Len) + 1;
  const str2Dec = levenshteinDistance(str1, str1Len, str2, str2Len - 1) + 1;
  const costInc =
    levenshteinDistance(str1, str1Len - 1, str2, str2Len - 1) + cost;

  return Math.min(str1Dec, str2Dec, costInc);
};

const similarity = (str1, str2) => {
  const str1Len = str1.length;
  const str2Len = str2.length;
  const distance = levenshteinDistance(str1, str1Len, str2, str2Len);
  const maxLen = Math.max(str1.length, str2.length);
  return 1 - distance / maxLen;
};

module.exports = (str, limit = 10) => {
  const results = words
    .filter(word => {
      const arr1 = word.split("");
      const arr2 = str.split("");

      const firstW = arr1.shift();
      const firstS = arr2.shift();

      const secondW = arr1.shift();
      const secondS = arr2.shift();

      return firstW === firstS && secondW === secondS;
    })
    .map(word => {
      return {
        word,
        rating: similarity(str, word)
      };
    })
    .sort((a, b) => {
      return b.rating - a.rating;
    })
    .map(obj => {
      return obj.word;
    });

  return results.slice(0, limit);
};

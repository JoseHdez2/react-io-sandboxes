export const cardRanks = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K"
];

const cardSuits = ["c", "d", "h", "s"];

const recombine = (array, array2, sep = "") =>
  array.flatMap((v, i) => array2.map(w => v + sep + w));

const getRank = cardStr => cardStr[0];
const getSuit = cardStr => cardStr[1];

const compareCardsPretty = (cardStrA, cardStrB) => {
  if (getSuit(cardStrA) < getSuit(cardStrB)) {
    return -1;
  }
  if (getSuit(cardStrA) > getSuit(cardStrB)) {
    return 1;
  }
  return compareCards(cardStrA, cardStrB);
};

const compareCards = (cardStrA, cardStrB) => {
  if (getSuit(cardStrA) < getSuit(cardStrB)) {
    return -1;
  }
  if (getSuit(cardStrA) > getSuit(cardStrB)) {
    return 1;
  }
  return 0;
};

const cards = recombine(cardRanks, cardSuits).sort(compareCardsPretty);

const suitSymbols = {
  c: "♣", // club
  d: "◆", // diamond
  h: "♥", // heart
  s: "♠" // spade
};

const suitColors = {
  c: "black", // club
  d: "red", // diamond
  h: "red", // heart
  s: "black" // spade
};

const prettifyCard = cardName =>
  [...cardName.cardName].map(c => suitSymbols[c] || c).join("");

const getColor = cardName => {
  return suitColors[cardName.cardName[1]];
};

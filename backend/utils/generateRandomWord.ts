const wordList: string[] = [
  "apple",
  "banana",
  "cherry",
  "dog",
  "elephant",
  "fish",
  "grape",
  "house",
  "ice",
  "jelly",
  "kite",
  "lion",
  "moon",
  "nut",
  "orange",
  "peach",
  "queen",
  "rose",
  "star",
  "tiger",
  "umbrella",
  "violet",
  "whale",
  "xray",
  "yellow",
  "zebra",
];

export const generateRandomWord = (): string => {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  const randomNextIndex = Math.floor(Math.random() * randomIndex);
  return `${wordList[randomIndex]}-${wordList[randomNextIndex]}`;
};

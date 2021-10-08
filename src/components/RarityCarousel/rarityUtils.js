import { rarityTable } from "../../../data/data.js";

export const getName = (value) => {
  if (value !== undefined) {
    var parts = value.split("/");
    var result = parts[parts.length - 1]; // Or parts.pop();
    var second = result.replace("-", " ");
    return second.replace(".png", "").toLocaleUpperCase();
  }
  return "";
};

export const getRarityName = (value) => {
  if (value === undefined) return "";
  return value.replace(".png", "").toLowerCase();
};

export const getRarityPercent = (value, category) => {
  let result = value.replace(".png", "");
  return rarityTable[category.toLowerCase()][result];
};

export const immutableDelete = (arr, index) => {
  return arr.slice(0, index).concat(arr.slice(index + 1));
};

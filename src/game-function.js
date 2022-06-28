export const getHiddenArray = (array) => {
  let hiddenArray = array;
  for (let i = 2; i < hiddenArray.length - 1; i++){
    hiddenArray.splice(i, 1, '_')
  }
  return hiddenArray;
}

export const checkArray = (input, completeArray, hiddenArray) => {
  console.log(completeArray.indexOf(input));
  if (completeArray.indexOf(input) >= 1) {
    hiddenArray.splice(completeArray.indexOf(input), 1, input);
    return hiddenArray;
  }
}
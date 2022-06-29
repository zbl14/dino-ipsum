export const getHiddenArray = (array) => {
  let hiddenArray = array;
  for (let i = 2; i < hiddenArray.length - 1; i++){
    hiddenArray.splice(i, 1, '_');
  }
  return hiddenArray;
};

export const checkArray = (input, completeArray, hiddenArray) => {
  if (completeArray.indexOf(input) >= 0){
    for(let i = 2; i < hiddenArray.length; i++){
      if(completeArray[i] == input){
        hiddenArray.splice(i, 1, input);
      }
    }
    return 0;
  } else {
    return 1;
  }
};
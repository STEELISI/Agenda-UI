export function generateID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export function deleteArrayElement(arr: any[], index: number) {
  if (arr.length > 1) 
    arr.splice(index, 1);
  else 
    arr.splice(index);

  return arr;
}

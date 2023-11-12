
const SortAscending = (arrayToSort = []) => {

     const newArray = [...arrayToSort].sort(({ noteText: a }, { noteText: b }) => a < b ? -1 : a > b ? 1 : 0);

     return newArray;
}

export default SortAscending;
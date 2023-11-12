
const SortDescending = (arrayToSort = []) => {

    const newArray = [...arrayToSort].sort(({ noteText: a }, { noteText: b }) => a < b ? -1 : a > b ? 1 : 0).reverse();

    return newArray;
}

export default SortDescending;
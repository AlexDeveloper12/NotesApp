
const SortAscending = (arrayToSort = []) => {
     const arraySortedAsc = arrayToSort.sort(({ dateCreated: a }, { dateCreated: b }) => a < b ? -1 : a > b ? 1 : 0);

     return arraySortedAsc
}

export default SortAscending;
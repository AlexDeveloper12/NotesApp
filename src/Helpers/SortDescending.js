
const SortDescending = (arrayToSort = []) => {
    var arraySortedDesc =  arrayToSort.sort(({ dateCreated: a }, { dateCreated: b }) => a < b ? -1 : a > b ? 1 : 0).reverse();

    return arraySortedDesc;
}

export default SortDescending;
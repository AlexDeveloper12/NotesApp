
const FilterSearch = (notesArray, keyword) => {

    let filteredArray = notesArray.filter(note => {
        return note.noteText.toLowerCase().includes(keyword)
    });

    return filteredArray;
}

export default FilterSearch;
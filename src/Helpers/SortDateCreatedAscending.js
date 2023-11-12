import moment from 'moment';

const SortDateCreatedAscending = (notesArray = []) => {

    const newArray = [...notesArray].sort((a, b) => new Date(a.dateCreated) -  new Date(b.dateCreated));

    return newArray;
}

export default SortDateCreatedAscending;
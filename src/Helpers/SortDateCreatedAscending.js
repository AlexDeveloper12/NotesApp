import moment from 'moment';

const SortDateCreatedAscending = (notesArray = []) => {
    const sortedArrayByDateCreatedAsc = notesArray.sort((a, b) => new Date(a.dateCreated) -  new Date(b.dateCreated));

    return sortedArrayByDateCreatedAsc;
}

export default SortDateCreatedAscending;
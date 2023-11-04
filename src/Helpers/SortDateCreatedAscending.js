import moment from 'moment';

const SortDateCreatedAscending = (notesArray = []) => {
    const sortedArrayByDateCreatedAsc = notesArray.sort((a, b) => moment(a.dateCreated, 'DD-MM-YYYY HH:ss').diff(moment(b.dateCreated, 'DD-MM-YYYY HH:ss')));

    return sortedArrayByDateCreatedAsc;
}

export default SortDateCreatedAscending;
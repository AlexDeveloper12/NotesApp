import moment from 'moment';

const SortDateCreatedAscending = (notesArray = []) => {
    const sortedArrayByDateCreatedAsc = notesArray.sort((a, b) => new moment(a.dateCreated).format('YYYYMMDDHHss') - new moment(b.dateCreated).format('YYYYMMDDHHss'));

    return sortedArrayByDateCreatedAsc;
}

export default SortDateCreatedAscending;
import FilterSearch from "../src/Helpers/FilterSearch";

describe('Filter  array', ()=>{
    it('Should filter the array depending on input value', ()=>{
        const testArray = [{
            id: 1,
            noteText: 'First Value',
            isFavourite: 'True',
            dateCreated: '2023-10-01T00:10:00'
        },
        {
            id: 2,
            noteText: 'First Value Two',
            isFavourite: 'True',
            dateCreated: '2023-10-31T00:12:00'
        }, {
            id: 3,
            noteText: 'Third Value',
            isFavourite: 'False',
            dateCreated: '2023-10-30T00:14:00'
        }, {
            id: 4,
            noteText: 'Fourth Value',
            isFavourite: 'False',
            dateCreated: '2023-10-31T00:09:48'
        }];

        let keyword = 'First Value'.toLowerCase();

        const testArrayCopy = [...testArray]

        let notesArray = FilterSearch(testArrayCopy,keyword);

        console.log('notesArray');

        console.log(notesArray);

        const expectedArray = [{
            id: 1,
            noteText: 'First Value',
            isFavourite: 'True',
            dateCreated: '2023-10-01T00:10:00'
        },
        {
            id: 2,
            noteText: 'First Value Two',
            isFavourite: 'True',
            dateCreated: '2023-10-31T00:12:00'
        }];

        expect(expectedArray).toEqual(notesArray);
    })
})
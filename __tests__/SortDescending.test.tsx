import SortDescending from "../src/Helpers/SortDescending";

describe('SortDescending', () => {
    it('returns the list in descending format', () => {
        const testArray = [{
            id: 1,
            noteText: 'First value',
            isFavourite: false,
            dateCreated: "2023-10-31T00:07:48.523Z"
        }, {
            id: 2,
            noteText: 'Second value',
            isFavourite: false,
            dateCreated: "2023-10-31T00:09:48.523Z"
        },
        {
            id: 3,
            noteText: 'Third value',
            isFavourite: false,
            dateCreated: "2023-10-31T00:11:48.523Z"
        },
        {
            id: 4,
            noteText: 'Fourth value',
            isFavourite: false,
            dateCreated: "2023-10-31T00:05:48.523Z"
        }]

        const result = SortDescending(testArray);

        const expected = [{
            id: 3,
            noteText: 'Third value',
            isFavourite: false,
            dateCreated: "2023-10-31T00:11:48.523Z"
        }, {
            id: 2,
            noteText: 'Second value',
            isFavourite: false,
            dateCreated: "2023-10-31T00:09:48.523Z"
        },
        {
            id: 4,
            noteText: 'Fourth value',
            isFavourite: false,
            dateCreated: "2023-10-31T00:05:48.523Z"
        }, {
            id: 1,
            noteText: 'First value',
            isFavourite: false,
            dateCreated: "2023-10-31T00:07:48.523Z"
        },
        ];

        expect(result).toEqual(expected);
    });
})
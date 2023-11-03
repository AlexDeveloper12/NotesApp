import GetLargestID from "../src/Helpers/GetLargestID";

describe('GetLargestID', () => {
    it('returns the largest number in a given array', () => {
        const testArray = [
            {
                id: 111,
                noteText: 'Third value',
                isFavourite: false,
                dateCreated: "2023-10-31T00:11:48.523Z"
            }, {
                id: 112,
                noteText: 'Second value',
                isFavourite: false,
                dateCreated: "2023-10-31T00:09:48.523Z"
            }, {
                id: 271,
                noteText: 'First value',
                isFavourite: false,
                dateCreated: "2023-10-31T00:07:48.523Z"
            },
            {
                id: 278,
                noteText: 'Fourth value',
                isFavourite: false,
                dateCreated: "2023-10-31T00:05:48.523Z"
            },
            {
                id: 401,
                noteText: 'Fifth value',
                isFavourite: false,
                dateCreated: "2023-10-31T00:05:48.523Z"
            }
        ];

        const result = GetLargestID(testArray);

        const expected = 401;

        expect(result).toBe(expected);
    });

})
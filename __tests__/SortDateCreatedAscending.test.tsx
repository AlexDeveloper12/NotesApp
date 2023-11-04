import SortDateCreatedAscending from "../src/Helpers/SortDateCreatedAscending";


describe('Sort notes by date created ascending order', () => {
    it('should sort notes in date created ascending order', async () => {

        const testArray = [{
            id: 1,
            noteText: "First value for date created ascending order",
            isFavourite: false,
            dateCreated: "2023-11-04T00:11:48.523Z"
        },
        {
            id: 2,
            noteText: "Second value for date created ascending order",
            isFavourite: false,
            dateCreated: "2023-10-31T00:11:48.523Z"
        },
        {
            id: 3,
            noteText: "Third value for date created ascending order",
            isFavourite: false,
            dateCreated: "2023-07-03T00:11:48.523Z"
        },
        {
            id: 4,
            noteText: "Fourth value for date created ascending order",
            isFavourite: false,
            dateCreated: "2023-07-03T00:12:48.523Z"
        }];

        const sortedArray = SortDateCreatedAscending(testArray);

        const expectedArray = [{
            id: 3,
            noteText: "Third value for date created ascending order",
            isFavourite: false,
            dateCreated: "2023-07-03T00:11:48.523Z"
        },
        {
            id: 4,
            noteText: "Fourth value for date created ascending order",
            isFavourite: false,
            dateCreated: "2023-07-03T00:12:48.523Z"
        },
        {
            id: 2,
            noteText: "Second value for date created ascending order",
            isFavourite: false,
            dateCreated: "2023-10-31T00:11:48.523Z"
        },
        {
            id: 1,
            noteText: "First value for date created ascending order",
            isFavourite: false,
            dateCreated: "2023-11-04T00:11:48.523Z"
        }
        ]

        expect(expectedArray).toStrictEqual(sortedArray);


    })
})
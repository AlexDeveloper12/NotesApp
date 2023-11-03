import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

beforeEach(() => {
    AsyncStorage.clear();
});

describe('Test Async Notes Deletion ', () => {
    it('Can delete async note by id property', async () => {

        const testArray = [
            {
                id: 3,
                noteText: 'Third value',
                isFavourite: false,
                dateCreated: "2023-10-31T00:11:48.523Z"
            }, {
                id: 2,
                noteText: 'Second value',
                isFavourite: false,
                dateCreated: "2023-10-31T00:09:48.523Z"
            }, {
                id: 1,
                noteText: 'First value',
                isFavourite: false,
                dateCreated: "2023-10-31T00:07:48.523Z"
            },
            {
                id: 4,
                noteText: 'Fourth value',
                isFavourite: false,
                dateCreated: "2023-10-31T00:05:48.523Z"
            }
        ];

        await AsyncStorage.setItem('note', JSON.stringify(testArray));

        const noteIdToDelete = 1;

        expect(testArray.length).not.toBeLessThan(4);

        const notesToFilter = testArray.filter(note => note.id != noteIdToDelete);

        await AsyncStorage.setItem('note', JSON.stringify(notesToFilter));

        const expectedNoteObjectArray = [
            {
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
            }
        ];

        const latestNotes = JSON.parse(await AsyncStorage.getItem('note'));

        expect(expectedNoteObjectArray).toEqual(latestNotes);
    });
})
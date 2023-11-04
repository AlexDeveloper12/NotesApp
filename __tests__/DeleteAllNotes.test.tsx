import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

describe('Delete all notes', () => {

    it('should be able to delete all notes in the list', async () => {

        const testArray = [{
            id: 1,
            noteText: 'first value',
            dateCreated: '',
            isFavourite: false
        },
        {
            id: 2,
            noteText: 'second value',
            dateCreated: '',
            isFavourite: false
        },
        {
            id: 3,
            noteText: 'third value',
            dateCreated: '',
            isFavourite: false
        },
        {
            id: 4,
            noteText: 'fourth value',
            dateCreated: '',
            isFavourite: false
        }]

        expect(true).toBe(false);

    })
})
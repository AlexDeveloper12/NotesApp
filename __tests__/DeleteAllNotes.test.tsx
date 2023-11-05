import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import DeleteAllNotes from "../src/Helpers/DeleteAllNotes";

describe('Delete all notes', () => {

    it('should be able to insert notes, check they are in async storage then delete and check they are deleted', async () => {

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
        }];

        await AsyncStorage.setItem('note', JSON.stringify(testArray));

        const getNotes = JSON.parse(await AsyncStorage.getItem('note'));

        const expectedNoteArrayObjects = [{
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
        }];

        expect(expectedNoteArrayObjects).toStrictEqual(getNotes);

        await DeleteAllNotes();

        const getNotesAfterDeletion = await AsyncStorage.getItem('note');

        expect(getNotesAfterDeletion).toBe(null)

    })
})
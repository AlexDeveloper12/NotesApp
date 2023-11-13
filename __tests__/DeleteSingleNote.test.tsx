import AsyncStorage from '@react-native-async-storage/async-storage';
import AddNote from '../src/Helpers/AddNote';
import { DeleteSingleNote } from '../src/Helpers/DeleteSingleNote';
import GetNotesList from '../src/Helpers/GetNotesList';

beforeEach(()=>{
    AsyncStorage.clear();
})

describe('Delete single note', () => {
    it('should be able to delete single note based on note id', async ()=>{

        const testArray = [];

        await AddNote(testArray,'test data','True','2023-11-03 11:00');

        let returnedObject = {}

        const getNotes = JSON.parse(await AsyncStorage.getItem('note'));

        returnedObject = getNotes[0];

        var expectedObject = {
            id:1,
            noteText:'test data',
            isFavourite:'True',
            dateCreated:'2023-11-03 11:00'
        }

        expect(expectedObject).toEqual(getNotes[0]);

        var idToDelete = 1;

        await DeleteSingleNote(getNotes,idToDelete);

        const getNotesAfterDeletion = JSON.parse(await AsyncStorage.getItem('note'));

        expect(getNotesAfterDeletion).toHaveLength(0);

    })
})
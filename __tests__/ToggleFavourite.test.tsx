import AsyncStorage from "@react-native-async-storage/async-storage";
import AddNote from "../src/Helpers/AddNote";
import GetNotesList from "../src/Helpers/GetNotesList";
import UpdateNoteFavourite from "../src/Helpers/UpdateNoteFavourite";

beforeEach(() => {
    AsyncStorage.clear();
})

describe('Update note property isFavourite', () => {
    it('can update isFavourite to be true', async () => {

        const testArray = [
            {
                id: 3,
                noteText: 'Third value',
                isFavourite: "False",
                dateCreated: "2023-10-31T00:11:48.523Z"
            }, {
                id: 2,
                noteText: 'Second value',
                isFavourite: "True",
                dateCreated: "2023-10-31T00:09:48.523Z"
            }
        ];

        AsyncStorage.setItem('note', JSON.stringify(testArray));

        const noteIDToUpdate = 3;

        await UpdateNoteFavourite(noteIDToUpdate);

        const latestNotes = JSON.parse(await AsyncStorage.getItem('note'));

        const expectedNoteArrayObjects = [
            {
                id: 2,
                noteText: 'Second value',
                isFavourite: "True",
                dateCreated: "2023-10-31T00:09:48.523Z"
            },
            {
                id: 3,
                noteText: 'Third value',
                isFavourite: "True",
                dateCreated: "2023-10-31T00:11:48.523Z"
            }
        ];

        expect(expectedNoteArrayObjects).toStrictEqual(latestNotes);

    }),

        it('can update isFavourite to true and then update isFavourite on same note to false', async () => {
            const testArray = [];

            await AddNote(testArray,'First Value',"True","2023-10-31T00:11:48.52");

            const notes = await GetNotesList();

            console.log(notes);

            await UpdateNoteFavourite(1);

            const notesAfterUpdate = await GetNotesList();

            console.log(notesAfterUpdate);

        })

})
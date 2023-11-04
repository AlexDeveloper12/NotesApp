import AsyncStorage from "@react-native-async-storage/async-storage";
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
                isFavourite: false,
                dateCreated: "2023-10-31T00:11:48.523Z"
            }, {
                id: 2,
                noteText: 'Second value',
                isFavourite: false,
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
                isFavourite: false,
                dateCreated: "2023-10-31T00:09:48.523Z"
            },
            {
                id: 3,
                noteText: 'Third value',
                isFavourite: true,
                dateCreated: "2023-10-31T00:11:48.523Z"
            }
        ];

        expect(latestNotes).toStrictEqual(expectedNoteArrayObjects);


    }),

        it('can update the same note back to false after initially setting to true', () => {


        })

})
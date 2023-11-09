import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import AddNote from "../src/Helpers/AddNote"
import GetNotesList from "../src/Helpers/GetNotesList";

beforeEach(() => {
    AsyncStorage.clear();
});

describe('GetNotesList', () => {
    it('Should be able to retrieve an object Array from Async Storage', async () => {
        let notes = [];
        
        var dateCreated = moment().format("DD-MM-YYYY HH:mm:ss")

        await AddNote(notes, 'test value first', 'True', dateCreated );

        const getCurrentNotes = await GetNotesList();

        const expectedArray = [{
            id: 1,
            noteText: 'test value first',
            isFavourite: 'True',
            dateCreated: dateCreated
        }];

        expect(expectedArray).toStrictEqual(getCurrentNotes)

    })
})
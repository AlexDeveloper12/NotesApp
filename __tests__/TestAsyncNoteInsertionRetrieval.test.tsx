import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import AddNote from "../src/Helpers/AddNote";

beforeEach(() => {
    AsyncStorage.clear();
});

describe('Test Async Notes', () => {
    it('can set and read async storage on a single string', async () => {

        const testNote = 'test note content'

        await AsyncStorage.setItem('note', testNote);
        let noteValue = await AsyncStorage.getItem('note');

        expect(noteValue).toBe(testNote);
    })

    it('can set and read async storage on an object', async () => {

        var dateCreated = moment().format("DD-MM-YYYY HH:mm:ss");

        const testObject = {
            id: 1,
            noteText: 'text content',
            isFavourite: "true",
            dateCreated: dateCreated
        }

        await AsyncStorage.setItem('note', JSON.stringify(testObject));
        let noteObjectExpected = JSON.parse(await AsyncStorage.getItem('note'));

        expect(noteObjectExpected).toStrictEqual(testObject);

    });

    it('can set and read async storage on an array of objects', async () => {

        var dateCreated = moment().format("DD-MM-YYYY HH:mm:ss");

        const testObjectArray = [];

        await AddNote(testObjectArray, "First Note", "False", dateCreated);
        await AddNote(testObjectArray, "Second Note", "True", dateCreated);
        await AddNote(testObjectArray, "Third Note", "False", dateCreated);
        await AddNote(testObjectArray, "Fourth Note", "True", dateCreated);

        //await AsyncStorage.setItem('note', JSON.stringify(testObjectArray));
        let noteObjectArrayExpected = JSON.parse(await AsyncStorage.getItem('note'));
        console.log(noteObjectArrayExpected);

        // expect(noteObjectArrayExpected).toEqual(testObjectArray);



    })
})



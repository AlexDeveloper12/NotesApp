import AsyncStorage from "@react-native-async-storage/async-storage";

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

        const testObject = {
            id: 1,
            noteText: 'text content',
            isFavourite: "true",
            dateCreated: "2023-10-31T00:09:48.523Z"
        }

        await AsyncStorage.setItem('note', JSON.stringify(testObject));
        let noteObjectExpected = JSON.parse(await AsyncStorage.getItem('note'));

        expect(noteObjectExpected).toStrictEqual(testObject);

    });

    it('can set and read async storage on an array of objects', async () => {

        const testObjectArray = [{
            id: 1,
            noteText: 'text content one',
            isFavourite: "true",
            dateCreated: "2023-10-31T00:09:48.523Z"
        },
        {
            id: 1,
            noteText: 'text content two',
            isFavourite: "true",
            dateCreated: "2023-10-31T00:09:58.523Z"
        }
        ];

        await AsyncStorage.setItem('note', JSON.stringify(testObjectArray));
        let noteObjectArrayExpected = JSON.parse(await AsyncStorage.getItem('note'));

        expect(noteObjectArrayExpected).toEqual(testObjectArray);



    })
})



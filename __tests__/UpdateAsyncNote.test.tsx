import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import FindAndUpdateNote from "../src/Helpers/FindAndUpdateNote";

beforeEach(() => {
    AsyncStorage.clear();
});

describe('Test Async Update', () => {
    it('can read and update note object by id property', async () => {

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

        FindAndUpdateNote(testArray, 3, 'Third value - updated');

        const idToFilter = 3;

        const currentNotes = JSON.parse(await AsyncStorage.getItem('note'));

        const selectedNote = currentNotes.filter((note) => note.id === idToFilter)[0];

        console.log(selectedNote)

        const expectedNoteObject = {
            id: 3,
            noteText: 'Third value - updated',
            isFavourite: false,
            dateCreated: '2023-10-31T00:11:48.523Z'
        };

        console.log(expectedNoteObject);

        expect(selectedNote).toStrictEqual(expectedNoteObject);

    });
});
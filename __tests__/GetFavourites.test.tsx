import React from "react";
import GetFavourites from "../src/Helpers/GetFavourites";

describe('Get Favourite notes', () => {
    it('Can retrieve only favourite notes', () => {

        const testArray = [{
            id: 1,
            noteText: 'First Value',
            isFavourite: 'True',
            dateCreated: '2023-10-01T00:10:00'
        },
        {
            id: 2,
            noteText: 'Second Value',
            isFavourite: 'True',
            dateCreated: '2023-10-31T00:12:00'
        }, {
            id: 3,
            noteText: 'Third Value',
            isFavourite: 'False',
            dateCreated: '2023-10-30T00:14:00'
        }, {
            id: 4,
            noteText: 'Fourth Value',
            isFavourite: 'False',
            dateCreated: '2023-10-31T00:09:48'
        }];

        const getFavouriteNotes = GetFavourites(testArray);

        const expectedArray = [
            {
                id: 1,
                noteText: 'First Value',
                isFavourite: 'True',
                dateCreated: '2023-10-01T00:10:00'
            },
            {
                id: 2,
                noteText: 'Second Value',
                isFavourite: 'True',
                dateCreated: '2023-10-31T00:12:00'
            }
        ]

        expect(expectedArray).toEqual(getFavouriteNotes);


    })
})
import React from "react"
import NotesCount from "../src/components/NotesCount/NotesCount"
import renderer from 'react-test-renderer';

test('loads and displays note count', async () => {
    const tree = renderer.create(<NotesCount count={5}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

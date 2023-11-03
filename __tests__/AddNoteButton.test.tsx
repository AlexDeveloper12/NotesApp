import React from "react";
import {render, fireEvent} from '@testing-library/react-native';
import AddNoteButton from "../src/components/AddNoteButton/AddNoteButton";

describe('<AddNoteButton />', () => {

    const toggleModal = jest.fn();

    const testID = "addnotebutton";

    const {getByTestId} = await render(
        <AddNoteButton toggleModal={toggleModal} />
    )

    const button = getByTestId(testID);

    fireEvent.press(button);

    expect(toggleModal).toHaveBeenCalledTimes(1);



})
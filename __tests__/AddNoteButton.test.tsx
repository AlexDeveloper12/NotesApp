import React from "react";
import {render, fireEvent} from '@testing-library/react-native';
import AddNoteButton from "../src/components/AddNoteButton/AddNoteButton";

describe('<AddNoteButton />', () => {

    it('should render the <AddNoteButton/> to the screen', ()=>{

        const {getByTestId} = render(
            <AddNoteButton />
        )

        const noteButtonID = getByTestId('addnotebutton');

        expect(true).toBe(true);
        
    });

    it('should render <AddNoteModal on click', ()=>{
        
    })

    // it('should call props.toggleModal on click',()=>{
        
    // })

    // const toggleModal = jest.fn();

    // const testID = "addnotebutton";

    // const {getByTestId} = await render(
    //     <AddNoteButton toggleModal={toggleModal} />
    // )

    // const button = getByTestId(testID);

    // fireEvent.press(button);

    // expect(toggleModal).toHaveBeenCalledTimes(1);



})
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DeleteSingleNote = async (notesArray = [], id) => {
    // console.log(id);
    console.log(notesArray);
    const newNotes = [...notesArray].filter(note => note.id != id);
    // console.log(newNotes);

    //we then set the async storage value of the key note equal to the new array
    await AsyncStorage.setItem('note', JSON.stringify(newNotes));

    return newNotes;
}
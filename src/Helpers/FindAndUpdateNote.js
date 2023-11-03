import AsyncStorage from "@react-native-async-storage/async-storage";

const FindAndUpdateNote = async (notesArray, id, text) => {

    let chosenNote = notesArray.filter(note => note.id === id);
    let newNotesArray = notesArray.filter(note => note.id !== id);

    chosenNote[0].noteText = text;

    newNotesArray.push(chosenNote[0]);

    await AsyncStorage.setItem('note', JSON.stringify(newNotesArray));

}

export default FindAndUpdateNote;
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdateNoteFavourite = async (id) => {

    let noteArray = [];

    try {
        let noteToToggleFavourite = await AsyncStorage.getItem('note');

        if (noteToToggleFavourite !== null) {
            noteArray = JSON.parse(noteToToggleFavourite);
        }
        noteArray.push(noteToToggleFavourite);

        const parsedData = JSON.parse(noteToToggleFavourite);

        const getSelectedNote = parsedData.filter((note) => note.id === id)[0];
        const allNotesButSelected = parsedData.filter((note) => note.id !== id);

        if (getSelectedNote.isFavourite === false) {
            getSelectedNote.isFavourite = true;
        }
        else if (getSelectedNote) {
            getSelectedNote.isFavourite = false;
        }

        allNotesButSelected.push(getSelectedNote);
        AsyncStorage.setItem('note', JSON.stringify(allNotesButSelected));
    }

    catch (error) {
        console.log(error);
    }
}

export default UpdateNoteFavourite;
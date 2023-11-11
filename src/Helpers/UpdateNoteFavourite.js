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

        const getSelectedNote = parsedData.filter((note) => note.id === id);
        const allNotesButSelected = parsedData.filter((note) => note.id !== id);

        // console.log(getSelectedNote[0].isFavourite);

        if (getSelectedNote[0].isFavourite == "True") {
            getSelectedNote[0]["isFavourite"] = "False";
        }
        else if (getSelectedNote[0].isFavourite=="False") {
            getSelectedNote[0]["isFavourite"] = "True";
        }

        // console.log(getSelectedNote[0]["isFavourite"]);

        allNotesButSelected.push(getSelectedNote[0]);
        console.log(allNotesButSelected)

        AsyncStorage.setItem('note', JSON.stringify(allNotesButSelected));
    }

    catch (error) {
        console.log(error);
    }
}

export default UpdateNoteFavourite;
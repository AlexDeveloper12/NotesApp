import GetNotesList from "./GetNotesList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddNote = async (notes, data, favouriteValue, dateCreated) => {

    let noteItems = await GetNotesList();
    
    let nextID = Math.max(...notes.map(o => o.id), 0) + 1;

    const noteToBeSaved = { id: nextID, noteText: data, isFavourite: favouriteValue, dateCreated: dateCreated };

    noteItems.push(noteToBeSaved);    

    await AsyncStorage.setItem(
        "note",
        JSON.stringify(noteItems)
    )

    return noteToBeSaved;

}

export default AddNote;
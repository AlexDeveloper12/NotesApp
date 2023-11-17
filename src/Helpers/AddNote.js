import GetNotesList from "./GetNotesList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddNote = async (notes, data, favouriteValue, dateCreated) => {
    
    let nextID = Math.max(...notes.map(o => o.id), 0) + 1;

    let noteItems = await GetNotesList();

    const noteToBeSaved = { id: nextID, noteText: data, isFavourite: favouriteValue, dateCreated: dateCreated };

    console.log('notes');
    console.log(notes);
    noteItems.push(noteToBeSaved);
    console.log('noteItems');
    console.log(noteItems);

    await AsyncStorage.setItem(
        "note",
        JSON.stringify(noteItems)
    )

    return noteToBeSaved;

}

export default AddNote;
import AsyncStorage from "@react-native-async-storage/async-storage";

const GetNotesList = async () => {

    let currentNotes = await AsyncStorage.getItem('note');
    return currentNotes ? JSON.parse(currentNotes) : [];
}

export default GetNotesList;
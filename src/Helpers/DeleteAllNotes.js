import AsyncStorage from "@react-native-async-storage/async-storage";

const DeleteAllNotes = async () => {

    try{
        await AsyncStorage.clear();
    }
    catch(error){
        console.log(error);
    }
}

export default DeleteAllNotes;
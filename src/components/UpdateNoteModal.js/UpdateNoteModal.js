import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View } from 'react-native';
import { TextInput, Button } from "react-native-paper";
import Modal from 'react-native-modal';

import useInput from "../../hooks/useInput";

function UpdateNoteModal({ isVisible, toggleModal, noteData }) {

    const updateNoteQuery = useInput(noteData.noteText);

    const update = async () => {
        noteData.noteText = updateNoteQuery.value;

        await AsyncStorage.setItem('note', JSON.stringify(noteData));
    }

    return (
        <Modal
            isVisible={isVisible}
            onDismiss={toggleModal}
            style={{height:'80%', backgroundColor:'#fff'}}
        >
            <View style={{ flex: 1 }}>
                <TextInput
                    style={{ verticalAlign: 'top', flex:3 }}
                    autoFocus
                    value={updateNoteQuery.value}
                    onChangeText={updateNoteQuery.handleChange} />
                <View style={{
                    flex: 1, justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection:'row'
                }}>
                    <Button mode="contained"
                        style={{ padding: 5, borderRadius: 30, width: '40%', marginRight:5 }}
                        onPress={update} labelStyle={{fontFamily:'Roboto-Light', fontSize:15}} >
                        Update
                    </Button>
                    <Button mode="contained"
                        buttonColor="red"
                        style={{padding:5, borderRadius:30, width:'40%', marginLeft:5}}
                        onPress={toggleModal} labelStyle={{fontFamily:'Roboto-Light', fontSize:15}}>
                            Cancel
                        </Button>
                </View>
            </View>

        </Modal>
    )
}

export default UpdateNoteModal
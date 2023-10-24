import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {View} from 'react-native';
import { Modal, TextInput, Button } from "react-native-paper";

import useInput from "../../hooks/useInput";

function UpdateNoteModal({ isVisible, toggleModal, noteData }) {

    const updateNoteQuery = useInput('');

    const update = async () => {
        noteData.noteText = updateNoteQuery.value;

        await AsyncStorage.setItem('note',noteData);

    }

    return (
        <Modal
            isVisible={isVisible}
            onDismiss={toggleModal}
        >
            <View style={{ flex: 1 }}>
                <TextInput
                    style={{ height: 200, flex: 2, verticalAlign: 'top' }}
                    autoFocus
                    value={updateNoteQuery.value}
                    onChangeText={updateNoteQuery.handleChange} />
                    <View style={{
                    flex: 1, justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Button mode="contained"
                        style={{ padding: 5, borderRadius: 30, width: '50%' }}
                        onPress={update} >
                        Update
                    </Button>
                </View>


            </View>

        </Modal>
    )
}

export default UpdateNoteModal
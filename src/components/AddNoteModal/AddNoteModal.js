import React, { useState } from "react";
import { Alert, View } from 'react-native';
import { Button, Modal, Portal, Text, TextInput } from "react-native-paper";
import moment from 'moment';
import useInput from "../../hooks/useInput";

function AddNoteModal({ isVisible, toggleModal, addNote }) {

    const addNoteQuery = useInput('');
    const maxCharacters = useState(200);

    const add = () => {

        const currentDateTime = moment().format('LLL');

        let randomNumber = String(Math.floor((Math.random() * 10000) + 1));

        const myData = {
            noteID: randomNumber,
            dateCreated: currentDateTime,
            noteText: addNoteQuery.value,
        }

        if(addNoteQuery.value.trim().length > 0){
            console.log(addNoteQuery.value.trim());
            addNote(addNoteQuery.value);
        }
        else {
            Alert.alert("Validation error", "Please ensure you enter a note value");
        }
    }

    return (
        <Modal visible={isVisible} onDismiss={toggleModal} contentContainerStyle={{ backgroundColor: '#fff', height: '80%' }} >
            <View style={{ flex: 1 }}>
                <TextInput multiline
                    style={{ height: 200, flex: 2, verticalAlign: 'top' }}
                    autoFocus
                    value={addNoteQuery.value}
                    onChangeText={addNoteQuery.handleChange}
                    maxLength={200}
                    />
                <View style={{
                    flex: 1, justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Button mode="contained"
                        style={{ padding: 5, borderRadius: 30, width: '50%' }}
                        onPress={add} >
                        Add
                    </Button>
                </View>
                <View
                    style={{flex:1, justifyContent:'center', alignItems:'center'}}
                >
                    <Text>{addNoteQuery.value.length}/{maxCharacters} characters</Text>
                    
                </View>
            </View>
        </Modal>
    )

}

export default AddNoteModal;
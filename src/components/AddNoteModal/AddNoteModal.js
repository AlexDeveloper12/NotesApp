import React, { useState } from "react";
import { Alert, View } from 'react-native';
import { Button, Portal, Text, TextInput } from "react-native-paper";
import Modal from 'react-native-modal';
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

        if (addNoteQuery.value.trim().length > 0) {
            console.log(addNoteQuery.value.trim());
            addNote(addNoteQuery.value);
        }
        else {
            Alert.alert("Validation error", "Please ensure you enter a note value");
        }
    }

    return (
        <Portal>
            <Modal
                visible={isVisible}
                onDismiss={toggleModal}
                style={{ height: '80%', backgroundColor: '#fff' }}
                animationIn={"bounce"}
                animationOut={"slideInDown"}
                >
                <View style={{ flex: 1 }}>
                    <TextInput multiline
                        style={{ height: 200, flex: 5, verticalAlign: 'top' }}
                        autoFocus
                        value={addNoteQuery.value}
                        onChangeText={addNoteQuery.handleChange}
                        maxLength={200}
                    />
                    <View style={{
                        flex: 1, justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection:'row'
                    }}>
                        <Button mode="contained"
                            style={{ padding: 5, borderRadius: 30, width: '40%', marginRight:5 }}
                            onPress={add} >
                            Add
                        </Button>
                        <Button mode="contained"
                            buttonColor="red"
                            style={{ padding: 5, borderRadius: 30, width: '40%', marginLeft:5 }}
                            onPress={toggleModal}
                        >
                            Close
                        </Button>
                    </View>
                    <View
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Text>{addNoteQuery.value.length}/{maxCharacters} characters</Text>

                    </View>
                </View>
            </Modal>
        </Portal>
    )

}

export default AddNoteModal;
import React from "react";
import { View } from 'react-native';
import { Button, Modal, Portal, Text, TextInput } from "react-native-paper";
import moment from 'moment';

function AddNoteModal({ isVisible, toggleModal, value, addNote, handleNote }) {

    const add = () => {

        const currentDateTime = moment().format('LLL');

        const myData = {
            dateCreated: currentDateTime,
            noteText: value
        }

        addNote(myData);
    }

    const handle = (value) => {
        handleNote(value)
    }

    return (
        <Portal>
            <Modal visible={isVisible} onDismiss={toggleModal} contentContainerStyle={{ backgroundColor: '#fff', height: '80%' }} >
                <View style={{ flex: 1 }}>
                    <TextInput multiline
                        style={{ height: 200, flex: 2, verticalAlign: 'top' }}
                        autoFocus
                        value={value}
                        onChangeText={handleNote} />
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
                </View>
            </Modal>
        </Portal>
    )

}

export default AddNoteModal;
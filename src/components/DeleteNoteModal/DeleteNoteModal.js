import React from "react";
import { Alert, View } from 'react-native';
import { Button, Modal, Text } from "react-native-paper";

function DeleteNoteModal({ isVisible, toggleModal, deleteNote, noteID }) {
    return (
        <Modal
            isVisible={isVisible} 
            onDismiss={toggleModal}
            contentContainerStyle={{backgroundColor:'#fff', height:'80%'}}
            >
            <View style={{ flex: 1 }}>
                <Text>
                    Are you sure you want to delete this note?
                </Text>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Button mode="contained"
                        style={{ padding: 5, borderRadius: 30, width: '50%' }}
                        onPress={()=>deleteNote(noteID)}
                    >
                        Delete
                    </Button>
                    <Button mode="contained"
                        style={{ padding: 5, borderRadius: 30, width: '50%' }}>
                        Cancel
                    </Button>
                </View>

            </View>
        </Modal>
    )

}

export default DeleteNoteModal;
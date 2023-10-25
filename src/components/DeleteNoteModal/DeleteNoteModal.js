import React from "react";
import { Alert, View } from 'react-native';
import { Button, Text } from "react-native-paper";
import Modal from 'react-native-modal';

function DeleteNoteModal({ isVisible, toggleModal, deleteNote, noteID }) {
    return (
        <Modal
            isVisible={isVisible} onDismiss={toggleModal}
            style={{ height: '40%', backgroundColor: '#fff' }}
        >
            <View style={{ flex: 1 }}>
                <Text style={{textAlign:'center', fontFamily:'Roboto-Light'}}>
                    Are you sure you want to delete this note?
                </Text>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection:'row' }}>
                    <Button mode="contained"
                        style={{ padding: 5, borderRadius: 30, width: '40%', marginRight:5 }}
                        onPress={()=>deleteNote(noteID)}
                    >
                        Delete
                    </Button>
                    <Button mode="contained" onPress={toggleModal}
                        buttonColor="red"
                        style={{ padding: 5, borderRadius: 30, width: '40%', marginLeft:5 }}>
                        Cancel
                    </Button>
                </View>

            </View>
        </Modal>
    )

}

export default DeleteNoteModal;
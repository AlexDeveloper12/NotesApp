import React from "react";
import { Alert, View } from 'react-native';
import { Button, Text } from "react-native-paper";
import Modal from 'react-native-modal';
import styles from "../../styles/DeleteNoteModalStyles/DeleteNoteModalStyles";
import commonStyles from "../../styles/CommonStyles/CommonStyles";

function DeleteNoteModal({ isVisible, toggleModal, deleteNote, noteID }) {
    return (
        <Modal
            isVisible={isVisible} 
            onDismiss={toggleModal}
            style={styles.modalContainer}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.headerText}>
                    Are you sure you want to delete this note?
                </Text>
                <View style={commonStyles.actionButtonContainer}>
                    <Button mode="contained"
                        style={commonStyles.btnLeft}
                        onPress={() => deleteNote(noteID)}
                    >
                        Delete
                    </Button>
                    <Button mode="contained" onPress={toggleModal}
                        buttonColor="red"
                        style={commonStyles.btnRight}>
                        Cancel
                    </Button>
                </View>

            </View>
        </Modal>
    )

}

export default DeleteNoteModal;
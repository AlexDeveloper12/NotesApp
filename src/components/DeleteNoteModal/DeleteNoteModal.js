import React from "react";
import { Alert, View } from 'react-native';
import { Button, Text } from "react-native-paper";
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import commonStyles from "../../styles/CommonStyles/CommonStyles";

function DeleteNoteModal({ isVisible, toggleModal, deleteNote, noteID }) {
    return (
        <Modal
            isVisible={isVisible}
            onDismiss={toggleModal}
            style={commonStyles.modalContainer}
        >
            <View style={{ height: 300, backgroundColor: 'white' }}>
                <Text style={commonStyles.headerText}>
                    Are you sure you want to delete this note?
                </Text>
            </View>
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


        </Modal>
    )
}

export default DeleteNoteModal;

DeleteNoteModal.propTypes = {
    isVisible: PropTypes.bool,
    toggleModal: PropTypes.func,
    deleteNote: PropTypes.func,
    noteID: PropTypes.number
}
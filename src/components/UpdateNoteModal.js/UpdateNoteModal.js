import React from "react";
import { View } from 'react-native';
import { TextInput, Button } from "react-native-paper";
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import useInput from "../../hooks/useInput";
import styles from "../../styles/UpdateNoteModalStyles/UpdateNoteModalStyles";
import commonStyles from "../../styles/CommonStyles/CommonStyles";

function UpdateNoteModal({ isVisible, toggleModal, noteData, update }) {

    const updateNoteQuery = useInput(noteData.noteText);

    return (
        <Modal
            isVisible={isVisible}
            onDismiss={toggleModal}
            style={styles.modalContainer}
        >
            <View style={styles.innerContainer}>
                <TextInput
                    style={styles.input}
                    autoFocus
                    value={updateNoteQuery.value}
                    onChangeText={updateNoteQuery.handleChange} />
                <View style={commonStyles.actionButtonContainer}>
                    <Button mode="contained"
                        style={commonStyles.btnLeft}
                        onPress={()=>update(noteData.id,updateNoteQuery.value)} labelStyle={commonStyles.btnLabel} >
                        Update
                    </Button>
                    <Button mode="contained"
                        buttonColor="red"
                        style={commonStyles.btnRight}
                        onPress={toggleModal} labelStyle={commonStyles.btnLabel}>
                            Cancel
                        </Button>
                </View>
            </View>

        </Modal>
    )
}

export default UpdateNoteModal;

UpdateNoteModal.propTypes = {
    isVisible:PropTypes.bool,
    toggleModal:PropTypes.func,
    noteData:PropTypes.object,
    update:PropTypes.func
}
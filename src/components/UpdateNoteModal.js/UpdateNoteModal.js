import React from "react";
import { View } from 'react-native';
import { Text, TextInput } from "react-native-paper";
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import useInput from "../../hooks/useInput";
import styles from "../../styles/UpdateNoteModalStyles/UpdateNoteModalStyles";
import ModalActionButtons from "../ModalActionButtons/ModalActionButtons";

function UpdateNoteModal({ isVisible, toggleModal, noteData, update }) {

    const updateNoteQuery = useInput(noteData.noteText);

    return (
        <Modal
            isVisible={isVisible}
            onDismiss={toggleModal}
            style={styles.modalContainer}
        >
            <View style={styles.innerContainer}>
                <View style={styles.actionsContainer}>

                    <TextInput
                        style={styles.input}
                        autoFocus
                        value={updateNoteQuery.value}
                        onChangeText={updateNoteQuery.handleChange}
                        underlineStyle={{ borderWidth: 0.5, borderColor: 'white' }}
                        multiline
                        maxLength={500}
                    />

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>{updateNoteQuery.value.length} / 500 characters. </Text>
                    </View>

                    <ModalActionButtons
                        leftText={'Update'}
                        leftAction={() => update(noteData.id, updateNoteQuery.value)}
                        rightText={'Close'}
                        rightAction={toggleModal}
                    />
                </View>
            </View>

        </Modal>
    )
}

export default UpdateNoteModal;

UpdateNoteModal.propTypes = {
    isVisible: PropTypes.bool,
    toggleModal: PropTypes.func,
    noteData: PropTypes.object,
    update: PropTypes.func
};
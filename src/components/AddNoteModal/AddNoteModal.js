import React, { useState } from "react";
import { Alert, View } from 'react-native';
import { TextInput, Text } from "react-native-paper";
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import useInput from "../../hooks/useInput";
import styles from "../../styles/AddNoteModalStyles/AddNoteModalStyles";
import FavouriteRadioGroup from "../../FavouriteRadioGroup/FavouriteRadioGroup";
import ModalActionButtons from "../ModalActionButtons/ModalActionButtons";

function AddNoteModal({ isVisible, toggleModal, addNote }) {

    const addNoteQuery = useInput('');
    const [selectedFavouriteValue, setSelectedFavouriteValue] = useState('False');

    const add = () => {

        if (addNoteQuery.value.trim().length > 0) {
            console.log(addNoteQuery.value.trim());
            addNote(addNoteQuery.value, selectedFavouriteValue);
        }
        else {
            Alert.alert("Validation error", "Please ensure you enter a note value");
        }
    }

    return (
        <Modal
            visible={isVisible}
            onDismiss={toggleModal}
            style={styles.modalContainer}
        >
            <View style={styles.innerContainer}>
                <View
                    style={styles.actionsContainer}
                >
                    <TextInput
                        multiline
                        style={styles.input}
                        autoFocus
                        value={addNoteQuery.value}
                        onChangeText={addNoteQuery.handleChange}
                        maxLength={500}
                        underlineStyle={styles.inputUnderline}
                    />
                    <FavouriteRadioGroup
                        radioValue={selectedFavouriteValue}
                        setRadioValue={setSelectedFavouriteValue}
                    />

                    <View style={styles.maxCharacterContainer}>
                        <Text>{addNoteQuery.value.length} / 500 characters. </Text>
                    </View>

                    <ModalActionButtons
                        leftText={'Add'}
                        leftAction={add}
                        rightText={'Close'}
                        rightAction={toggleModal}
                    />
                </View>
            </View>
        </Modal>
    )

}

export default AddNoteModal;

AddNoteModal.propTypes = {
    isVisible: PropTypes.bool,
    toggleModal: PropTypes.func,
    addNote: PropTypes.func
}
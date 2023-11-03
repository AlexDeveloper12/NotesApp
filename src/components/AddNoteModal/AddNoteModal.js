import React, { useState } from "react";
import { Alert, View } from 'react-native';
import { Button, Text, TextInput } from "react-native-paper";
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import useInput from "../../hooks/useInput";
import styles from "../../styles/AddNoteModalStyles/AddNoteModalStyles";
import commonStyles from "../../styles/CommonStyles/CommonStyles";

function AddNoteModal({ isVisible, toggleModal, addNote }) {

    const addNoteQuery = useInput('');
    const maxCharacters = useState(500);

    const add = () => {

        if (addNoteQuery.value.trim().length > 0) {
            console.log(addNoteQuery.value.trim());
            addNote(addNoteQuery.value);
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
            animationIn={"bounce"}
            animationOut={"slideInDown"}
            testID="addNoteModal"
            accessibilityLabel="add-note-modal"
        >
            <View style={{flex:1}}>
                <TextInput multiline
                    style={styles.input}
                    autoFocus
                    value={addNoteQuery.value}
                    onChangeText={addNoteQuery.handleChange}
                    maxLength={500}
                />
                <View style={commonStyles.actionButtonContainer}>
                    <Button mode="contained"
                        style={commonStyles.btnLeft}
                        labelStyle={commonStyles.btnLabel}
                        onPress={add} >
                        Add
                    </Button>
                    <Button mode="contained"
                        buttonColor="red"
                        style={commonStyles.btnRight}
                        labelStyle={commonStyles.btnLabel}
                        onPress={toggleModal}
                    >
                        Close
                    </Button>
                </View>
            </View>
        </Modal>
    )

}

export default AddNoteModal;

AddNoteModal.propTypes = {
    isVisible:PropTypes.bool,
    toggleModal:PropTypes.func,
    addNote:PropTypes.func
}
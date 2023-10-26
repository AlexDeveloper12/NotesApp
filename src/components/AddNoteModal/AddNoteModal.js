import React, { useState } from "react";
import { Alert, View } from 'react-native';
import { Button, Text, TextInput } from "react-native-paper";
import Modal from 'react-native-modal';
import useInput from "../../hooks/useInput";
import styles from "../../styles/AddNoteModalStyles/AddNoteModalStyles";
import commonStyles from "../../styles/CommonStyles/CommonStyles";

function AddNoteModal({ isVisible, toggleModal, addNote }) {

    const addNoteQuery = useInput('');
    const maxCharacters = useState(200);

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
        >
            <View style={{ flex: 1 }}>
                <TextInput multiline
                    style={styles.input}
                    autoFocus
                    value={addNoteQuery.value}
                    onChangeText={addNoteQuery.handleChange}
                    maxLength={200}
                />
                <View style={commonStyles.actionButtonContainer}>
                    <Button mode="contained"
                        style={commonStyles.btnLeft}
                        onPress={add} >
                        Add
                    </Button>
                    <Button mode="contained"
                        buttonColor="red"
                        style={commonStyles.btnRight}
                        onPress={toggleModal}
                    >
                        Close
                    </Button>
                </View>
                {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{addNoteQuery.value.length} / {maxCharacters} characters</Text>
                </View> */}
            </View>
        </Modal>
    )

}

export default AddNoteModal;
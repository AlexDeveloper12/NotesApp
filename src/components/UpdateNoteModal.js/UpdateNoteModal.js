import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View } from 'react-native';
import { TextInput, Button } from "react-native-paper";
import Modal from 'react-native-modal';
import useInput from "../../hooks/useInput";
import styles from "../../styles/UpdateNoteModalStyles/UpdateNoteModalStyles";
import commonStyles from "../../styles/CommonStyles/CommonStyles";

function UpdateNoteModal({ isVisible, toggleModal, noteData }) {

    const updateNoteQuery = useInput(noteData.noteText);

    const update = async () => {
        noteData.noteText = updateNoteQuery.value;

        await AsyncStorage.setItem('note', JSON.stringify(noteData));
    }

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
                <View style={commonStyles.btnActionContainer}>
                    <Button mode="contained"
                        style={commonStyles.btnLeft}
                        onPress={update} labelStyle={{fontFamily:'Roboto-Light', fontSize:15}} >
                        Update
                    </Button>
                    <Button mode="contained"
                        buttonColor="red"
                        style={commonStyles.btnRight}
                        onPress={toggleModal} labelStyle={{fontFamily:'Roboto-Light', fontSize:15}}>
                            Cancel
                        </Button>
                </View>
            </View>

        </Modal>
    )
}

export default UpdateNoteModal
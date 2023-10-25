import React from "react";
import { View } from 'react-native';
import { IconButton } from "react-native-paper";
import styles from "../../styles/AddNoteButtonStyles/AddNoteButtonStyles";

function AddNoteButton({toggleModal}) {
    return (
        <View style={styles.AddNoteButtonContainer}>
            <IconButton icon="plus" mode="contained"
                style={styles.btnBackgroundColour}
                onPress={toggleModal}
                size={25}
                iconColor='white' >
            </IconButton>
        </View>
    )

}

export default AddNoteButton;
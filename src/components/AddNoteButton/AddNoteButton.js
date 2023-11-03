import React from "react";
import { View } from 'react-native';
import { IconButton } from "react-native-paper";
import PropTypes from 'prop-types';
import styles from "../../styles/AddNoteButtonStyles/AddNoteButtonStyles";

function AddNoteButton({toggleModal}) {
    return (
        <View style={styles.AddNoteButtonContainer}>
            <IconButton icon="plus" mode="contained"
                style={styles.btnBackgroundColour}
                onPress={toggleModal}
                size={25}
                iconColor='white'
                testID="addnotebutton"
                >
            </IconButton>
        </View>
    )

}

export default AddNoteButton;

AddNoteButton.propTypes = {
    toggleModal:PropTypes.func
}
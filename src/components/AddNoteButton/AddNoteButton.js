import React from "react";
import { View } from 'react-native';
import { IconButton } from "react-native-paper";
import PropTypes from 'prop-types';
import styles from "../../styles/AddNoteButtonStyles/AddNoteButtonStyles";
import CustomFontSize from "../../Helpers/CustomFontSize";

function AddNoteButton({toggleModal}) {
    return (
        <View style={styles.AddNoteButtonContainer}>
            <IconButton icon="plus" mode="contained"
                style={styles.btnBackgroundColour}
                onPress={toggleModal}
                size={CustomFontSize(30)}
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
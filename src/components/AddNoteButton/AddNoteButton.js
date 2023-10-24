import React from "react";
import { View } from 'react-native';
import { IconButton } from "react-native-paper";

function AddNoteButton({toggleModal}) {
    return (
        <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
            <IconButton icon="plus" mode="contained"
                style={{ backgroundColor: '#5acc83' }}
                onPress={toggleModal}
                size={25}
                iconColor='white' >
            </IconButton>
        </View>
    )

}

export default AddNoteButton;
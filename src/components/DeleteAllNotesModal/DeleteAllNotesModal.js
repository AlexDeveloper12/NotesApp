import React from "react";
import { View } from 'react-native';
import Modal from "react-native-modal";
import commonStyles from "../../styles/CommonStyles/CommonStyles";
import { Button, Text } from "react-native-paper";
import styles from '../../styles/DeleteAllNotesModalStyles/DeleteAllNotesModalStyles';

function DeleteAllNotesModal({ toggleModal, deleteAll, isVisible }) {
    return (
        <Modal
            isVisible={isVisible}
            onDismiss={toggleModal}
            style={styles.modalContainer}
        >
            <View style={{ height: 300, backgroundColor: 'white' }}>
                <Text
                    style={styles.headerText}
                >Are you sure you want to delete all of your notes?</Text>
            </View>
            <View style={commonStyles.actionButtonContainer}>
                <Button mode="contained"
                    style={commonStyles.btnLeft} 
                    onPress={deleteAll}
                    >
                    Delete All Notes
                </Button>
                <Button mode="contained" onPress={toggleModal}
                    buttonColor="red"
                    style={commonStyles.btnRight}
                >
                    Cancel
                </Button>
            </View>


        </Modal>
    )

}

export default DeleteAllNotesModal;
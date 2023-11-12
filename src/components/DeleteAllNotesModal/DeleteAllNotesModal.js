import React from "react";
import { View } from 'react-native';
import Modal from "react-native-modal";
import commonStyles from "../../styles/CommonStyles/CommonStyles";
import { Text } from "react-native-paper";
import ModalActionButtons from "../ModalActionButtons/ModalActionButtons";

function DeleteAllNotesModal({ toggleModal, deleteAll, isVisible }) {
    return (
        <Modal
            isVisible={isVisible}
            onDismiss={toggleModal}
        // style={commonStyles.modalContainer}
        >
            <View style={{ height: 250, backgroundColor: 'white' }}>
                <Text
                    style={commonStyles.headerText}
                >Are you sure you want to delete all of your notes?</Text>


                <ModalActionButtons
                    leftText={'Delete All Notes'}
                    leftAction={deleteAll}
                    rightText={'Close'}
                    rightAction={toggleModal}
                />
            </View>

        </Modal>
    )

}

export default DeleteAllNotesModal;
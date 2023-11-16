import React from "react";
import { View } from 'react-native';
import { Button, Text } from "react-native-paper";
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import commonStyles from "../../styles/CommonStyles/CommonStyles";
import ModalActionButtons from "../ModalActionButtons/ModalActionButtons";
import DeleteModalContent from "./DeleteModalContent";
import { CONSTANTS } from "../../constants/constants";

function DeleteModal({ isVisible, toggleModal, deleteNote, noteID, headerText, type }) {
    return (
        <Modal
            isVisible={isVisible}
            onDismiss={toggleModal}
        >
            <DeleteModalContent
                text={headerText}
            >
                <ModalActionButtons
                    leftText={'Delete'}
                    leftAction={type=== CONSTANTS.DELETE_SINGLE ? () => deleteNote(noteID) : deleteNote}
                    rightText={'Close'}
                    rightAction={toggleModal}
                />

            </DeleteModalContent>

        </Modal>
    )
}

export default DeleteModal;
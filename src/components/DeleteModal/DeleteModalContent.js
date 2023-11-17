import React from "react";
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import PropTypes from 'prop-types';
import commonStyles from "../../styles/CommonStyles/CommonStyles";
import styles from '../../styles/DeleteModalContentStyles/DeleteModalContentStyles';

function DeleteModalContent({text, children}) {
    return (
        <View style={styles.container}>
            <Text style={commonStyles.headerText}>
                {text}
            </Text>

            {children}
        </View>
    )
}

export default DeleteModalContent;

DeleteModalContent.propTypes = {
    text:PropTypes.string,
    children:PropTypes.element
}
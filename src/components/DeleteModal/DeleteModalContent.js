import React from "react";
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import commonStyles from "../../styles/CommonStyles/CommonStyles";

function DeleteModalContent({text, children}) {
    return (
        <View style={{ height: 300, backgroundColor: 'white' }}>
            <Text style={commonStyles.headerText}>
                {text}
            </Text>

            {children}
        </View>
    )
}

export default DeleteModalContent;
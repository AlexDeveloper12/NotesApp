import React from 'react';
import { Text } from 'react-native-paper';
import { View } from 'react-native';
import commonStyles from '../../styles/CommonStyles/CommonStyles';

function NotesCount({count}) {
    return (
        <View>
            <Text style={[commonStyles.white, commonStyles.robotoLight, commonStyles.commonSize, {marginLeft:12}]}>
                Notes count: {count}
            </Text>
        </View>
    )

}

export default NotesCount;
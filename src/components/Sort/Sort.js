import React from "react";
import { IconButton } from "react-native-paper";
import { View } from 'react-native';

function Sort({ascending,descending}) {
    return (
        <View style={{ flexDirection: 'row' }}>
            <IconButton
                icon='sort-descending'
                size={25}
                iconColor='white'
                onPress={descending}
            />
            <IconButton
                icon={'sort-ascending'}
                size={25}
                iconColor='white'
                onPress={ascending}
            />

        </View>


    )

}

export default Sort;
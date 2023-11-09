import React from "react";
import {View} from 'react-native';
import { IconButton } from "react-native-paper";

function SortIcon({sortFunction,isActive,icon}){
    return(
        <View style={isActive ? { borderBottomColor: 'white', borderBottomWidth: 1 } : null}>
            <IconButton
                    icon={icon}
                    size={25}
                    iconColor='white'
                    onPress={sortFunction}
                />
        </View>
    )

}

export default SortIcon;
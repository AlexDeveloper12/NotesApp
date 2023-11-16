import React from "react";
import {View, PixelRatio} from 'react-native';
import { IconButton } from "react-native-paper";

function SortIcon({sortFunction,isActive,icon}){
    return(
        <View style={isActive ? { borderBottomColor: 'white', borderBottomWidth: 1 } : null}>
            <IconButton
                    icon={icon}
                    size={getFontSize(35)}
                    iconColor='white'
                    onPress={sortFunction}
                />
        </View>
    )
}

export default SortIcon;

const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale
import React from "react";
import {View, PixelRatio} from 'react-native';
import { IconButton } from "react-native-paper";
import PropTypes from 'prop-types';
import CustomFontSize from "../../Helpers/CustomFontSize";

function SortIcon({sortFunction,isActive,icon}){
    return(
        <View style={isActive ? { borderBottomColor: 'white', borderBottomWidth: 1 } : null}>
            <IconButton
                    icon={icon}
                    size={CustomFontSize(35)}
                    iconColor='white'
                    onPress={sortFunction}
                />
        </View>
    )
}

export default SortIcon;

SortIcon.propTypes = {
    sortFunction: PropTypes.func,
    isActive:PropTypes.bool,
    icon:PropTypes.string
}
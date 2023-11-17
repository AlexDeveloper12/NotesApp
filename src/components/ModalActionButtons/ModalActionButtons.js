import React from 'react';
import {View} from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import commonStyles from '../../styles/CommonStyles/CommonStyles';

function ModalActionButtons({ leftText, rightText, leftAction, rightAction }) {
    return (
        <View style={commonStyles.actionButtonContainer}>
            <Button
                mode='contained'
                style={commonStyles.btnLeft}
                labelStyle={commonStyles.btnLabel}
                onPress={leftAction}
            >{leftText}
            </Button>
            <Button
                mode='contained'
                buttonColor='red'
                style={commonStyles.btnRight}
                labelStyle={commonStyles.btnLabel}
                onPress={rightAction}
                >
                    {rightText}
                </Button>
        </View>
    )
}

export default ModalActionButtons;

ModalActionButtons.propTypes = {
    leftText:PropTypes.string,
    rightText:PropTypes.string,
    leftAction:PropTypes.func,
    rightAction:PropTypes.func

}
import React, { useState } from "react";
import { View } from 'react-native';
import { RadioButton, Text } from "react-native-paper";

function FavouriteRadioGroup({radioValue,setRadioValue}) {

    return (
        <View style={{ justifyContent: 'center', alignContent: 'center', flex: 1 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton
                    value="True"
                    color="grey"
                    status={radioValue === 'True' ? 'checked' : 'unchecked'}
                    onPress={()=>setRadioValue('True')}
                />
                <Text style={{ color: 'grey' }}>True</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton
                    value="False"
                    color="grey"
                    status={radioValue === 'False' ? 'checked' : 'unchecked'}
                    onPress={()=>setRadioValue('False')}
                />
                <Text style={{ color: 'grey' }}>False</Text>

            </View>

        </View>

    )
}

export default FavouriteRadioGroup;
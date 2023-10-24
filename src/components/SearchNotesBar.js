import React, { useState } from 'react'
import {View} from 'react-native';
import { Searchbar } from 'react-native-paper';

function SearchNotesBar({ value, handleChange }) {

    return (
        <View style={{ marginTop: 40, marginLeft: 10, marginRight: 10 }}>
            <Searchbar
                placeholder='Search...'
                value={value}
                onChangeText={handleChange}
                icon={"magnify"}
                iconColor={"#fff"}
                style={{ backgroundColor: '#71909a', fontFamily: 'Roboto-Light' }}
                inputStyle={{ color: '#fff' }}
                placeholderTextColor={'white'}
            />
        </View>
    )

}

export default SearchNotesBar;
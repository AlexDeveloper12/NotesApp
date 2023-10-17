import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

function SearchNotesBar({value,handleChange}){

    return(
        <Searchbar
            placeholder='Search...'
            value={value}
            onChangeText={handleChange}
            icon={<Icon name="heart" />}
            style={{backgroundColor:'#71909a'}}
            placeholderTextColor={'white'}
            />
    )

}

export default SearchNotesBar;
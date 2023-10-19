import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper';

function SearchNotesBar({value,handleChange}){

    return(
        <Searchbar
            placeholder='Search...'
            value={value}
            onChangeText={handleChange}
            icon={"magnify"}
            iconColor={"#fff"}
            style={{backgroundColor:'#71909a', fontFamily:'Roboto-Light'}}
            inputStyle={{color:'#fff'}}
            placeholderTextColor={'white'}
            />
    )

}

export default SearchNotesBar;
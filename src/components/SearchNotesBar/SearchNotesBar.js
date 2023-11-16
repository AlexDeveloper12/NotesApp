import React, { useState } from 'react'
import {View} from 'react-native';
import { Searchbar } from 'react-native-paper';
import PropTypes from 'prop-types';
import styles from '../../styles/SearchNotesBarStyles/SearchNotesBarStyles';

function SearchNotesBar({ value, handleChange }) {

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder='Search all notes...'
                value={value}
                onChangeText={handleChange}
                icon={"magnify"}
                iconColor={'#fff'}
                style={styles.searchBarGeneral}
                inputStyle={styles.searchBarInput}
                placeholderTextColor={'#fff'}
            />
        </View>
    )
}

export default SearchNotesBar;

SearchNotesBar.propTypes = {
    value:PropTypes.string,
    handleChange:PropTypes.func
}
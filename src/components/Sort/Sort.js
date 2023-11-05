import React from "react";
import { IconButton } from "react-native-paper";
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from "../../styles/Sort/SortStyles";

function Sort({ ascending, descending, ascActive, descActive, ascDateCreated, ascDateCreatedActive, toggleDeleteAll }) {
    return (
        <View style={styles.sortContainer}>
            <View style={descActive ? { borderBottomColor: 'white', borderBottomWidth: 1 } : null}>
                <IconButton
                    icon='sort-descending'
                    size={25}
                    iconColor='white'
                    onPress={descending}
                />
            </View>
            <View style={ascActive ? { borderBottomColor: 'white', borderBottomWidth: 1 } : null} >
                <IconButton
                    icon={'sort-ascending'}
                    size={25}
                    iconColor='white'
                    onPress={ascending}
                />
            </View>

            <View style={ascDateCreatedActive ? { borderBottomColor: 'white', borderBottomWidth: 1 } : null}>
                <IconButton
                    icon={'sort-calendar-ascending'}
                    size={25}
                    iconColor='white'
                    onPress={ascDateCreated}
                />
            </View>

            <View>
                <IconButton
                    icon={'trash-can'}
                    size={25}
                    iconColor='white'
                    onPress={toggleDeleteAll}
                />

            </View>


        </View>
    )

}

export default Sort;

Sort.propTypes = {
    ascending: PropTypes.func,
    descending: PropTypes.func,
    ascActive: PropTypes.bool,
    descActive: PropTypes.bool
}
import React from "react";
import { IconButton } from "react-native-paper";
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from "../../styles/Sort/SortStyles";
import { SortContext } from "../../Context/SortContext";

function Sort(props) {

    return (
        <View style={styles.sortContainer}>
            {props.children}
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
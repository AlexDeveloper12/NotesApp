import React from "react";
import {View, Text} from 'react-native';
import styles from "../../styles/HeaderStyles/HeaderStyles";

function Header() {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>My Notes</Text>
        </View>
    )
}

export default Header;
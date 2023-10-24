import React from "react";
import {View, Text} from 'react-native';

function Header() {

    return (
        <View style={{ marginTop: 30 }}>
            <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'Roboto-Bold', fontSize: 40 }}>My Notes</Text>
        </View>
    )
}

export default Header;
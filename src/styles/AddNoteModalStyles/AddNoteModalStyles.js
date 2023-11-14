import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#fff',
        borderWidth: 0,
    },
    innerContainer: {
        flex: 1
    },
    input: {
        flex: 3,
        textAlignVertical: 'top',
        width: '100%'
    },
    maxCharacterContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputUnderline: {
        borderWidth: 0.5, borderColor: 'white'
    }

})

export default styles;
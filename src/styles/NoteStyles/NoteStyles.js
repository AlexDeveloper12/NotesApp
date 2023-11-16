import { StyleSheet, PixelRatio } from "react-native";

const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 20,
        marginLeft: 10,
        marginRight: 10
    },
    text: {
        fontFamily: 'Roboto-Light',
        fontSize: getFontSize(15)
    },
    noteTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: getFontSize(18)
    }

});

export default styles;
import { StyleSheet, PixelRatio } from "react-native";
import CustomFontSize from "../../Helpers/CustomFontSize";

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 20,
        marginLeft: 10,
        marginRight: 10
    },
    text: {
        fontFamily: 'Roboto-Light',
        fontSize: CustomFontSize(15)
    },
    noteTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: CustomFontSize(18)
    }

});

export default styles;
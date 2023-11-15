import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const styles = StyleSheet.create({
    modalContainer: {
        borderWidth: 0
    },
    innerContainer: {
        flex: 4,
        flexDirection:'column',
        justifyContent:'center'
    },
    actionsContainer:{
        height:Dimensions.get('window').height / 1.5, backgroundColor:'white'
    },
    input: {
        verticalAlign: 'top', 
        flexWrap:'wrap',
        flex: 3,
        textAlignVertical: 'top',
        width: '100%'

    },

});

export default styles;
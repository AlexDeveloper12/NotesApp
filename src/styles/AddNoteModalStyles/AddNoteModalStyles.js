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
    input: {
        flex: 4,
        textAlignVertical: 'top',
        width: '100%'
    },
    maxCharacterContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputUnderline: {
        borderWidth: 0.5, borderColor: 'white'
    },
    actionsContainer:{
        height:Dimensions.get('window').height / 1.2, backgroundColor:'white'
    }

})

export default styles;
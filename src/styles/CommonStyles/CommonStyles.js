import { StyleSheet } from "react-native";

const commonStyles = StyleSheet.create({
    btnLeft: {
        padding: 5,
        borderRadius: 30,
        width: '40%',
        marginRight: 5
    },
    btnRight: {
        padding: 5,
        borderRadius: 30,
        width: '40%',
        marginLeft: 5
    },
    actionButtonContainer: {
        flex: 1, justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    btnLabel:{
        fontFamily:'Roboto-Light', fontSize:17
    },
    white:{
        color:'white'
    },
    robotoLight:{
        fontFamily:'Roboto-Light'
    },
    robotoMedium:{
        fontFamily:'Roboto-Medium'
    },

    commonSize:{
        fontSize:16
    }


});

export default commonStyles;
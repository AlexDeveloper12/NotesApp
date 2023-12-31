import { StyleSheet, PixelRatio } from "react-native";
import CustomFontSize from "../../Helpers/CustomFontSize";

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
    btnLabel: {
        fontFamily: 'Roboto-Light', 
        fontSize: CustomFontSize(17)
    },
    white: {
        color: 'white'
    },
    robotoLight: {
        fontFamily: 'Roboto-Light'
    },
    robotoMedium: {
        fontFamily: 'Roboto-Medium'
    },

    commonSize: {
        fontSize: CustomFontSize(18)
    },
    commonContainer: {
        backgroundColor: '#1f454d',
        flex: 1
    },

    centerElement: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    noDataExistsText:{
        color: '#fff', 
        marginTop: 10
    },

    /**
     * common modal styles
     */

     modalContainer: {
        height:'80%',
        backgroundColor:'white',
        flex:0
    },
    innerContainer: {
        height:400
    },
    headerText:{
        textAlign:'center', 
        fontFamily:'Roboto-Light',
        verticalAlign:'middle',
        fontSize:CustomFontSize(16),
        marginTop:100
    },


});

export default commonStyles;
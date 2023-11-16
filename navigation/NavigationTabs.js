import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../src/components/Home/Home';
import { SearchNotesBar, useArray, useInput, useModal, AddNoteButton, AddNoteModal, DeleteNoteModal, UpdateNoteModal, Note, NotesCount, Header, Favourites, Sort } from '../src/components/Index/Index';
import { StyleSheet, PixelRatio } from 'react-native';
import { symbol } from 'prop-types';

const Drawer = createDrawerNavigator();

export default function NavigationTabs() {
    return (
        <NavigationContainer
        >
            <Drawer.Navigator
                initialRouteName='Home'
                screenOptions={{
                    headerStyle: { backgroundColor: '#1f454d' },
                    headerTintColor:'#fff',
                    headerShadowVisible:false,
                    headerTitleStyle:{
                        fontFamily:'Roboto-Black',
                        fontSize:styles.customFont,
                        fontWeight:"600"
                    },
                    headerLeftLabelVisible:false,
                    drawerLabelStyle: {
                        fontFamily: 'Roboto-Light',
                        fontSize: styles.customFont,
                        fontWeight: 300
                    }
                    ,
                    drawerStyle:{
                        width:200
                    }
                }}

            >
                <Drawer.Screen name="Home" component={Home} options={{
                    headerTitle: 'My Notes'

                }} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale

const styles = StyleSheet.create({
    customFont: getFontSize(18)
})
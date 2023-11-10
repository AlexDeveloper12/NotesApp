import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../src/components/Home/Home';
import { SearchNotesBar, useArray, useInput, useModal, AddNoteButton, AddNoteModal, DeleteNoteModal, UpdateNoteModal, Note, NotesCount, Header, Favourites, Sort } from '../src/components/Index/Index';

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
                        fontSize:20,
                        fontWeight:"600"
                    },
                    headerLeftLabelVisible:false,
                    drawerLabelStyle: {
                        fontFamily: 'Roboto-Light',
                        fontSize: 15,
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
                {/* <Drawer.Screen name="Favourites" component={Favourites} /> */}
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
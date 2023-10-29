import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../src/components/Home/Home';
import {SearchNotesBar,useArray, useInput, useModal, AddNoteButton, AddNoteModal, DeleteNoteModal, UpdateNoteModal, Note, NotesCount, Header, Favourites, Sort} from '../src/components/Index/Index';

const Drawer = createDrawerNavigator();

export default function NavigationTabs(){
    return(
        <NavigationContainer>
            <Drawer.Navigator initialRouteName='Home'>
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Favourites" component={Favourites}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
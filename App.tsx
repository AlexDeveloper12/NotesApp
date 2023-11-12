import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList
} from 'react-native';
import { PaperProvider, BottomNavigation, IconButton, Text, ActivityIndicator, MD2Colors, Modal, Portal, TextInput } from 'react-native-paper';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import 'react-native-gesture-handler';
import { SearchNotesBar, useInput, useArray, useModal, AddNoteModal, Note, DeleteModal, UpdateNoteModal, AddNoteButton, Favourites, NotesCount, Sort, } from './src/components/Index/Index';
import NavigationTabs from './navigation/NavigationTabs';

function App(): JSX.Element {
  return (
    <PaperProvider>
      <View style={{ backgroundColor: '#1f454d', flex: 1 }}>
        <NavigationTabs/>
        </View>

    </PaperProvider>
  )
}

export default App;

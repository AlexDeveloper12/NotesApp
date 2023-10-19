/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  useColorScheme,
  View,
  FlatList
} from 'react-native';

import { Button, PaperProvider, useTheme, IconButton, Text } from 'react-native-paper';
import SearchNotesBar from './src/components/SearchNotesBar';
import useInput from './src/hooks/useInput';
import useModal from './src/hooks/useModal';
import AddNoteModal from './src/components/AddNoteModal/AddNoteModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from './src/components/Note/Note';

function App(): JSX.Element {

  const searchQuery = useInput('');
  const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
  const [notes, setNotes] = useState([]);

  var testArray = [{
    ID: 1,
    name: "Alex"
  },
  {
    ID: 2,
    name: "James"
  }]

  const addNoteToStorage = async (data) => {
    // console.log(data);
    // console.log(JSON.stringify(data));
    let randomNumber = String(Math.floor((Math.random() * 10000) + 1));

    try {
      await AsyncStorage.setItem(`note-${randomNumber}`, JSON.stringify(data));
    }
    catch (error) {
      console.log(error);
    }

    toggleModal();
    getNotes();
  }

  const getNotes = async () => {

    try {
      await AsyncStorage.getItem('note').then(data => {
        setNotes(JSON.parse(data));
      })
    }
    catch (error) {
      console.log(error)
    };
  }

  useEffect(() => {
    getNotes();

  }, []);

  const renderNotes = ({ item, index }) => {
    return (
      <View>
        <Note item={item} />
        {/* <Text>Hello</Text> */}
      </View>
    )
  };

  const removeNote = (id) => {

  }

  return (
    <PaperProvider>
      <View style={{ backgroundColor: '#1f454d', flex: 1 }}>
        <View style={{marginTop:30}}>
          <Text style={{color:'white', textAlign:'center', fontFamily:'Roboto-Bold', fontSize:40}}>My Notes</Text>
        </View>
        <View style={{ marginTop: 40, marginLeft: 10, marginRight: 10 }}>
          <SearchNotesBar value={searchQuery.value} handleChange={searchQuery.handleChange} />
        </View>
        <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
          <IconButton icon="plus" mode="contained"
            style={{ backgroundColor: '#5acc83' }}
            onPressIn={toggleModal}
            size={25}
            iconColor='white' >
          </IconButton>
        </View>

        {
          notes?.length === 0 ?
            <Text variant='headlineSmall' style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>There are currently no notes.</Text>
            : <View style={{ flex: 1 }}>
              <FlatList
                keyExtractor={(item) => item.ID}
                data={testArray}
                renderItem={renderNotes}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-around' }}
                style={{ borderWidth: 1, borderColor: 'red' }}
              />
            </View>
        }
      </View>

      {
        itemModalOpen ?
          <AddNoteModal
            isVisible={itemModalOpen}
            toggleModal={toggleModal}
            addNote={addNoteToStorage}
          />
          : null
      }
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

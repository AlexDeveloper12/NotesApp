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
import useArray from './src/hooks/useArray';
import DeleteNoteModal from './src/components/DeleteNoteModal/DeleteNoteModal';
import { UUID } from 'bson';

function App(): JSX.Element {

  const searchQuery = useInput('');
  const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
  const [deleteModalOpen, setDeleteModalOpen, toggleDeleteModal] = useModal();
  const notes = useArray([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [chosenNoteID,setChosenNoteID] = useState(0);

  const addNoteToStorage = async (data) => {
    // console.log(data);
    // console.log(JSON.stringify(data));
    let randomNumber = String(Math.floor((Math.random() * 10000) + 1));

    try {

      const newNotes = [...notes.value, { id: randomNumber, noteText: data }];

      await AsyncStorage.setItem('note', JSON.stringify(newNotes));

      notes.setValue(newNotes);

    }
    catch (error) {
      console.log(error);
    }

    toggleModal();
    getNotes();
  }

  const getNotes = async () => {

    try {
      const savedNotes = await AsyncStorage.getItem('note');
      
      //notes.setValue(JSON.parse(savedNotes));
      notes.setValue(JSON.parse(await AsyncStorage.getItem('note')));
    }
    catch (error) {
      console.log(error)
    };
  }

  useEffect(() => {
    getNotes();
  }, [notes.value]);

  const toggleDelete = (noteID) => {
    setDeleteModalOpen(true);
    setChosenNoteID(noteID);
    console.log(noteID)

  }

  const renderNotes = ({ item, index }) => {
    return (
      <View>
        <Note item={item} togDel={toggleDelete} />
      </View>
    )
  };

  const removeNote = async (id) => {
    const newNotes = notes.value.filter(note => note.noteID != id);
    await AsyncStorage.setItem('note', JSON.stringify(newNotes));
    setFilteredNotes(newNotes);
    notes.setValue(newNotes)
  }

  const searchNotesFilter = (e) => {
    searchQuery.handleChange(e);

    setFilteredNotes(
      filteredNotes.filter(note => note.noteText.includes(e))
    );

    // console.log(e);
  }

  return (
    <PaperProvider>
      <View style={{ backgroundColor: '#1f454d', flex: 1 }}>
        <View style={{ marginTop: 30 }}>
          <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'Roboto-Bold', fontSize: 40 }}>My Notes</Text>
        </View>
        <View style={{ marginTop: 40, marginLeft: 10, marginRight: 10 }}>
          <SearchNotesBar value={searchQuery.value} handleChange={searchNotesFilter} />
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
          notes.value.length === 0  ?
            <Text variant='headlineSmall' style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>There are currently no notes.</Text>
            : <View style={{ flex: 1 }}>
              <FlatList
                keyExtractor={(item) => item.id}
                data={searchQuery.value > 0 && notes.value.length > 0 ? filteredNotes : notes.value}
                renderItem={renderNotes}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-around' }}
                contentContainerStyle={{ width: '100%' }}
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

      {
        deleteModalOpen ?
          <DeleteNoteModal
            isVisible={deleteModalOpen}
            toggleModal={toggleDeleteModal}
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

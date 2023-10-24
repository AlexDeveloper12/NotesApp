/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList
} from 'react-native';

import { Button, PaperProvider, IconButton, Text, ActivityIndicator, MD2Colors } from 'react-native-paper';
import SearchNotesBar from './src/components/SearchNotesBar';
import useInput from './src/hooks/useInput';
import useModal from './src/hooks/useModal';
import AddNoteModal from './src/components/AddNoteModal/AddNoteModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from './src/components/Note/Note';
import useArray from './src/hooks/useArray';
import DeleteNoteModal from './src/components/DeleteNoteModal/DeleteNoteModal';
import UpdateNoteModal from './src/components/UpdateNoteModal.js/UpdateNoteModal';

function App(): JSX.Element {

  const searchQuery = useInput('');
  const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
  const [deleteModalOpen, setDeleteModalOpen, toggleDeleteModal] = useModal();
  const [updateModalOpen, setUpdateModalOpen, toggleUpdateModal] = useModal();
  const notes = useArray([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [chosenNoteID, setChosenNoteID] = useState(0);
  const [collapsedNoteID, setCollapsedNoteID] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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
    console.log(itemModalOpen);
    console.log(deleteModalOpen);
    // setDeleteModalOpen(true);
    toggleDeleteModal();
    setChosenNoteID(noteID);
  }

  const showDeleteIndicator = () => {
    return (
      <View style={{marginTop:20}}>
        <ActivityIndicator animating={isDeleting} color={MD2Colors.green400} size={40} />
        <Text style={{color:'#fff', textAlign:'center', justifyContent:'center', marginTop:20, fontSize:15, fontFamily:'Roboto-Medium'}}>Deleting note...</Text>
      </View>
      
    )

  }

  const renderNotes = ({ item, index }) => {
    return (
      <View>
        <Note item={item} deleteNote={deleteNote} togUpd={toggleUpdateModal} />
      </View>
    )
  };

  const deleteNote = async (id) => {
    setIsDeleting(true);
    //we are filtering the list and only returing the values in the notes where the id is not equal to the 
    //one passed in parameter, ie we are only returning the ones that don't have the id of the note we clicked
    const newNotes = notes.value.filter(note => note.id != id);
    console.log(newNotes);
    //we then set the async storage value of the key note equal to the new array
    await AsyncStorage.setItem('note', JSON.stringify(newNotes));
    setFilteredNotes(newNotes);
    notes.setValue(newNotes);

    setIsDeleting(false);
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
            onPress={toggleModal}
            size={25}
            iconColor='white' >
          </IconButton>
        </View>

        {
          isDeleting ?
            (
              showDeleteIndicator()
            )
            : null
        }

        {
          notes.value.length === 0 ?
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text variant='headlineSmall' style={{ color: '#fff', marginTop: 10 }}>There are currently no notes.</Text>
            </View>
            : <View style={{ flex: 1 }}>
              <FlatList
                keyExtractor={(item) => item.id}
                data={searchQuery.value > 0 && notes.value.length > 0 ? filteredNotes : notes.value}
                renderItem={renderNotes}
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
            noteID={chosenNoteID}
            deleteNote={deleteNote}
          />
          : null
      }

      {
        updateModalOpen ?
          <UpdateNoteModal
            isVisible={updateModalOpen}
            toggleModal={toggleUpdateModal}
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

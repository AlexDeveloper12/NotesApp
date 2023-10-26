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

import { Button, PaperProvider, IconButton, Text, ActivityIndicator, MD2Colors, Modal, Portal, TextInput } from 'react-native-paper';
import SearchNotesBar from './src/components/SearchNotesBar';
import useInput from './src/hooks/useInput';
import useModal from './src/hooks/useModal';
import AddNoteModal from './src/components/AddNoteModal/AddNoteModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from './src/components/Note/Note';
import useArray from './src/hooks/useArray';
import DeleteNoteModal from './src/components/DeleteNoteModal/DeleteNoteModal';
import UpdateNoteModal from './src/components/UpdateNoteModal.js/UpdateNoteModal';
import Header from './src/components/Header/Header';
import AddNoteButton from './src/components/AddNoteButton/AddNoteButton';

function App(): JSX.Element {

  const searchQuery = useInput('');
  const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
  const [deleteModalOpen, setDeleteModalOpen, toggleDeleteModal] = useModal();
  const [updateModalOpen, setUpdateModalOpen, toggleUpdateModal] = useModal();
  const notes = useArray([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [chosenNoteID, setChosenNoteID] = useState(0);
  const [chosenNoteData, setChosenNoteData] = useState({});

  const addNoteToStorage = async (data) => {

    let nextID = Math.max(...notes.value.map(o => o.id), 1) + 1;

    console.log(nextID);

    let noteItems = await getNotes();

    const noteToBeSaved = { id: nextID, noteText: data };

    noteItems.push(noteToBeSaved);

    await AsyncStorage.setItem(
      "note",
      JSON.stringify(noteItems)
    )

    toggleModal();

    getNotes()
    .then((note)=>{
      notes.setValue(note);
    })
  }

  const getNotes = async () => {

    let currentNotes = await AsyncStorage.getItem('note');
    return currentNotes ? JSON.parse(currentNotes) : [];

  }

  useEffect(() => {

    getNotes()
      .then((note) => {
        notes.setValue(note);
      });

    const largestID = Math.max(...notes.value.map(o => o.id), 1);

    console.log(largestID);


  }, []);

  const renderNotes = ({ item, index }) => {
    return (
      <View>
        <Note item={item} deleteNote={deleteNote} togUpd={toggleUpdate} togDel={toggleDelete} />
      </View>
    )
  };

  const toggleUpdate = (updateData) => {
    console.log(updateData);
    setChosenNoteData(updateData);
    toggleUpdateModal();
  }

  const toggleDelete = (id) => {
    setChosenNoteID(id);
    toggleDeleteModal();
  }

  const deleteNote = async (id) => {
    toggleDeleteModal();
    //we are filtering the list and only returing the values in the notes where the id is not equal to the 
    //one passed in parameter, ie we are only returning the ones that don't have the id of the note we clicked
    const newNotes = notes.value.filter(note => note.id != id);

    //we then set the async storage value of the key note equal to the new array
    await AsyncStorage.setItem('note', JSON.stringify(newNotes));
    notes.setValue(newNotes);
  }

  const searchNotesFilter = (e) => {
    searchQuery.handleChange(e);

    setFilteredNotes(
      filteredNotes.filter(note => note.noteText.includes(e))
    );
    console.log(filteredNotes);

    console.log(e);
  }

  const updateNote = async (id, text) => {

    try {

      const myNotes = notes.value;
      const noteToUpdate = notes.value.filter((note) => note.id === id);

      await AsyncStorage.setItem('note', JSON.stringify(noteData));
      toggleUpdateModal();
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <PaperProvider>
      <View style={{ backgroundColor: '#1f454d', flex: 1 }}>
        <Header />

        <SearchNotesBar
          value={searchQuery.value}
          handleChange={searchNotesFilter}
        />

        <AddNoteButton
          toggleModal={toggleModal} />

        {
          notes.value === null || notes.value === undefined || notes.value.length === 0 ?
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
            noteData={chosenNoteData}
            update={updateNote}
          />

          : null
      }

    </PaperProvider>
  );
}

export default App;

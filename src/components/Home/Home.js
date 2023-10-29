import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    FlatList
} from 'react-native';

import { Button, PaperProvider, IconButton, Text, ActivityIndicator, MD2Colors, Modal, Portal, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { SearchNotesBar, useInput, useArray, useModal, AddNoteModal, Note, DeleteNoteModal, UpdateNoteModal, AddNoteButton, Favourites, NotesCount, Sort,a } from '../Index/Index';
import commonStyles from '../../styles/CommonStyles/CommonStyles';

function Home() {
    const searchQuery = useInput('');
  const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
  const [deleteModalOpen, setDeleteModalOpen, toggleDeleteModal] = useModal();
  const [updateModalOpen, setUpdateModalOpen, toggleUpdateModal] = useModal();
  const notes = useArray([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [chosenNoteID, setChosenNoteID] = useState(0);
  const [chosenNoteData, setChosenNoteData] = useState({});
  const [isAscendFilterActive, setIsAscendFilterActive] = useState(false);
  const [isDescendFilterActive, setIsDescenFilterActive] = useState(false);

  const addNoteToStorage = async (data) => {

    let nextID = Math.max(...notes.value.map(o => o.id), 1) + 1;

    let noteItems = await getNotes();

    const noteToBeSaved = { id: nextID, noteText: data, isFavourite: false, dateCreated: moment().format("DD-MM-YYYY HH:mm:ss") };

    noteItems.push(noteToBeSaved);

    await AsyncStorage.setItem(
      "note",
      JSON.stringify(noteItems)
    )

    toggleModal();

    getNotes()
      .then((note) => {
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
        setFilteredNotes(note);
      });

    const largestID = Math.max(...notes.value.map(o => o.id), 1);

    console.log(largestID);


  }, []);

  const renderNotes = ({ item, index }) => {
    return (
      <View>
        <Note
          item={item}
          deleteNote={deleteNote}
          togUpd={toggleUpdate}
          togDel={toggleDelete}
          togFav={toggleFavourite}
        />
      </View>
    )
  };

  const toggleUpdate = (updateData) => {
    console.log(updateData);
    setChosenNoteData(updateData);
    toggleUpdateModal();
    sortNotesAscending();
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

  }

  const updateNote = async (id, text) => {

    try {

      const myNotes = notes.value;
      const noteToUpdate = await AsyncStorage.getItem('note');

      await AsyncStorage.setItem('note', JSON.stringify(noteData));
      toggleUpdateModal();
    }
    catch (error) {
      console.log(error)
    }
  }

  const toggleFavourite = async (id) => {

    let noteArray = [];

    try {


      let noteToToggleFavourite = await AsyncStorage.getItem('note');

      if (noteToToggleFavourite !== null) {
        noteArray = JSON.parse(noteToToggleFavourite);
      }
      noteArray.push(noteToToggleFavourite);

      const parsedData = JSON.parse(noteToToggleFavourite);

      const getSelectedNote = parsedData.filter((note) => note.id === id)[0];

      let isFavouriteTrueFalse = false;

      console.log(getSelectedNote);
      if (getSelectedNote.isFavourite === false) {
        getSelectedNote.isFavourite = true;
      }
      else {
        getSelectedNote.isFavourite = false;
      }

      const updatedNoteString = JSON.stringify(getSelectedNote);

      AsyncStorage.mergeItem('note', updatedNoteString);

    }
    catch (error) {
      console.log(error);
    }

  }

  const sortNotesAscending = () => {

    if (isDescendFilterActive) {
      setIsDescenFilterActive(false);
    }

    setIsAscendFilterActive(!isAscendFilterActive);
    var sortMe = notes.value.sort(({ dateCreated: a }, { dateCreated: b }) => a < b ? -1 : a > b ? 1 : 0);

    notes.setValue(sortMe);
  }

  const sortNotesDescending = () => {

    if (isAscendFilterActive) {
      setIsAscendFilterActive(false);
    }

    setIsDescenFilterActive(!isDescendFilterActive);
    var sortDescending = notes.value.sort(({ dateCreated: a }, { dateCreated: b }) => a < b ? -1 : a > b ? 1 : 0).reverse();

    notes.setValue(sortDescending);
  }

  return (
    <PaperProvider>
      <View style={commonStyles.commonContainer}>

        <SearchNotesBar
          value={searchQuery.value}
          handleChange={searchNotesFilter}
        />

        <AddNoteButton
          toggleModal={toggleModal} />

        {
          notes.value === null || notes.value === undefined || notes.value.length === 0 ?
            <View style={commonStyles.centerElement}>
              <Text variant='headlineSmall' style={commonStyles.noDataExistsText}>There are currently no notes.</Text>
            </View>
            : <View style={{ flex: 1 }}>
              <NotesCount count={notes.value.length} />
              <Sort
                ascending={sortNotesAscending}
                descending={sortNotesDescending}
                ascActive={isAscendFilterActive}
                descActive={isDescendFilterActive}
              />
              <FlatList
                keyExtractor={(item) => item.id}
                data={searchQuery.value.length > 0 && notes.value.length > 0 ? filteredNotes : notes.value}
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
  )
}

export default Home;
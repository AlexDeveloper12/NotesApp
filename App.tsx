import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList
} from 'react-native';
import { PaperProvider, BottomNavigation, IconButton, Text, ActivityIndicator, MD2Colors, Modal, Portal, TextInput } from 'react-native-paper';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import 'react-native-gesture-handler';
import { SearchNotesBar, useInput, useArray, useModal, AddNoteModal, Note, DeleteNoteModal, UpdateNoteModal, Header, AddNoteButton, Favourites, NotesCount, Sort,a } from './src/components/Index/Index';
import NavigationTabs from './navigation/NavigationTabs';

function App(): JSX.Element {
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

    // getNotes()
    //   .then((note) => {
    //     notes.setValue(note);
    //     setFilteredNotes(note);
    //   });

    // const largestID = Math.max(...notes.value.map(o => o.id), 1);

    // console.log(largestID);


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


      // console.log(parsedData);
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
      <View style={{ backgroundColor: '#1f454d', flex: 1 }}>
        <NavigationTabs/>
        </View>

    </PaperProvider>
  )
}

export default App;

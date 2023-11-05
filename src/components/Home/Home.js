import React, { useEffect, useState } from 'react';
import {
  View,
} from 'react-native';

import { PaperProvider, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {
  SearchNotesBar, useInput, useArray, useModal, AddNoteModal, Note, DeleteNoteModal, UpdateNoteModal,
  AddNoteButton, Favourites, NotesCount, Sort,
} from '../Index/Index';

import commonStyles from '../../styles/CommonStyles/CommonStyles';
import SortAscending from '../../Helpers/SortAscending';
import SortDescending from '../../Helpers/SortDescending';
import GetLargestID from '../../Helpers/GetLargestID';
import NotesList from '../NotesList/NotesList';
import FindAndUpdateNote from '../../Helpers/FindAndUpdateNote';
import UpdateNoteFavourite from '../../Helpers/UpdateNoteFavourite';
import SortDateCreatedAscending from '../../Helpers/SortDateCreatedAscending';
import DeleteAllNotesModal from '../DeleteAllNotesModal/DeleteAllNotesModal';
import DeleteAllNotes from '../../Helpers/DeleteAllNotes';

function Home() {
  const searchQuery = useInput('');
  const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
  const [deleteModalOpen, setDeleteModalOpen, toggleDeleteModal] = useModal();
  const [updateModalOpen, setUpdateModalOpen, toggleUpdateModal] = useModal();
  const [deleteAllNotesOpen, setDeleteAllNotesOpen, toggleDeleteAllNotesModal] = useModal();
  const notes = useArray([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [chosenNoteID, setChosenNoteID] = useState(0);
  const [chosenNoteData, setChosenNoteData] = useState({});
  const [isAscendFilterActive, setIsAscendFilterActive] = useState(false);
  const [isDescendFilterActive, setIsDescenFilterActive] = useState(false);
  const [isAscendDateCreFilterActive, setIsAscendDateCreFilterActive] = useState(false);

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

  const deleteAllNotes = async () => {
    try {
      await DeleteAllNotes();
      toggleDeleteAllNotesModal();
      getNotes()
      .then((note)=>{
        notes.setValue(note);
      })
    }
    catch (error) {
      console.log(error);
    }

  }

  const updateNote = async (id, text) => {

    try {
      const myNotes = notes.value;

      await FindAndUpdateNote(myNotes, id, text);

      toggleUpdateModal();
    }
    catch (error) {
      console.log(error)
    }
  }

  const toggleFavourite = async (id) => {

    try {
      await UpdateNoteFavourite(id);
      getNotes()
      .then((note)=>{
        notes.setValue(note)
      })

    }
    catch (error) {
      console.log(error);
    }

  }

  const sortNotesAscending = () => {

    if (isDescendFilterActive) {
      setIsDescenFilterActive(false);
    }

    if (isAscendDateCreFilterActive) {
      setIsAscendDateCreFilterActive(false);
    }

    setIsAscendFilterActive(!isAscendFilterActive);
    var sortedAscArray = SortAscending(notes.value);

    notes.setValue(sortedAscArray);
  }

  const sortNotesDescending = () => {

    if (isAscendFilterActive) {
      setIsAscendFilterActive(false);
    }

    if (isAscendDateCreFilterActive) {
      setIsAscendDateCreFilterActive(false);
    }

    setIsDescenFilterActive(!isDescendFilterActive);
    var sortedDescArray = SortDescending(notes.value);

    notes.setValue(sortedDescArray);
  }

  const sortNotesDateCreAscending = () => {
    if (isDescendFilterActive) {
      setIsDescenFilterActive(false);
    }

    if (isAscendFilterActive) {
      setIsAscendFilterActive(false);
    }

    setIsAscendDateCreFilterActive(!isAscendDateCreFilterActive);

    var sortedDateCreArray = SortDateCreatedAscending(notes.value);

    notes.setValue(sortedDateCreArray);
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
                ascDateCreated={sortNotesDateCreAscending}
                ascDateCreatedActive={isAscendDateCreFilterActive}
                toggleDeleteAll={toggleDeleteAllNotesModal}
              />
              <NotesList
                noteData={searchQuery.value.length > 0 && notes.value.length > 0 ? filteredNotes : notes.value}
                renderNotes={renderNotes}
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

      {
        deleteAllNotesOpen ?
          <DeleteAllNotesModal
            isVisible={deleteAllNotesOpen}
            toggleModal={toggleDeleteAllNotesModal}
            deleteAll={deleteAllNotes}
          />
          : null
      }

    </PaperProvider>
  )
}

export default Home;
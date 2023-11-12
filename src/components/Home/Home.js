import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { PaperProvider, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {
  SearchNotesBar, useInput, useArray, useModal, AddNoteModal, Note, DeleteModal, UpdateNoteModal,
  AddNoteButton, NotesCount, Sort,
} from '../Index/Index';

import {
  FindAndUpdateNote, UpdateNoteFavourite, SortDateCreatedAscending, DeleteAllNotes,
  GetFavourites, AddNote, GetNotesList, SortAscending, SortDescending
} from '../IndexHelpers/IndexHelpers';

import commonStyles from '../../styles/CommonStyles/CommonStyles';
import NotesList from '../NotesList/NotesList';;
import SortIcon from '../SortIcon/SortIcon';

function Home() {
  const searchQuery = useInput('');
  const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
  const [deleteModalOpen, setDeleteModalOpen, toggleDeleteModal] = useModal();
  const [updateModalOpen, setUpdateModalOpen, toggleUpdateModal] = useModal();
  const [deleteAllNotesOpen, setDeleteAllNotesOpen, toggleDeleteAllNotesModal] = useModal();
  const notes = useArray([]);
  const backupNotes = useArray([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [chosenNoteID, setChosenNoteID] = useState(0);
  const [chosenNoteData, setChosenNoteData] = useState({});
  const [isAscendFilterActive, setIsAscendFilterActive] = useState(false);
  const [isDescendFilterActive, setIsDescenFilterActive] = useState(false);
  const [isAscendDateCreFilterActive, setIsAscendDateCreFilterActive] = useState(false);
  const [isFavouriteFilterActive, setIsFavouriteFilterActive] = useState(false);

  const addNoteToStorage = async (data, favouriteValue) => {

    var dateCreated = moment().format("DD-MM-YYYY HH:mm:ss");

    await AddNote(notes.value, data, favouriteValue, dateCreated);

    toggleModal();

    GetNotesList()
      .then((note) => {
        notes.setValue(note);
      });
  }

  useEffect(() => {

    GetNotesList()
      .then((note) => {
        notes.setValue(note);
        setFilteredNotes(note);
        backupNotes.setValue(note);
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

    //we are filtering the list and only returing the values in the notes where the id is not equal to the 
    //one passed in parameter, ie we are only returning the ones that don't have the id of the note we clicked
    const newNotes = notes.value.filter(note => note.id != id);

    //we then set the async storage value of the key note equal to the new array
    await AsyncStorage.setItem('note', JSON.stringify(newNotes));
    notes.setValue(newNotes);
    toggleDeleteModal();
  }

  const searchNotesFilter = (e) => {
    searchQuery.handleChange(e);

    if (isAscendFilterActive || isDescendFilterActive || isAscendDateCreFilterActive || isFavouriteFilterActive) {
      setIsAscendFilterActive(false);
      setIsDescenFilterActive(false);
      setIsAscendDateCreFilterActive(false);
      setIsFavouriteFilterActive(false);
    }

    if (searchQuery.value.length === 0) {
      notes.setValue(notes.value);
      setFilteredNotes(notes.value);
    } else {
      setFilteredNotes(filteredNotes.filter((item) =>
        item.noteText.toUpperCase().includes(e.toUpperCase())
      ));
    }

  }

  const deleteAllNotes = async () => {
    try {
      await DeleteAllNotes();
      toggleDeleteAllNotesModal();
      GetNotesList()
        .then((note) => {
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
      GetNotesList()
        .then((note) => {
          notes.setValue(note);
          setFilteredNotes(note);
        })
    }
    catch (error) {
      console.log(error);
    }

  }

  const sortNotesAscending = () => {

    filterNotes('filter-ascending');
  }

  const sortNotesDescending = () => {

    filterNotes('filter-descending');
  }

  const sortNotesDateCreAscending = () => {

    filterNotes('filter-date-ascending');
  }

  const sortNotesFavourite = () => {

    filterNotes('filter-favourite');

  }

  //need to pass in the active filter and then falsify all oterhs and 
  //then determine what function to run depending on what filter selected

  const filterNotes = async (filterName) => {
    //on click of the filter this will run
    console.log(notes.value);

    if (filterName === 'filter-ascending') {
      setIsDescenFilterActive(false);
      if (isFavouriteFilterActive) {
        setIsFavouriteFilterActive(false);
      }

      setIsAscendDateCreFilterActive(false);
      if (isAscendFilterActive) {
        setIsAscendFilterActive(false);
      }
      else {
        setIsAscendFilterActive(true);
        var sortedAscArray = SortAscending(notes.value);

        notes.setValue(sortedAscArray);

      }
    }

    if (filterName === 'filter-descending') {
      setIsAscendFilterActive(false);
      if (isFavouriteFilterActive) {
        setIsFavouriteFilterActive(false);
        GetNotesList()
          .then(note => {
            notes.setValue(note);
          })
      }

      setIsAscendDateCreFilterActive(false);
      if (isDescendFilterActive) {
        setIsDescenFilterActive(false);
      }
      else {
        setIsDescenFilterActive(true);

        var sortedDescArray = SortDescending(notes.value);

        notes.setValue(sortedDescArray);
      }
    }

    if (filterName === 'filter-date-ascending') {
      setIsAscendFilterActive(false);
      if (isFavouriteFilterActive) {
        setIsFavouriteFilterActive(false);
        GetNotesList()
          .then(note => {
            notes.setValue(note);
          })

      }
      setIsFavouriteFilterActive(false);
      if (isAscendDateCreFilterActive) {
        setIsAscendDateCreFilterActive(false);

      }
      else {
        setIsAscendDateCreFilterActive(true);

        var sortedDateCreArray = SortDateCreatedAscending(notes.value);

        notes.setValue(sortedDateCreArray);

      }
    }

    if (filterName === 'filter-favourite') {
      setIsAscendFilterActive(false);
      setIsDescenFilterActive(false);
      setIsAscendDateCreFilterActive(false);
      if (isFavouriteFilterActive) {
        setIsFavouriteFilterActive(false);

      } else {
        setIsFavouriteFilterActive(true);

        var sortedFavouriteArray = GetFavourites(notes.value);

        notes.setValue(sortedFavouriteArray);

      }
    }

  }

  const SetNotesToDefault = () => {
    GetNotesList()
      .then(note => {
        notes.setValue(note);
      });
  }



  return (
    <PaperProvider>
      <View style={commonStyles.commonContainer}>

        {
          notes.value.length > 0 ?

            <SearchNotesBar
              value={searchQuery.value}
              handleChange={searchNotesFilter}
            />
            : null
        }


        <AddNoteButton
          toggleModal={toggleModal} />

        <NotesCount count={notes.value.length} />

        <Sort>

          <SortIcon
            sortFunction={sortNotesAscending}
            isActive={isAscendFilterActive}
            icon={'sort-ascending'}
          />

          <SortIcon
            sortFunction={sortNotesDescending}
            isActive={isDescendFilterActive}
            icon={'sort-descending'}
          />

          <SortIcon
            sortFunction={sortNotesDateCreAscending}
            isActive={isAscendDateCreFilterActive}
            icon={'sort-calendar-ascending'}

          />

          <SortIcon
            sortFunction={toggleDeleteAllNotesModal}
            icon={'trash-can'}

          />

          <SortIcon
            sortFunction={sortNotesFavourite}
            isActive={isFavouriteFilterActive}
            icon={'star'}
          />
        </Sort>

        {

          notes.value === null ||
            notes.value === undefined || notes.value.length === 0 ||
            filteredNotes === null ||
            filteredNotes.length === 0 ||
            filteredNotes === undefined ?
            <View style={commonStyles.centerElement}>
              <Text variant='headlineSmall' style={commonStyles.noDataExistsText}>There are currently no notes.</Text>
            </View>
            : <View style={{ flex: 1 }}>

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

          <DeleteModal
            headerText={'Are you sure you want to delete the note?'}
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

          <DeleteModal
            headerText={'Are you sure you want to delete all notes?'}
            isVisible={deleteAllNotesOpen}
            toggleModal={toggleDeleteAllNotesModal}
            deleteNote={deleteAllNotes}
          />


          : null
      }

    </PaperProvider>
  )
}

export default Home;
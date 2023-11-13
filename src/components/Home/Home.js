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
import { DeleteSingleNote } from '../../Helpers/DeleteSingleNote';

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

    const newNotes = await DeleteSingleNote(notes.value, id);
    toggleDeleteModal();
    notes.setValue(newNotes);

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

    let determineNotes = determineNotesLengthStatus();

    setFilterStatus('ascending');
    var sortedAscArray = SortAscending(determineNotes);

    notes.setValue(sortedAscArray);

  }

  const sortNotesDescending = () => {

    let determineNotes = determineNotesLengthStatus();

    setFilterStatus('descending');

    var sortedDescArray = SortDescending(determineNotes);

    notes.setValue(sortedDescArray);

  }

  const sortNotesDateCreAscending = () => {

    let determineNotes = determineNotesLengthStatus();

    setFilterStatus('date-created-ascending');

    var sortedDateCreArray = SortDateCreatedAscending(determineNotes);

    notes.setValue(sortedDateCreArray);
  }

  const sortNotesFavourite = () => {

    let origNotes = [...notes.value];

    setFilterStatus('favourite')

    var sortedFavouriteArray = GetFavourites(origNotes);

    notes.setValue(sortedFavouriteArray);

  }

  //need to pass in the active filter and then falsify all oterhs and 
  //then determine what function to run depending on what filter selected


  const setFilterStatus = (currentFilter) => {

    switch (currentFilter) {
      case 'ascending':
        setIsAscendFilterActive(true);
        setIsDescenFilterActive(false);
        setIsAscendDateCreFilterActive(false);
        setIsFavouriteFilterActive(false);
        break;
      case 'descending':
        setIsAscendFilterActive(false);
        setIsDescenFilterActive(true);
        setIsAscendDateCreFilterActive(false);
        setIsFavouriteFilterActive(false);
        break;
      case 'date-created-ascending':
        setIsAscendFilterActive(false);
        setIsDescenFilterActive(false);
        setIsAscendDateCreFilterActive(true);
        setIsFavouriteFilterActive(false);
        break;
      case 'favourite':
        setIsAscendFilterActive(false);
        setIsDescenFilterActive(false);
        setIsAscendDateCreFilterActive(false);
        setIsFavouriteFilterActive(true);
        break;

    }

  }


  const determineNotesLengthStatus = () => {

    let origNotes = [];

    if (notes.value.length === backupNotes.value.length) {
      origNotes = [...notes.value];
    }
    else {
      origNotes = [...backupNotes.value];
    }

    return origNotes;
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
            type={'deletesingle'}
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
            type={'deleteall'}
          />


          : null
      }

    </PaperProvider>
  )
}

export default Home;
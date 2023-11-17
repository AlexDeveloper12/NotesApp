import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { PaperProvider, Text } from 'react-native-paper';
import moment from 'moment';
import {
  SearchNotesBar, useInput, useArray, useModal, AddNoteModal, Note, DeleteModal, UpdateNoteModal,
  AddNoteButton, NotesCount, Sort, SortIcon, NotesList
} from '../Index/Index';
import {
  FindAndUpdateNote, UpdateNoteFavourite, SortDateCreatedAscending, DeleteAllNotes,
  GetFavourites, AddNote, GetNotesList, SortAscending, SortDescending, DeleteSingleNote, FilterSearch
} from '../IndexHelpers/IndexHelpers';
import commonStyles from '../../styles/CommonStyles/CommonStyles';
import { CONSTANTS } from '../../constants/constants';

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
  const [isFilterActive, setIsFilterActive] = useState({
    ascend: false, descend: false, ascendDateCre: false, favourite: false
  })

  const addNoteToStorage = async (data, favouriteValue) => {

    var dateCreated = moment().format("DD-MM-YYYY HH:mm:ss");

    //it is going back to 1/2 because when you click on the filter tab it resets the filter list
    //to the favourites only, so when i pass in the filtered notes the length is only 1 or 2 because
    //it has been filtered, so when i set the state again and the last max id is 1/2 it combines
    //it with the other notes and one already has a 1 or 2

    let noteAdded = await AddNote(notes.value, data, favouriteValue, dateCreated);

    
    let latestNotes = await GetNotesList();
    let notesArrayInOrder = [];

    if (noteAdded.isFavourite === "True" && isFilterActive.favourite || noteAdded.isFavourite==="False" && isFilterActive.favourite) {

      notesArrayInOrder = GetFavourites(latestNotes)

    }
    else if(isFilterActive.ascend) {

      notesArrayInOrder = SortAscending(latestNotes);
    }
    else if(isFilterActive.descend){
      notesArrayInOrder = SortDescending(latestNotes);
    }
    else if(isFilterActive.ascendDateCre){
      notesArrayInOrder = SortDateCreatedAscending(latestNotes);
    }

    //notes.setValue(notesArrayInOrder);

    toggleModal();

    setFilteredNotes(notesArrayInOrder);



  }

  useEffect(() => {

    GetNotesList()
      .then((note) => {
        notes.setValue(note);
        setFilteredNotes(note);
      });

  }, []);

  const renderNotes = ({ item }) => {
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

    const newNotes = await DeleteSingleNote(filteredNotes, id);
    toggleDeleteModal();
    notes.setValue(newNotes);
    setFilteredNotes(newNotes);
  }

  const searchNotesFilter = (e) => {

    let keyword = e.toLowerCase();

    searchQuery.handleChange(e);

    let notesCopy = [...notes.value];

    if (isFilterActive.ascend || isFilterActive.descend || isFilterActive.ascendDateCre || isFilterActive.favourite) {
      setIsFilterActive({
        ascend: false,
        descend: false,
        ascendDateCre: false,
        favourite: false
      });
    }

    notesCopy = FilterSearch(notesCopy, keyword);

    setFilteredNotes(notesCopy);

  }

  const deleteAllNotes = async () => {
    try {
      await DeleteAllNotes();
      toggleDeleteAllNotesModal();
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

  const updateNote = async (id, text) => {
    try {
      const myNotes = [...filteredNotes];

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

    //when i click on sort ascending i need to get an example of the whole array of data
    //including the favourites, if i use filtered notes it will only bring back the 
    //favourites if i am clicking from there

    setFilterStatus('ascending');

    var sortedAscArray = SortAscending(notes.value);

    setFilteredNotes(sortedAscArray);

  }

  const sortNotesDescending = () => {

    setFilterStatus('descending');

    var sortedDescArray = SortDescending(notes.value);

    setFilteredNotes(sortedDescArray);

  }

  const sortNotesDateCreAscending = () => {

    setFilterStatus('date-created-ascending');

    var sortedDateCreArray = SortDateCreatedAscending(notes.value);

    setFilteredNotes(sortedDateCreArray);

  }

  const sortNotesFavourite = () => {

    setFilterStatus('favourite')

    var sortedFavouriteArray = GetFavourites(notes.value);

    setFilteredNotes(sortedFavouriteArray);

  }

  const setFilterStatus = (currentFilter) => {

    switch (currentFilter) {
      case 'ascending':
        setIsFilterActive({
          ascend: true,
          descend: false,
          ascendDateCre: false,
          favourite: false
        });
        break;
      case 'descending':
        setIsFilterActive({
          ascend: false,
          descend: true,
          ascendDateCre: false,
          favourite: false
        });
        break;
      case 'date-created-ascending':
        setIsFilterActive({
          ascend: false,
          descend: false,
          ascendDateCre: true,
          favourite: false
        });
        break;
      case 'favourite':
        setIsFilterActive({
          ascend: false,
          descend: false,
          ascendDateCre: false,
          favourite: true
        });
        break;

    }

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

        <NotesCount count={filteredNotes.length} />

        <Sort>

          <SortIcon
            sortFunction={sortNotesAscending}
            isActive={isFilterActive.ascend}
            icon={'sort-ascending'}
          />

          <SortIcon
            sortFunction={sortNotesDescending}
            isActive={isFilterActive.descend}
            icon={'sort-descending'}
          />

          <SortIcon
            sortFunction={sortNotesDateCreAscending}
            isActive={isFilterActive.ascendDateCre}
            icon={'sort-calendar-ascending'}

          />

          {
            filteredNotes.length > 0 ?
              <SortIcon
                sortFunction={toggleDeleteAllNotesModal}
                icon={'trash-can'}
              />
              : null
          }



          <SortIcon
            sortFunction={sortNotesFavourite}
            isActive={isFilterActive.favourite}
            icon={'star'}
          />
        </Sort>

        {
          filteredNotes === null ||
            filteredNotes.length === 0 ||
            filteredNotes === undefined ?
            <View style={commonStyles.centerElement}>
              <Text variant='headlineSmall' style={commonStyles.noDataExistsText}>{CONSTANTS.EMPTY_NOTES_MESSAGE}</Text>
            </View>
            : <View style={{ flex: 1 }}>
              <NotesList
                noteData={filteredNotes}
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
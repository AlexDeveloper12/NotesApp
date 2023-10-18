/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList
} from 'react-native';

import { Button, PaperProvider, useTheme, IconButton } from 'react-native-paper';
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

  const testArray = [{
    id: 1,
    name: 'Alex'
  },
  {
    id: 2,
    name: "David"
  }]

  const addNoteToStorage = async (data) => {

    try {
      await AsyncStorage.setItem(`note`, JSON.stringify(data));
    }
    catch (error) {
      console.log(error);
    }

    toggleModal();
    getNotes();

  }

  const getNotes = () => {
    AsyncStorage.getItem('note').then(data => setNotes(data));
  }

  useEffect(() => {
    getNotes();

  }, []);

  const renderNotes = ({ item, index }) => {
    console.log(item.dateCreated)
    return (
      <View>
        <Note text="hello" dateCreated="goodbye" />
      </View>
    )
  };

  const removeNote = () => {
    AsyncStorage.removeItem()
  }

  return (
    <PaperProvider>
      <View style={{ backgroundColor: '#1f454d', flex: 1 }}>
        <View style={{ marginTop: 30 }}>
          <SearchNotesBar value={searchQuery.value} handleChange={searchQuery.handleChange} />
        </View>
        <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Button icon="plus" mode="contained" buttonColor='#5acc83'
            labelStyle={{ fontSize: 20 }} style={{ padding: 5, borderRadius: 30 }}
            onPress={toggleModal} > Add Note</Button>
        </View>

        {
          notes !== undefined ?
            <View style={{ flex: 1 }}>
              <FlatList
                data={notes}
                renderItem={renderNotes}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-evenly' }}
              />
            </View>
            : null
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

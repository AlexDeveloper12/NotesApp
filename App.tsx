/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Button, PaperProvider, useTheme, IconButton } from 'react-native-paper';
import SearchNotesBar from './src/components/SearchNotesBar';
import useInput from './src/hooks/useInput';
import useModal from './src/hooks/useModal';
import AddNoteModal from './src/components/AddNoteModal/AddNoteModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): JSX.Element {

  const searchQuery = useInput('');
  const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
  const addNoteQuery = useInput('');

  const addNoteToStorage = async (data) => {

    let randomNumber = Math.floor((Math.random() * 10000) + 1);

    console.log(data);

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

          {/* <IconButton icon="plus" size={20} mode="contained" iconColor='white' containerColor='#5acc83' /> */}

        </View>
      </View>

      <AddNoteModal
        isVisible={itemModalOpen}
        value={addNoteQuery.value}
        handleNote={addNoteQuery.handleChange}
        toggleModal={toggleModal}
        addNote={addNoteToStorage}
      />


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

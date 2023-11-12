import React from 'react';
import {
  View
} from 'react-native';
import { PaperProvider } from 'react-native-paper';
import NavigationTabs from './navigation/NavigationTabs';

function App(): JSX.Element {
  return (
    <PaperProvider>
      <View style={{ backgroundColor: '#1f454d', flex: 1 }}>
        <NavigationTabs/>
        </View>

    </PaperProvider>
  )
}

export default App;

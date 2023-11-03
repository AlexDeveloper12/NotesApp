import React from "react";
import {FlatList} from 'react-native';

function NotesList({noteData,renderNotes}){
    return(
        <FlatList
                keyExtractor={(item) => item.id}
                data={noteData}
                renderItem={renderNotes}
                contentContainerStyle={{ width: '100%' }}
              />
    )
}

export default NotesList;
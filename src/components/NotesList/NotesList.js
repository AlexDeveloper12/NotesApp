import React from "react";
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';

function NotesList({noteData,renderNotes}){
    return(
        <FlatList
                keyExtractor={(item) => item.id}
                data={noteData}
                renderItem={renderNotes}
                contentContainerStyle={{ width: '100%' }}
                maxToRenderPerBatch={10}
                initialNumToRender={8}
              />
    )
}

export default NotesList;

NotesList.propTypes = {
    noteData:PropTypes.array,
    renderNotes:PropTypes.func
};
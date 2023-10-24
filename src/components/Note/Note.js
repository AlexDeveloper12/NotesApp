import React from 'react';
import { Text } from 'react-native';
import { Card, IconButton } from 'react-native-paper';

function Note({ item, deleteNote, togUpd }) {

    return (
        <Card style={{ marginTop: 20,padding:20, marginLeft:10, marginRight:10 }}>
            <Card.Title title={`ID: ${item.id}`} titleStyle={{fontFamily:'Roboto-Bold', fontSize:18}} />
            <Card.Content>
                <Text variant="bodyMedium" style={{fontFamily:'Roboto-Light', fontSize:15}}>{item.noteText}</Text>
            </Card.Content>
            <Card.Actions>
                {/* <IconButton icon="chevron-up" size={22} animated/> */}
                <IconButton icon="lead-pencil" size={22} animated onPress={()=>togUpd(item.id)} />
                <IconButton icon="trash-can" size={22} animated onPress={()=>deleteNote(item.id)} />
            </Card.Actions>
        </Card>
    )
}

export default Note;
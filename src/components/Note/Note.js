import React from 'react';
import { Text } from 'react-native';
import { Card, IconButton } from 'react-native-paper';

function Note({ item, togDel, togUpd }) {

    return (
        <Card style={{ marginTop: 20,padding:20, marginLeft:10, marginRight:10 }}>
            <Card.Title title={`ID: ${item.id}`} titleStyle={{fontFamily:'Roboto-Bold', fontSize:18}} />
            <Card.Content>
                <Text variant="bodyMedium" style={{fontFamily:'Roboto-Light', fontSize:15}}>{item.noteText}</Text>
            </Card.Content>
            <Card.Actions>
                <IconButton icon="lead-pencil" size={22} animated onPress={()=>togUpd(item)} />
                <IconButton icon="trash-can" size={22} animated onPress={()=>togDel(item.id)} />
            </Card.Actions>
        </Card>
    )
}

export default Note;
import React from 'react';
import { Text } from 'react-native';
import { Card, IconButton } from 'react-native-paper';

function Note({ item, togDel }) {

    return (
        <Card style={{ marginTop: 20,padding:25 }}>
            <Card.Title title={`ID: ${item.id}`} />
            <Card.Content>
                <Text>{item.name}</Text>
                <Text variant="bodyMedium">{item.noteText}</Text>
            </Card.Content>
            <Card.Actions>
                <IconButton icon="lead-pencil" size={22} animated />
                <IconButton icon="trash-can" size={22} animated onPress={()=>togDel(item.id)} />
            </Card.Actions>
        </Card>
    )
}

export default Note;
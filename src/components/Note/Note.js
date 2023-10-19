import React from 'react';
import { Text } from 'react-native';
import { Card, IconButton } from 'react-native-paper';

function Note({ item }) {

    return (
        <Card style={{ marginTop: 20, width: '100%' }}>
            <Card.Title title={`ID: ${item.ID}`} />
            <Card.Content>
                <Text>{item.name}</Text>
                <Text variant="bodyMedium">{item.name}</Text>
            </Card.Content>
            <Card.Actions>
                <IconButton icon="lead-pencil" size={20} animated />
                <IconButton icon="trash-can" size={20} animated />
            </Card.Actions>
        </Card>
    )
}

export default Note;
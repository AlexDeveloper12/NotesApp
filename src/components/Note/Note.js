import React from 'react';
import { Text } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import styles from '../../styles/NoteStyles/NoteStyles';

function Note({ item, togDel, togUpd }) {

    return (
        <Card style={styles.container}>
            <Card.Title title={`ID: ${item.id}`} titleStyle={{fontFamily:'Roboto-Bold', fontSize:18}} />
            <Card.Content>
                <Text variant="bodyMedium" style={styles.text}>{item.noteText}</Text>
            </Card.Content>
            <Card.Actions>
                <IconButton icon="lead-pencil" size={22} animated onPress={()=>togUpd(item)} />
                <IconButton icon="trash-can" size={22} animated onPress={()=>togDel(item.id)} />
            </Card.Actions>
        </Card>
    )
}

export default Note;
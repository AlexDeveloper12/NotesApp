import React from 'react';
import { Text } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';
import styles from '../../styles/NoteStyles/NoteStyles';

function Note({ item, togDel, togUpd, togFav }) {

    return (
        <Card style={styles.container}>
            <Card.Title title={`ID: ${item.id}`} titleStyle={styles.noteTitle} />
            <Card.Content>
                <Text>{item.dateCreated != null ? `Date created: ${item.dateCreated }` : 'No date available'}</Text>
                <Text variant="bodyMedium" style={styles.text}>{item.noteText}</Text>
            </Card.Content>
            <Card.Actions>
                <IconButton icon="star" iconColor={item.isFavourite ? 'gold' : 'grey'} size={24} onPress={()=>togFav(item.id)} />
                <IconButton icon="lead-pencil" size={22} animated onPress={()=>togUpd(item)} />
                <IconButton icon="trash-can" size={22} animated onPress={()=>togDel(item.id)} />
            </Card.Actions>
        </Card>
    )
}

export default Note;

Note.propTypes = {
    item:PropTypes.object,
    togDel:PropTypes.func,
    togUpd:PropTypes.func,
    togFav:PropTypes.func
}
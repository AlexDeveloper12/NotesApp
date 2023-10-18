import React from 'react';
import { Button, Card } from 'react-native-paper';

function Note(){
    return(
        <Card>
            <Card.Title title="Test title" />
            <Card.Content>
                <Text>Card title</Text>
                <Text variant="bodyMedium">Card content</Text>
            </Card.Content>
            <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
            </Card.Actions>
        </Card>
    )

}

export default Note;
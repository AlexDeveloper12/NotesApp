import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, View } from 'react-native';
import { Card, Text } from "react-native-paper";
import GetFavourites from "../../Helpers/GetFavourites";
import commonStyles from "../../styles/CommonStyles/CommonStyles";

function Favourites() {

    const [favourites, setFavourites] = useState([]);

    const getFavouriteNotes = async () => {
        const getNotes = await AsyncStorage.getItem('note');

        let parsed = JSON.parse(getNotes);

        const favouriteNotes = GetFavourites(parsed);

        setFavourites(favouriteNotes)
    }

    const renderFavourites = ({item,index}) => {
        return(
            <Card disabled >
                <Card.Title title={`ID: ${item.id}`} />
                <Card.Content>
                    <Text variant="bodyMedium">{item.noteText}</Text>
                </Card.Content>
                
            </Card>
        )
    }

    useEffect(() => {
        getFavouriteNotes();
    }, []);

    return (
        <View style={commonStyles.commonContainer}>

            {favourites === null || favourites === undefined || favourites.length === 0 ?
                <View style={commonStyles.centerElement}>
                    <Text variant="headlineSmall" style={commonStyles.noDataExistsText}>There are currently no favourite notes</Text>
                </View>
                :

                <FlatList
                    data={favourites}
                    renderItem={renderFavourites}
                />
            }

        </View>
    )
}

export default Favourites;
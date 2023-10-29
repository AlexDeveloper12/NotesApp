import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, View } from 'react-native';
import { Text } from "react-native-paper";
import commonStyles from "../../styles/CommonStyles/CommonStyles";

function Favourites() {

    const [favourites, setFavourites] = useState([]);

    const getFavourites = async () => {
        const getNotes = await AsyncStorage.getItem('note');

        let parsed = JSON.parse(getNotes);

        const filterFavourites = parsed.filter((e) => {
            return e.isFavourite === true
        });

        setFavourites(filterFavourites)

    }

    useEffect(() => {
        getFavourites();
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
                />
            }

        </View>
    )
}

export default Favourites;

const GetFavourites = (notesArray = []) => {

    const getFavouriteNotes = notesArray.filter(a=> a.isFavourite==='True');

    return getFavouriteNotes;

}

export default GetFavourites;

const GetFavourites = (notesArray = []) => {

    const newArray = [...notesArray].filter(a=> a.isFavourite==='True');

    return newArray;

}

export default GetFavourites;
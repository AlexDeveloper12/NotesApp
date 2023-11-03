
const GetLargestID = (noteArray = []) => {

    const id = Math.max(...noteArray.map(o=>o.id),1);

    return id;
}

export default GetLargestID;
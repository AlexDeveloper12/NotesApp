import { useState } from "react";

const useArray = (initialValue = []) => {
    const [value,setValue] = useState(initialValue);

    return {value,setValue};
}

export default useArray;
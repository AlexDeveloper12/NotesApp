import React, { useState } from "react";

const useInput = (initialValue) => {
    const [value,setValue] = useState(initialValue);

    const handleChange = (value) => {
        setValue(value);
    }

    return {
        value,
        handleChange
    }


}

export default useInput;
import React, { useState } from 'react';

export const FormContext = React.createContext();

const FormState = ({ children }) => {
    const [ data, setData ] = useState('');
    const [ open, setOpen ] = useState(false);

    return (
        <FormContext.Provider
            value={{
                data,
                open,
                setData,
                setOpen
            }}
        >
            {children}
        </FormContext.Provider>
    )
}

export default FormState;
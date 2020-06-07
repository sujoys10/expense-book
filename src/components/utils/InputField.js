import React, { useState } from 'react';

const InputField = ({title, defaultExpense, _inputChange}) => {
    const [ value, setValue ] = useState(defaultExpense);
    
    const handleInputChange = (e) => {
        setValue(e.target.value);
        _inputChange(title, parseInt(e.target.value));
    }
    return (
        <div className="inputField">
            <label htmlFor="title">{title}</label>
            <input 
                type="number"
                name={title}
                value={value}
                onChange={handleInputChange}
            />
        </div>
    )
}

export default InputField;
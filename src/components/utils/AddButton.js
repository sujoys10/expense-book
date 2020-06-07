import React from 'react';

const AddButton = ({ openForm }) => {
    return(
        <button className="addBtn" onClick={openForm}>
            +
        </button>
    )
}

export default AddButton;
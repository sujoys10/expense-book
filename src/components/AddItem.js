import React, { useState } from 'react';
import BottomContainer from './utils/BottomContainer';
import TemplateForm from './TemplateForm';
import AddButton from './utils/AddButton';

const AddItem = () => {
    const [ open, setOpen ] = useState(false);

    const _openForm = () => {
        setOpen(!open);
    }

    return (
        <div>
            <AddButton openForm={_openForm} />
            { open && (
                 <BottomContainer close={setOpen}>
                    <TemplateForm />
                </BottomContainer>
            )}
        </div>
    )
    
    }

export default AddItem;
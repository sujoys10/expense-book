import React, { useContext } from 'react';
import { TemplateContext } from '../context/TemplateContext';
import { FormContext } from '../context/FormContext';
import remove from '../Icons/delete.svg';

const TemplateItem = ({ item: { id, title, catagory, defaultExpense }}) => {
    const { removeItem } = useContext(TemplateContext);
    const { setOpen, setData } = useContext(FormContext);

    const handleEdit = () => {
        setData({ id, title, catagory, defaultExpense });
        setOpen(true);
    }

    const handleRemove = () => {
        removeItem(id);
        setOpen(false);
    }

    return (
        <div className="templateItem">
            <div>
                <img 
                    src={process.env.PUBLIC_URL + '/icons/'+ catagory+'.svg'}
                    alt={catagory}
                />
                <p>Name:  {title}</p>
            </div>
            <p>Expense:  {defaultExpense}</p>
            {/* <div className="templateItem__box">
                <img 
                    src={process.env.PUBLIC_URL + '/icons/'+ catagory+'.svg'}
                    alt={catagory}
                />
                <p>Name:  {title}</p>
            </div>
            <p>Default Expense:  {defaultExpense}</p> */}
            <button
                className="templateItem__editbtn"
                onClick={handleEdit}>edit</button>
            <button
                className="templateItem__removebtn" 
                onClick={handleRemove}
            >
                <img src={remove} alt="remove"/>
            </button>
        </div>
    )
}

export default TemplateItem;


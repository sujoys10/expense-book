import React, { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { FormContext } from '../context/FormContext';

const ExpenseItem = ({ item: { id, name, catagory, expense }}) => {
    const { removeExpense } = useContext(ExpenseContext);
    const { setOpen, setData } = useContext(FormContext);

    const handleClick = () => {
        setData({ id, name, catagory, expense });
        setOpen(true);
    }

    const handleRemove = () => {
        removeExpense(id);
        setOpen(false);
    }
    return (
        <div className="expenseItem" onClick={handleClick}>
            <div className="expenseItem__box">
                <img 
                    src={process.env.PUBLIC_URL + '/icons/'+ catagory+'.svg'}
                    alt={catagory}
                />
                <p className="expenseItem__title">{name}</p> 
            </div>
            <p className="expenseItem__amount">{expense}</p>

 {/*            <button
                className="expenseItem__editBtn"
                onClick={handleClick}>edit</button> */}
            <button
                className="expenseItem__removeBtn" 
                onClick={handleRemove}
            >remove</button>

        </div>
    )
}

export default ExpenseItem;
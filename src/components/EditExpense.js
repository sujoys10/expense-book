import React, { useEffect, useState, useContext } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import { ExpenseContext } from '../context/ExpenseContext';

const EditExpense = ({id, close}) => {
    const { state } = useContext(ExpenseContext);
    const [ expense, setExpense ] = useState('');

    useEffect(() => {
        const currentExpense = state.find(exp => exp.id === id);
        setExpense(currentExpense);
    },[])

    return (
        <div className="editExpense">
            <div>
                { expense && <ExpenseForm item={expense} closeForm={close} />}
            </div>
        </div>
    )
}

export default EditExpense;
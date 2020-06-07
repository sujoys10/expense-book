import React, { useState, useContext, useEffect } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { catagories } from '../utils/catagories';
import { FormContext } from '../context/FormContext';
import Loader from './utils/Loader';

const ExpenseForm = () => {
    const { addExpense, editExpense, removeExpense, loading } = useContext(ExpenseContext);
    const { data, setData, setOpen } = useContext(FormContext);
    const [ name, setName ] = useState('');
    const [ catagory, setCatagory ] = useState('');
    const [ type, setType ] = useState('debit');
    const [ expense, setExpense ] = useState('');

    useEffect(() => {
        setName((data && data.name) || '');
        setCatagory((data && data.catagory) || '');
        setType((data && data.type) || 'debit');
        setExpense((data && data.expense) || '');
    }, [data])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(data){
            editExpense(data.id, {
                name,
                catagory,
                type,
                expense: !!expense ? parseInt(expense) : 0
            })
            setData('');
        }else{
            addExpense({
                name,
                catagory,
                type,
                expense: !!expense ? parseInt(expense) : 0
            });
        }

        setOpen(false);
        setName('');
        setCatagory('');
        setType('debit');
        setExpense('');
    }

    const handleRemove = () => {
        removeExpense(data.id);
        setOpen(false);
    }

    if(loading){
        return <Loader />
    }else {
        return (
            <form className="form" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="name"
                    placeholder="name"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
    
                <select value={catagory} required onChange={e => setCatagory(e.target.value)}>
                    <option value="" >catagory</option>
                    { catagories.map(catagory => (
                        <option key={catagory} value={catagory}>
                            {catagory}
                        </option>
                    ))}
                </select>
                <div className="form__radio">
                    <label htmlFor="debit">Debit</label>
                    <input 
                        name="debit"
                        type="radio"
                        checked={type === 'debit'}
                        onChange={() => setType('debit')}
                    />
                    <label htmlFor="credit">Credit</label>
                    <input 
                        name="credit"
                        type="radio"
                        checked={type === 'credit'}
                        onChange={() => setType('credit')}
                    />
                </div>
    
                <input 
                    type="number"
                    name="expense"
                    placeholder="amount"
                    required
                    min="1"
                    max="9999999"
                    value={expense}
                    onChange={e => setExpense(e.target.value)}
                />
                <div className="form__btnBox">
                    { data && (
                        <button onClick={handleRemove}>
                            remove
                        </button>
                    )}
                    <button type="submit" className={ !data ? 'full-width' : ''}>
                        {data ? 'save' : 'add'}
                    </button>
                </div>
            </form>
        )
    }
    
}

export default ExpenseForm;


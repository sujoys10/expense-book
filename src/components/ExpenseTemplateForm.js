import React, { useContext, useState, useEffect } from 'react';
import { TemplateContext } from '../context/TemplateContext';
import { Link } from 'react-router-dom';
import { ExpenseContext } from '../context/ExpenseContext';
import Loader from './utils/Loader';
import InputField from './utils/InputField';

const ExpenseTemplateForm = () => {
    const { state, loading } = useContext(TemplateContext);
    const { addExpensesOfCurrentDay } = useContext(ExpenseContext);
    const [ expenses, setExpenses ] = useState([]);

    useEffect(() => {
        if(state.length !== 0){
            state.map(item => {
                const expense = {
                    name: item.title,
                    expense: item.defaultExpense,
                    catagory: item.catagory,
                    type: item.type
                }
                return setExpenses(prev => ([...prev, expense]))
            })
        }
    },[state])

    const onInputChange = (name, value) => {
        const updatedExpenses = expenses.map(exp => {
            if(exp.name === name){
                return {
                    ...exp,
                    expense: value
                }
            }
            return exp;
        })
        setExpenses(updatedExpenses); 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addExpensesOfCurrentDay(expenses);
    }

    if(loading){
        return <Loader />
    }
    return (
        state.length === 0 ? (
            <div className="addTemplate-link">
                <Link to="/template">Add Template for the month</Link>
            </div>
        ) : (
            <form className="expenseTemplateForm" onSubmit={handleSubmit}>
                { state.map(item => (
                    <InputField 
                        key={item.id}
                        title={item.title}
                        defaultExpense={item.defaultExpense}
                        _inputChange={onInputChange}
                    />
                ))}
                <button className="expenseTemplateForm__saveBtn" type="submit">save</button>
            </form>
        )
    )   
}


export default ExpenseTemplateForm;
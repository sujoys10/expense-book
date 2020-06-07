import React, { useState, useReducer, useContext, useEffect, useCallback } from 'react';
import database from '../firebase/firebase';
import moment from 'moment';
import expenseReducer from './reducer/expenseReducer';
import { AuthContext } from './AuthContext';
import { TemplateContext } from './TemplateContext';

export const ExpenseContext = React.createContext();

const ExpenseState = ({ children }) => {
    const { user } = useContext(AuthContext);
    const { month: currentMonth, setMonth } = useContext(TemplateContext);
    const initialState = [];
    const [ state, dispatch ] = useReducer(expenseReducer, initialState);
    const [ date, setDate ] = useState(moment().format());
    const [ loading, setLoading ] = useState(false);

    const getDayMonth = (date) => {
        const month = moment(date).format('MMMM');
        const day = moment(date).format('D');
        return { month, day }
    }

    const updateDate = (d) => {
        setDate(moment(d).format());
        const selectedMonth = moment(d).format('MMMM');
        if(selectedMonth !== currentMonth){
            setMonth(selectedMonth);
        }
    }

    const getExpenseOfTheDay =  useCallback(async (date) => {
        const { month, day } = getDayMonth(date);
        setLoading(true);
        try {
           const snapshot = await database.ref(`users/${user.uid}/expenses/${month}/${day}`).once('value');
           const expenses = [];
           snapshot.forEach(item => {
            expenses.push({
                id: item.key,
                ...item.val()
            })
            })
            setLoading(false);
            dispatch({
                type: 'SET_EXPENSE',
                payload: expenses
            })
        } catch (error) {
            console.log(error);
        }
    },[user.uid])
    
    const addExpensesOfCurrentDay =  ( expenses) => {
        const { month, day } = getDayMonth(date);
        setLoading(true);
        const ref = database.ref(`users/${user.uid}/expenses/${month}/${day}`);
        expenses.map(async exp => {
            try {
                const newExpenseRef = ref.push();
                await newExpenseRef.set(exp);
                setLoading(false);
                dispatch({
                    type: 'ADD_EXPENSE',
                    payload: { id: newExpenseRef.key, ...exp }
                })
            } catch (error) {
                console.log(error)
            }
        })  
    }

    const addExpense = async (expense) => {
        const { month, day } = getDayMonth(date);
        //setLoading(true);
        try {
            const newExpense = await database
                .ref(`users/${user.uid}/expenses/${month}/${day}`)
                .push(expense);
            //setLoading(false);
            dispatch({
                type: 'ADD_EXPENSE',
                payload: { id: newExpense.key, ...expense }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const editExpense = async (id, expense) => {
        const { month, day } = getDayMonth(date);
        //setLoading(true);
        try {
            await database
                .ref(`users/${user.uid}/expenses/${month}/${day}/${id}`)
                .update(expense);
            //setLoading(false);    
            dispatch({
                type: 'EDIT_EXPENSE',
                payload: { id, expense } 
            })
        } catch (error) {
            console.log(error)
        }
    }

    const removeExpense = async (id) => {
        const { month, day } = getDayMonth(date);
        setLoading(true);
        try {
            await database
                .ref(`users/${user.uid}/expenses/${month}/${day}/${id}`)
                .remove();
            setLoading(false);
            dispatch({
                type: 'REMOVE_EXPENSE',
                payload: { id }
            })    
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getExpenseOfTheDay(date);
    },[date, getExpenseOfTheDay]);

    return(
        <ExpenseContext.Provider
            value={{
                state,
                date,
                loading,
                updateDate,
                getExpenseOfTheDay,
                addExpensesOfCurrentDay,
                addExpense,
                editExpense,
                removeExpense
            }}
        >
            {children}
        </ExpenseContext.Provider>
    )
}

export default ExpenseState;
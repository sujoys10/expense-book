import React, { useCallback, useContext } from 'react';
import { useState, useEffect } from 'react';
import database from '../firebase/firebase';
import MonthChart from './MonthChart';
import Loader from './utils/Loader';
import Message from './utils/Message';
import { AuthContext } from '../context/AuthContext';

const Charts = ({ month }) => {
    const { user } = useContext(AuthContext)
    const [ expense, setExpense ] = useState([]);
    const [loading, setLoading ] = useState(false);

    const fetchMonthlyExpenses = useCallback(async () => {
        try {
            setLoading(true);
            const expenses = [];
            const snapshot = await database.ref(`users/${user.uid}/expenses/${month}`).once('value');
            snapshot && snapshot.forEach(snap => {
                const dayExpenses = Object.values(snap.val());
                dayExpenses.map(exp => expenses.push(exp))
            });
            setLoading(false)
            setExpense(expenses);
        } catch (error) {
            console.log(error)
        }
    },[month, user.uid])

    useEffect(() => {
        fetchMonthlyExpenses();
    },[month, fetchMonthlyExpenses])

    if(loading){
        return <Loader />
    }
    return (
        <div>
            { expense.length === 0 ?
                <Message text="no expense added for this month" /> :
                <MonthChart expenses={expense}/>
            }
        </div>
    )
    
}

export default Charts;

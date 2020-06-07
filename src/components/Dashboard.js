import React, { useContext, useState, useEffect, useCallback } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

const Dashboard = () => {
    const { state } = useContext(ExpenseContext);
    const [ credit, setCredit ] = useState(0);
    const [ debit, setDebit ] = useState(0);

    const getDailyExpense = useCallback( state => {
        let income = 0, expense = 0;
        if(state.length !== 0){
            state.forEach(e => {
                if(e.type === 'credit'){
                    income += e.expense;
                }else{
                    expense += e.expense;
                }
            })
        }
        setDebit(expense);
        setCredit(income);
    },[])

    useEffect(() => {
        getDailyExpense(state);  
    },[state, getDailyExpense])

    return (
        <div className="dashboard">
            <div className="dashboard__item">
                <p>Income</p>
                <p> {credit}</p>
            </div>
            <div className="dashboard__item">
                <p>Expenses</p>
                <p>{debit}</p>
            </div>
            <div className="dashboard__item">
                <p>Balance</p>
                <p> {credit - debit}</p>
            </div>
        </div>
    )
}

export default Dashboard;
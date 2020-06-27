import React, { useEffect, useState, useCallback } from 'react';
import { Doughnut } from 'react-chartjs-2';
import CatagoricalExpenseList from './CatagoricalExpenseList';
import { colors } from '../utils/colors';

const MonthChart = ({expenses}) => {
    
    const [ state, setState ] = useState('');
    const [ chartData, setChartData ] = useState({});


    const getCatagoricalExpense = useCallback((expenses) => {
        const obj = {};
        expenses.forEach(exp => {
            if(exp.type === 'debit'){
                if(!obj[exp.catagory]){
                    obj[exp.catagory] = exp.expense;
                }else{
                    obj[exp.catagory] += exp.expense;
                }
            }
        })
        setState(obj);
        const labels = Object.keys(obj);
        const values = Object.values(obj);
        const backgroundColor = colors.slice(0, labels.length);
       
        const data = {
            labels,
            datasets: [{
                data: values,
                backgroundColor
            }]
        }
        setChartData(data);    
    }, [])

    useEffect(() => {
        if(expenses.length !== 0){
            getCatagoricalExpense(expenses);
        }

        return () => {
            setState('');
            setChartData({});
        }
    },[expenses, getCatagoricalExpense])


    return(
        <div>
            <Doughnut 
                data={chartData}
                legend={{
                    display: false
                }}
            />
            <CatagoricalExpenseList expenses={state} />
        </div>
    )
}

export default MonthChart;
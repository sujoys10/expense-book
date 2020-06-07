import React from 'react';
import { colors } from '../utils/colors';

const CatagoricalExpenseList = ({expenses}) => {
    return (
        <div className="catagoryList">
            <p className="catagoryList__header">Expense List</p>
            { Object.keys(expenses).map((catagory,i) => (
                    <div 
                        key={catagory}
                        className="catagoryList__item"
                        style={{ backgroundColor: colors[i]}}
                    >   
                        <div className="catagoryList__item--box">
                            <img src={process.env.PUBLIC_URL + '/icons/' + catagory + '.svg'} alt={catagory} />
                            <p>{catagory}</p>
                        </div>
                        <p>{expenses[catagory]}</p>
                    </div>
                ))}
        </div>
    )
}

export default CatagoricalExpenseList;
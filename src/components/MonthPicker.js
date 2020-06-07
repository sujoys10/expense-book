import React from 'react';
import { months } from '../utils/months';

const MonthPicker = ({ month, onMonthChange }) => {

    const handleMonthChange = (e) => {
        onMonthChange(e.target.value);
    }

    return (
        <select 
            className="monthPicker"
            value={month}
            onChange={handleMonthChange}
        >
            { months.map(mon => (
                <option key={mon} value={mon}>
                    {mon.substr(0,3)}
                </option>
            ))}
        </select>
    )
}

export default MonthPicker;

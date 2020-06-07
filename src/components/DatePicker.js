import React, { useState, useContext } from 'react';
import Calendar from 'react-calendar';
import { ExpenseContext } from '../context/ExpenseContext';
import dateRange from '../Icons/calendar.svg'

const DatePicker = () => {
    const { updateDate } = useContext(ExpenseContext);
    const [ open, setOpen ] = useState(false);
    const [ date, setDate ] = useState(new Date());


    const handleDateChange = (date) => {
        setDate(date);
        updateDate(date);
        setOpen(false);
    }
    return (
        <div className="datePicker">
            <div className="datePicker__icon" onClick={() => setOpen(!open)}>
                <img src={dateRange} alt="DATE" />
            </div>
            <div className="datePicker__calendar">
                { open && 
                    <Calendar 
                        value={date}
                        onChange={handleDateChange}
                    />            
                }
            </div>
            
        </div>
    )
}

export default DatePicker;
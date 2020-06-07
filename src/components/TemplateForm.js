import React, { useState, useContext, useEffect } from 'react';
import { TemplateContext } from '../context/TemplateContext';
import { FormContext } from '../context/FormContext';
import { catagories } from '../utils/catagories';

const TemplateForm = () => {
    const { addItem, editItem } = useContext(TemplateContext);
    const { data, setData, setOpen } = useContext(FormContext);
    const [ title, setTitle ] = useState('');
    const [ catagory, setCatagory ] = useState('');
    const [ type, setType ] = useState('debit');
    const [ defaultExpense, setDefaultExpense ] = useState('');

    useEffect(() => {
        setTitle((data && data.title) || '');
        setCatagory((data && data.catagory) || '');
        setType((data && data.type) || 'debit');
        setDefaultExpense((data && data.defaultExpense) || '');
    }, [data])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(data){
            editItem(data.id, {
                title,
                catagory,
                type,
                defaultExpense: !!defaultExpense ? parseInt(defaultExpense) : 0
            })
            setData('');
        }else{
            addItem({
                title,
                catagory,
                type,
                defaultExpense: !!defaultExpense ? parseInt(defaultExpense) : 0
            })
        }
        setOpen(false);
        setTitle('');
        setCatagory('');
        setType('debit');
        setDefaultExpense('');
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input 
                type="text"
                name="title"
                required
                placeholder="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />

            <select 
                value={catagory}
                placeholder="catagory"
                required
                onChange={e => setCatagory(e.target.value)}
            >
                <option value="">catagory</option>
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

            {/* <label htmlFor="defaultValue">Default Expense</label> */}
            <input 
                type="number"
                name="defaultValue"
                placeholder="expense"
                required
                min="1"
                max="9999999"
                value={defaultExpense}
                onChange={e => setDefaultExpense(e.target.value)}
            />
            <button type="submit">
                { data ? 'save' : 'add' }
            </button>
        </form>
    )
}

export default TemplateForm;
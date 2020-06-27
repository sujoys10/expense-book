import React, { useReducer, useEffect, useState, useContext, useCallback } from 'react';
import database from '../firebase/firebase';
import moment from 'moment';
import templateReducer  from './reducer/templateReducer';
import { AuthContext } from './AuthContext';

export const TemplateContext = React.createContext();

const TemplateState = ({children}) => {
    const { user } = useContext(AuthContext);
    const initialTemplateState = [];
    const [ state, dispatch ] = useReducer(templateReducer, initialTemplateState);
    const [ loading, setLoading ] = useState(false);
    const [ isFailed, setFailed ] = useState(false);
    const [ month, setMonth ] = useState(moment().format('MMMM'));
    
    
    const getTemplate = useCallback(async (month) => {
        setLoading(true);
        try {
            const snapshot = await 
                database.ref(`users/${user.uid}/templates/${month}`).once('value');
            const items = [];
            snapshot.forEach(item => {
                    items.push({
                        id: item.key,
                        ...item.val()
                    })  
                })
            setLoading(false);
            dispatch({
                type: 'SET_TEMPLATE',
                payload: items
            })
        } catch (error) {
            setFailed(true);
            console.log(error);
        }
    },[user.uid])

    const addItem = (item) => {
        console.log('add');
        database.ref(`users/${user.uid}/templates/${month}`)
            .push(item)
            .then(ref => {
                dispatch({
                    type: 'ADD_ITEM',
                    payload: { 
                        item: { id: ref.key, ...item }
                    }
                })
            })
    }

    const editItem = async (id, item) => {
        try {
            await database
                .ref(`users/${user.uid}/templates/${month}/${id}`)
                .update(item);
            dispatch({
                type: 'EDIT_ITEM',
                payload: { id, item } 
            })
        } catch (error) {
            setFailed(true);
            console.log(error)
        }
    }

    const removeItem = async (id) => {
        try {
            await database
                .ref(`users/${user.uid}/templates/${month}/${id}`)
                .remove();
            dispatch({
                type: 'REMOVE_ITEM',
                payload: { id } 
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTemplate(month);
    },[month, getTemplate]);

    return(
        <TemplateContext.Provider
            value={{
                state,
                loading,
                isFailed,
                month,
                setMonth,
                setLoading,
                getTemplate,
                addItem,
                editItem,
                removeItem
            }}
        >
            {children}
        </TemplateContext.Provider>
    )
}

export default TemplateState;
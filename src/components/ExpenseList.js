import React, { useContext, Fragment, lazy, Suspense } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import Loader from './utils/Loader';
const Message = lazy(() => import('./utils/Message'));
const ExpenseListItem = lazy(() => import('./ExpenseListItem'));

const ExpenseList = () => {
    const { state, loading } = useContext(ExpenseContext);
    
    if(loading){
        return <Loader />
    }else {
        return (
            <Suspense fallback={<div>loading...</div>}>
                <div className="expenseList">
                    { state.length !== 0 ? (
                        <Fragment>
                            { state.map(item => (
                                <ExpenseListItem 
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                        </Fragment>
                    ): <Message text={"no expense added yet"}/>
                    }
                    
                </div>
            </Suspense>
        )
    }
}

export default ExpenseList;
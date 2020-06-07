import React, { Suspense, lazy, useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import BottomContainer from '../components/utils/BottomContainer';
import  { FormContext } from '../context/FormContext';
import ErrorBoundary from '../components/ErrorBoundary';
import Layout from '../components/Layout';
import ExpenseForm from '../components/ExpenseForm';
import LayoutSpinner from '../components/utils/LayoutSpinner';
const ExpenseTemplateForm = lazy(() => import('../components/ExpenseTemplateForm'));
const Dashboard = lazy(() => import('../components/Dashboard'));
const ExpenseList = lazy(() => import('../components/ExpenseList'));
const AddButton = lazy(() => import('../components/utils/AddButton'));
const DatePicker = lazy(() => import('../components/DatePicker'));

const Expense = () => {
    const { state } = useContext(ExpenseContext);
    const { open, setOpen } = useContext(FormContext);

    const _openForm = () => {
        setOpen(true);
    }

    
    return (
        <Suspense fallback={<LayoutSpinner />}>
            <ErrorBoundary>
                <Layout>
                    <div className="expense">
                        
                        <div className="header">
                            <p>expense</p>
                            <div className="header__monthPicker">
                                <DatePicker />
                            </div>
                        </div>
                        <Dashboard />
                        { state.length === 0 ? 
                            <ExpenseTemplateForm />
                            : (
                                <div>
                                    <ExpenseList />
                                    <AddButton openForm={_openForm}/>
                                </div>
                            )
                        }
                        { open && (
                            <BottomContainer>
                                <ExpenseForm />
                            </BottomContainer>
                        )}
                    </div>
                </Layout>
            </ErrorBoundary>
        </Suspense>
    )
}

export default Expense;
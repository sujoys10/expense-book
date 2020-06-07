import React, { Suspense, lazy, useContext } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import { TemplateContext } from '../context/TemplateContext';
import { FormContext } from '../context/FormContext';
import Layout from '../components/Layout';
import TemplateForm from '../components/TemplateForm';
import BottomContainer from '../components/utils/BottomContainer';
import LayoutSpinner from '../components/utils/LayoutSpinner';
const MonthPicker = lazy(() => import('../components/MonthPicker'));
const TemplateItemList = lazy(() => import('../components/TemplateItemList'));
const AddButton = lazy(() => import('../components/utils/AddButton'));

const Template = () => {
    const { month , setMonth } = useContext(TemplateContext);
    const { open, setOpen } = useContext(FormContext);

    const _openForm = () => {
        setOpen(true);
    }

    const _onMonthChange = (mon) => {
        setMonth(mon);
    }

    return (
        <Suspense fallback={<LayoutSpinner />}>
            <ErrorBoundary>
                <Layout>
                    <div className="template">
                        <div className="header">
                            <p>template</p>
                            <div className="header__monthPicker">
                                <MonthPicker month={month} onMonthChange={_onMonthChange} />
                            </div>
                        </div>
                        <TemplateItemList />
                        <AddButton openForm={_openForm}/>
                    </div>
                    { open && (
                        <BottomContainer>
                            <TemplateForm />
                        </BottomContainer>
                    )}
                </Layout>
            </ErrorBoundary>
        </Suspense>
    )
}

export default Template;
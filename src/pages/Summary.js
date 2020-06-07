import React, { Suspense, lazy, useState } from 'react';
import moment from 'moment';
import ErrorBoundary from '../components/ErrorBoundary';
import Layout from '../components/Layout';
import LayoutSpinner from '../components/utils/LayoutSpinner';
const Charts = lazy(() => import('../components/Charts'));
const MonthPicker = lazy(() => import('../components/MonthPicker'));

const Summary = () => {
    const [ month, setMonth ] =  useState(moment().format('MMMM'));

    return (
        <Suspense fallback={<LayoutSpinner />}>
            <ErrorBoundary>
                <Layout>
                    <div className="summary">
                    <div className="header">
                            <p>summary</p>
                            <div className="header__monthPicker">
                                <MonthPicker month={month} onMonthChange={setMonth} />
                            </div>
                        </div>
                        <Charts month={month} />
                    </div>
                </Layout>
            </ErrorBoundary>
        </Suspense>
    )
}

export default Summary;
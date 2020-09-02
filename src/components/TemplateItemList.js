import React, { useContext, Fragment, lazy, Suspense } from 'react';
import { TemplateContext } from '../context/TemplateContext';
import Loader from './utils/Loader';
const Message = lazy(() => import('./utils/Message'));
const TemplateItem = lazy(() => import('./TemplateItem'));

const TemplateItemList = () => {
    const { state, loading } = useContext(TemplateContext);
    if(loading){
        return <Loader />
    }else {
        return (
            <Suspense fallback={<div>loading...</div>}>
                <div className="templateItemList">
                    { state.length !== 0 ? (
                        <Fragment>
                            { state.map(item => (
                                <TemplateItem 
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                        </Fragment>
                    ): <Message text={"no item added yet"}/>
                    }
                </div>
            </Suspense>
        )
    }
}

export default TemplateItemList;

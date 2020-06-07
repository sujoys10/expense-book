import React, { Suspense, lazy } from 'react';
import { Switch } from "react-router-dom";
import LayoutSpinner from './components/utils/LayoutSpinner';
import PublicRoute from './router/PublicRoute';
import PrivateRoute from './router/PrivateRoute';
const Home = lazy(() => import('./pages/Home'));
const Template = lazy(() => import('./pages/Template'));
const Expense = lazy(() => import('./pages/Expense'));
const Summary = lazy(() => import('./pages/Summary')); 
 

function App() {
  return (
    <Suspense fallback={<LayoutSpinner />}>
      <div className="App">
        <Switch>
          <PublicRoute exact={true} path='/' component={Home} />
          <PrivateRoute path='/template' component={Template}/>
          <PrivateRoute path='/expense' component={Expense} />
          <PrivateRoute path='/summary' component={Summary} />
        </Switch>
      </div>
    </Suspense>
    
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import GlobalState from './context/GlobalState';


ReactDOM.render(
   <GlobalState>
       <BrowserRouter>
            <App />
       </BrowserRouter>
   </GlobalState>
    , document.getElementById('root')
);


serviceWorker.register();

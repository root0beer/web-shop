import React from 'react';
import { BrowserRouter as Router} from "react-router-dom";//in order to open new pages without page reload you need to use react router dom library
import ReactDOM from 'react-dom/client';

import './index.scss';
import "macro-css";


import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App /> {/**Here you write all your code for*/}
    </Router>
  </React.StrictMode>
);


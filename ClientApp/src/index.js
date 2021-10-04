import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import "bootstrap-icons/font/bootstrap-icons.css";
import Authorization from './Share/Intercreptors/Authorization'
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
Authorization()
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter basename={baseUrl}>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    rootElement);

registerServiceWorker();


import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import store from "./redux/store";


ReactDOM.render((<BrowserRouter>
    <App />
</BrowserRouter>), document.querySelector("#root"))

store.subscribe(() => {
    setTimeout(() => {
        ReactDOM.render((<BrowserRouter>
            <App />
        </BrowserRouter>), document.querySelector("#root"))
    }, 100);
})
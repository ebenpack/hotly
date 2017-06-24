import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';



let Hotly = {
    start: ()=>ReactDOM.render(<App />, document.getElementById('root'))
};

window.Hotly = Hotly;

export default Hotly;
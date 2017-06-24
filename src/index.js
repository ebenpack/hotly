import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './Landing';
import './index.css';



let Hotly = {
    start: ()=>ReactDOM.render(<Landing />, document.getElementById('root'))
};

window.Hotly = Hotly;

export default Hotly;
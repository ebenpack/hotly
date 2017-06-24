import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';


function initMap(){
    ReactDOM.render(<App />, document.getElementById('root'))
}
window.initMap = initMap;

var script = document.createElement('script');
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyA9MYxEG77iL5iaRjeHONPjM_O4sQtXjpc&callback=initMap&places";
document.body.appendChild(script);

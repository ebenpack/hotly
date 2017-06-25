import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';
import './index.css';


function initMap(){
    const map = new window.google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 43.6423978,
            lng: -70.2404187
        },
        zoom: 15
    });
    ReactDOM.render(<App map={map} />, document.getElementById('root'))
}
window.initMap = initMap;

let script = document.createElement('script');
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyA9MYxEG77iL5iaRjeHONPjM_O4sQtXjpc&callback=initMap&libraries=places";
document.body.appendChild(script);

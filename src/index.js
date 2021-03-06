import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';
import './index.css';


function render(){
    const map = new window.google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 43.6423978,
            lng: -70.2404187
        },
        zoom: 15
    });
    ReactDOM.render(<App map={map} />, document.getElementById('root'))
}
window.render = render;

let script = document.createElement('script');
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCiXkYDE-t-9bVP5eNBBcin-MU1UVYzoUY&libraries=places,geometry";
script.onload = render;
document.body.appendChild(script);

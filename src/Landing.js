import React, {Component} from 'react';
//import './App.css';
//import LandingTempData from './LandingTempData'

import AppBar from 'material-ui/AppBar';



class Landing extends Component {
    render(props) {
        //props = LandingTempData;
        return (
            <AppBar
                title="Title"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
        );
    }
}

export default Landing;

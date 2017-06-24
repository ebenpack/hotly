import React, {Component} from 'react';
import './App.css';
import LandingTempData from './LandingTempData'

import AppBar from 'material-ui/AppBar';



class Landing extends Component {
    render(props) {
        props = LandingTempData;
        return (
            <div className="Landing">
                <AppBar
                    title="Title"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <div className="App-header">
                    <h2>Landing</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default Landing;

import React, { Component } from 'react';
import './App.css';
import Landing from './Landing';
import Detail from './Detail';
import Checkin from './CheckIn';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();

const LANDING_PAGE = 'landing';
const DETAIL_PAGE = 'detail';
const CHECKIN_PAGE = 'checkin';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focus: LANDING_PAGE
        };
    }

    render() {
        const { focus } = this.state;
        // const currentPage = (<Landing />);

        return (
            <MuiThemeProvider>
                <Landing />
            </MuiThemeProvider>
        );
    }
}

export default App;

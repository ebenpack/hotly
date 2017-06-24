import React, { Component } from 'react';
import './App.css';
import Landing from './Landing';
import Detail from './Detail';
import Checkin from './CheckIn';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const customTheme = {
    palette: {
        primary1Color: 'red',
        primary2Color: 'blue',
        primary3Color: 'green'
    }
};

const theme = getMuiTheme(customTheme);
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
            <MuiThemeProvider muiTheme={theme}>
                <Landing />
            </MuiThemeProvider>
        );
    }
}

export default App;

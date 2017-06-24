import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Landing from '../landing/Landing';
import Detail from '../detail/Detail';
import CheckIn from '../checkin/CheckIn';
import consts from '../consts';

import './App.css';
import hotlyTheme from './theme';


const theme = getMuiTheme(hotlyTheme);
injectTapEventPlugin();

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focus: consts.pages.LANDING_PAGE
        };

        this.updateFocus = this.updateFocus.bind(this);
    }

    updateFocus(focus) {
        this.setState({focus});
    }

    render() {
        const { focus } = this.state;

        const currentPage = () => {
            switch (focus) {
                case consts.pages.LANDING_PAGE: {
                    return <Landing updateFocus={this.updateFocus} />;
                }
                case consts.pages.DETAIL_PAGE: {
                    return <Detail updateFocus={this.updateFocus} />;
                }
                case consts.pages.CHECKIN_PAGE: {
                    return <CheckIn updateFocus={this.updateFocus} />;
                }
                default:
                    return <h2>PAGE NOT FOUND</h2>;
            }
        };

        return (
            <MuiThemeProvider muiTheme={theme}>
                <div>
                    { currentPage() }
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;

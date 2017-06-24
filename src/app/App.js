import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Landing from '../landing/Landing';
import Detail from '../detail/Detail';
import CheckIn from '../checkin/CheckIn';
import consts from '../consts';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';

import './App.css';
import hotlyTheme from './theme';


const theme = getMuiTheme(hotlyTheme);
injectTapEventPlugin();

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focus: consts.pages.LANDING_PAGE,
            focusParams: {},
            location: {
                lat: 43.6423978,
                lng: -70.2404187
            },
            map: props.map
        };

        this.updateFocus = this.updateFocus.bind(this);
    }

    componentWillMount() {
        const self = this;
        function success(position) {
            self.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        }

        function error() {/* Just use default location, I guess */}
        window.onpopstate = ({focus, focusParams}) =>{
            if (!focus) {
                this.setState({
                    focus: consts.pages.LANDING_PAGE,
                    focusParams: {}
                });
            } else {
                this.setState({
                    focus,
                    focusParams
                });
            }
        }
        window.navigator.geolocation.getCurrentPosition(success, error);
    }

    updateFocus(focus, params={}) {
        window.history.pushState({focus: this.state.focus, focusParams: this.state.focusParams}, focus, `#${focus}`);
        this.setState({
            focus,
            focusParams: params
        });
    }

    render() {
        const { focus, focusParams } = this.state;
        const {map} = this.props;
        const {location} = this.state;
        // Router
        const currentPage = () => {
            switch (focus) {
                case consts.pages.LANDING_PAGE: {
                    return <Landing updateFocus={this.updateFocus} params={focusParams} map={map} location={location} />;
                }
                case consts.pages.DETAIL_PAGE: {
                    return <Detail updateFocus={this.updateFocus} params={focusParams} map={map} location={location} />;
                }
                case consts.pages.CHECKIN_PAGE: {
                    return <CheckIn updateFocus={this.updateFocus} params={focusParams} map={map} location={location} />;
                }
                default:
                    return <h2>PAGE NOT FOUND</h2>;
            }
        };
        const iconElementRight = focus === consts.pages.LANDING_PAGE
            ? null
            : <IconButton>
                    <NavigationChevronLeft onTouchTap={()=>this.updateFocus(consts.pages.LANDING_PAGE)} />
                </IconButton>;
        return (
            <MuiThemeProvider muiTheme={theme}>
                <div>
                    <AppBar
                        // title={focus}
                        iconElementLeft={<img alt="logo" src={require('../img/logo.png')} style={{'maxHeight':'50px'}}/>}
                        iconElementRight={iconElementRight}
                        style={{
                            position: 'fixed'
                        }}
                    />
                    { currentPage() }
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;

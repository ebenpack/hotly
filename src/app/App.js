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
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import PlaceCompletion from '../placeCompletion/PlaceCompletion'

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
            location: null,
            map: props.map,
            locationModalOpen: false,
            locationFieldValue: '',
            locationHints: []
        };

        this.updateFocus = this.updateFocus.bind(this);
    }

    componentWillMount() {
        const self = this;
        function success(position) {
            self.setState({
                location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
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
        };
        window.navigator.geolocation.getCurrentPosition(success, error);
    }

    updateFocus(focus, params={}) {
        window.history.pushState({focus: this.state.focus, focusParams: this.state.focusParams}, focus, `#${focus}`);
        this.setState({
            focus,
            focusParams: params
        });
    }

    toggleLocationModal() {
        this.setState({
            locationModalOpen: !this.state.locationModalOpen,
            locationFieldValue: ''
        });
    }

    selectAutocompletion(location){
        const service = new window.google.maps.places.PlacesService(this.props.map);
        service.getDetails({
            placeId: location.place_id
        }, callback.bind(this));
        this.toggleLocationModal();
        function callback(googlePlace, status){
            this.setState({
                location: {
                    lat: googlePlace.geometry.location.lat(),
                    lng: googlePlace.geometry.location.lng()
                }
            });
        }
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

        const actions = [
            <RaisedButton
                label="Cancel"
                primary={true}
                onTouchTap={this.toggleLocationModal.bind(this)}
            />,
        ];

        const iconElementRight = focus === consts.pages.LANDING_PAGE
            ? <div>
                <RaisedButton
                    label="Change My Location" onTouchTap={this.toggleLocationModal.bind(this)}
                />
            </div>
            : <div>

                <IconButton>
                    <NavigationChevronLeft onTouchTap={() => this.updateFocus(consts.pages.LANDING_PAGE)}/>
                </IconButton>
                <RaisedButton
                    label="Change My Location" onTouchTap={this.toggleLocationModal.bind(this)}
                />
            </div>

        return (
            <MuiThemeProvider muiTheme={theme}>
                <div>
                    <Dialog
                        title="Enter your Location"
                        actions={actions}
                        modal={false}
                        open={this.state.locationModalOpen}
                    >
                        <PlaceCompletion
                            selectAutocompletion={this.selectAutocompletion.bind(this)}
                        />
                    </Dialog>
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

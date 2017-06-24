import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import hotSpots from './LandingTempData'
import consts from '../consts';

import './Landing.css';


class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.handleFocusChange = this.handleFocusChange.bind(this);
    }

    handleFocusChange(focus, params={}) {
        return () => {
            const { updateFocus } = this.props;
            updateFocus(focus, params);
        };
    }

        componentDidMount() {
            const portland = new window.google.maps.LatLng(43.6423978,-70.2404187);

            // const map = new window.google.maps.Map(document.getElementById('map'), {
            //     center: portland,
            //     zoom: 15
            // });
            //
            // const service = new window.google.maps.places.PlacesService(map);
            // service.nearbySearch({
            //     location: portland,
            //     type: 'bar',
            //     rankBy: window.google.maps.places.RankBy.DISTANCE
            // }, callback.bind(this));
            //
            // function callback(results, status) {
            //     let google_results = [];
            //     if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            //         for (let i = 0; i < results.length; i++) {
            //             google_results.push(results[i]);
            //         }
            //         this.setState({results: google_results});
            //     }
            // }
            //
            // this.setState({foo:'bar'});
        }

    render() {
        const listItems = hotSpots.map((hotSpot) => {
            return (
                <ListItem
                    leftIcon=""
                    primaryText={hotSpot.name}
                    secondaryText={`${hotSpot.vicinity} - ${hotSpot.rating}`}
                    onTouchTap={this.handleFocusChange(consts.pages.DETAIL_PAGE, {place_id: hotSpot.place_id})}
                />
            );
        });

        return (
            <div className="Landing">
                <AppBar
                    iconElementRight={<img src={require('../img/logo.png')} style={{'max-height':'50px'}}/>}
                    title="What's Hot?"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <List>
                    { listItems}
                </List>
                <FloatingActionButton secondary={true}
                    style={{float: 'right', marginRight: 20}}
                    onTouchTap={this.handleFocusChange(consts.pages.CHECKIN_PAGE)}
                >
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        )
    }
}

export default Landing;

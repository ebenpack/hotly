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
            hotSpots: []
        };

        this.handleFocusChange = this.handleFocusChange.bind(this);
    }

    handleFocusChange(focus, params={}) {
        return () => {
            const { updateFocus } = this.props;
            updateFocus(focus, params);
        };
    }

    locationSearch(){

    }

        componentDidMount() {

            const {location, map} = this.props;
            const service = new window.google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: location,
                type: 'bar',
                rankBy: window.google.maps.places.RankBy.DISTANCE
            }, callback.bind(this));

            function callback(results, status) {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    this.setState({hotSpots: results});
                } else {
                    // TODO: Do some error shit
                    this.setState({hotSpots: []});
                }
            }

            this.setState({foo:'bar'});
        }

    render() {
        const listItems = this.state.hotSpots.map((hotSpot) => {
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

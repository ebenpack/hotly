import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SwipeableViews from 'react-swipeable-views';

import consts from '../consts';
import { HotnessDisplay } from '../hotness/Hotness';

import './Landing.css';


class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hotSpots: [],
            type: 'bar',
            slideIndex: 0,
            criteria: 'rating'
        };

        this.handleFocusChange = this.handleFocusChange.bind(this);
    }

    handleFocusChange(focus, params={}) {
        return () => {
            const { updateFocus } = this.props;
            updateFocus(focus, params);
        };
    }

    locationSearch(type){
        const {location, map} = this.props;
        const service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: location,
            type: type,
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
    }

    componentDidMount() {
        this.locationSearch(this.state.type)
    }

    handleChange = (value) => {
        let type = '';
        if (value === 0) {
            type = 'bar';
        } else if (value === 1) {
            type = 'night_club';
        } else if (value === 2) {
            type = 'cafe';
        }
        this.setState({
            type: type,
            slideIndex: value
        });
        this.locationSearch(type);
    };

    hotSort(hotSpots) {
        if (this.state.criteria === 'rating') {
            return hotSpots.sort((a, b) => b.rating - a.rating);
        } else {
            return hotSpots;
        }
    }

    render() {
        const sortedHotSpots = this.hotSort(this.state.hotSpots);

        const secondaryText = (hotSpot) => (
            <span>
                {hotSpot.vicinity} - <HotnessDisplay rating={hotSpot.rating}/>
            </span>
        );

        const listItems = sortedHotSpots.map((hotSpot) => {
            return (
                <ListItem
                    key={hotSpot.id}
                    leftIcon={<FontIcon className="fa fa-fire" />}
                    primaryText={hotSpot.name}
                    secondaryText={secondaryText(hotSpot)}
                    onTouchTap={this.handleFocusChange(consts.pages.DETAIL_PAGE, {place_id: hotSpot.place_id})}
                    style= {{
                        position: 'relative',
                            top: '60px'
                    }}
                />
            );
        });

        return (
            <div className="Landing">
                <AppBar
                    iconElementLeft={<img alt="logo" src={require('../img/logo.png')} style={{'maxHeight':'50px'}}/>}
                    style={{
                        position: 'fixed'
                    }}
                />

            <div>
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                    style= {{
                        position: 'relative',
                            top: '60px'
                    }}
                >
                    <Tab label="Bars" value={0} />
                    <Tab label="Night Clubs" value={1} />
                    <Tab label="Cafes" value={2} />
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                >
                    <div style={{overflow: 'hidden'}}>
                        <List>
                            { listItems}
                        </List>
                    </div>
                    <div style={{overflow: 'hidden'}}>
                        <List>
                            { listItems}
                        </List>
                    </div>
                    <div style={{overflow: 'hidden'}}>
                        <List>
                            { listItems}
                        </List>
                    </div>
                </SwipeableViews>
            </div>

            <FloatingActionButton secondary={true}
                style={{
                    position: 'fixed',
                        bottom: 20,
                        right: 20,
                        zIndex: 9999
                }}
                onTouchTap={this.handleFocusChange(consts.pages.CHECKIN_PAGE)}
            >
                <ContentAdd />
            </FloatingActionButton>
        </div>
        )
    }
}

export default Landing;

import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SwipeableViews from 'react-swipeable-views';

import consts from '../consts';

import './Landing.css';


class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hotSpots: [],
            type: 'bar',
            slideIndex: 0
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
        let slideIndex = 0;
        if (value === 'bar') {
            slideIndex = 0;
        } else if (value === 'night_club') {
            slideIndex = 1;
        } else if (value === 'cafe') {
            slideIndex = 2;
        }
        this.setState({
            type: value,
            slideIndex: slideIndex
        });
        this.locationSearch(value);
    };

    render() {
        const listItems = this.state.hotSpots.map((hotSpot) => {
            return (
                <ListItem
                    key={hotSpot.id}
                    primaryText={hotSpot.name}
                    secondaryText={`${hotSpot.vicinity} - ${hotSpot.rating}`}
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
                {/* <Tabs */}
                {/*     value={this.state.value} */}
                {/*     onChange={this.handleChange} */}
                {/*     style= {{ */}
                {/*         position: 'relative', */}
                {/*             top: '60px' */}
                {/*     }} */}
                {/* > */}
                {/*     <Tab label="Bars" value="bar"> */}
                {/*     </Tab> */}
                {/*     <Tab label="Night Clubs" value="night_club"> */}
                {/*     </Tab> */}
                {/*     <Tab label="Coffee Shops" value="cafe"> */}
                {/*     </Tab> */}
                {/* </Tabs> */}

                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                    style= {{
                        position: 'relative',
                            top: '60px'
                    }}
                >
                    <Tab label="Bars" value={'bar'} />
                    <Tab label="Night Clubs" value={'night_club'} />
                    <Tab label="Cafes" value={'cafe'} />
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                >
                    <div>
                        <List>
                            { listItems}
                        </List>
                    </div>
                    <div >
                        <List>
                            { listItems}
                        </List>
                    </div>
                    <div >
                        <List>
                            { listItems}
                        </List>
                    </div>
                </SwipeableViews>

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

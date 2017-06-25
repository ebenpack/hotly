import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SwipeableViews from 'react-swipeable-views';
import LinearProgress from 'material-ui/LinearProgress';
import Divider from 'material-ui/Divider';

import consts from '../consts';
import { HotnessDisplay } from '../hotness/Hotness';

import Disco from './Disco';
import './Landing.css';


class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hotSpots: [],
            type: 'bar',
            slideIndex: 0,
            criteria: 'rating',
            loading: true
        };

        this.handleFocusChange = this.handleFocusChange.bind(this);
    }

    handleFocusChange(focus, params={}) {
        return () => {
            const { updateFocus } = this.props;
            updateFocus(focus, params);
        };
    }

    locationSearch(type, location){
        this.setState({hotSpots: []});
        const {map} = this.props;
        const service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: location,
            type: type,
            rankBy: window.google.maps.places.RankBy.DISTANCE
        }, callback.bind(this));

        function callback(results, status) {
            let hotSpots = [];
            let loading = false;
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                hotSpots = results;
            } else {
                // TODO: Do some error shit
            }
            this.setState({hotSpots, loading});
        }
    }

    componentDidMount() {
        if (this.props.location) {
            this.locationSearch(this.state.type, this.props.location)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location) {
            this.locationSearch(this.state.type, nextProps.location)
        }
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
            slideIndex: value,
            loading: true
        });
        this.locationSearch(type, this.props.location);
    };

    hotSort(hotSpots) {
        if (this.state.criteria === 'rating') {
            return hotSpots.sort((a, b) => b.rating - a.rating);
        } else {
            return hotSpots;
        }
    }

    render() {
        // This is kind of shitty, but whatevs. We don't want to just show
        // a spinner if we don't even have a location to use to fetch data
        const loading = this.state.loading && !!(this.state.location);
        const sortedHotSpots = this.hotSort(this.state.hotSpots);

        const secondaryText = (hotSpot) => (
            <span style={{whiteSpace:'pre'}}>
                {hotSpot.vicinity} <div><HotnessDisplay rating={hotSpot.rating}/></div>
            </span>
        );

        const listItems = sortedHotSpots.map((hotSpot) => {
            return (
                <div>
                    <ListItem
                        key={hotSpot.id}
                        primaryText={hotSpot.name}
                        secondaryText={secondaryText(hotSpot)}
                        onTouchTap={this.handleFocusChange(consts.pages.DETAIL_PAGE, {place_id: hotSpot.place_id})}
                    />
                    <Divider/>
                </div>
            );
        });

        return (
            <div className="Landing" style={{
                position: 'relative',
                paddingTop: '60px'
            }}>

            <div style={{position:'fixed', width:'100%', zIndex:'1000'}}>
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                >
                    <Tab icon={<FontIcon className="fa fa-glass" />} value={0} />
                    <Tab icon={<Disco />} value={1} />
                    <Tab icon={<FontIcon className="fa fa-coffee" />} value={2} />
                </Tabs>
            </div>

            <div style={{position:'relative', paddingTop:'49px'}}>
                {loading ? <LinearProgress mode="indeterminate" /> : null}
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

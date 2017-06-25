import { grey400, grey700 } from 'material-ui/styles/colors';
import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SwipeableViews from 'react-swipeable-views';
import LinearProgress from 'material-ui/LinearProgress';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Divider from 'material-ui/Divider';

import consts from '../consts';
import { HotnessDisplay } from '../hotness/Hotness';

import Disco from './Disco';
import './Landing.css';


class Landing extends Component {
    constructor(props) {
        super(props);

        const slideIndex = parseInt(localStorage.getItem('value'), 10);
        const orderingType = parseInt(localStorage.getItem('ordering'), 10);
        const type = localStorage.getItem('type');

        this.state = {
            bar: [],
            night_club: [],
            cafe: [],
            type: type ? type : 'bar',
            slideIndex: slideIndex ? slideIndex : 0,
            orderingType: orderingType ? orderingType : 'rating',
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
        if(!location) {
            return;
        }
        this.setState({hotSpots: []});
        let newState = {};
        newState[type] = [];
        this.setState(newState);
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
            newState = {loading};
            newState[type] = hotSpots;
            this.setState(newState);
        }
    }

    componentDidMount() {
        if (this.props.location) {
            this.locationSearch('bar',          this.props.location);
            this.locationSearch('night_club',   this.props.location);
            this.locationSearch('cafe',         this.props.location);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (
            (nextProps.location && !this.props.location) ||
            (this.props.location && nextProps.location
                && this.props.location.lat !== nextProps.location.lat
                && this.props.location.lng !== nextProps.location.lng)) {
            this.locationSearch('bar',          nextProps.location);
            this.locationSearch('night_club',   nextProps.location);
            this.locationSearch('cafe',         nextProps.location);
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
        });
        localStorage.setItem('value', value);
        localStorage.setItem('type', type);
    }

    handleOrderingChange = (value) => {
        if (value === 0) {
            value = 'rating';
        } else if (value === 1) {
            value = 'location';
        }
        this.setState({
            orderingType: value,
        });
        localStorage.setItem('ordering', value);
    }

    locationSort(hotSpots) {
        if (!this.props.location) {
            return hotSpots
        }

        const loc = {
            lat: () => this.props.location.lat,
            lng: () => this.props.location.lng
        }
        const dist = (latLng) => window.google.maps.geometry.spherical.computeDistanceBetween(latLng, loc);
        return hotSpots.sort(
            (a, b) =>
                dist(a.geometry.location) -
                dist(b.geometry.location));
    }

    ratingsSort(hotSpots) {
        function helper(a, b) {
            let aRating = (a.rating || 0);
            let bRating = (b.rating || 0);
            if (bRating !== aRating) {
                return  bRating - aRating;
            }
            else {
                if (a.name < b.name) return - 1;
                if (a.name > b.name) return 1;
                return 0;
            }
        }

        return hotSpots.sort(helper);
    }

    hotSort(hotSpots) {
        const secondaryText = (hotSpot) => (
            <span style={{whiteSpace:'pre'}}>
                {hotSpot.vicinity} <div><HotnessDisplay rating={hotSpot.rating}/></div>
            </span>
        );
        let temp = hotSpots;
        if (this.state.orderingType === 'rating') {
            temp = this.ratingsSort(hotSpots);
        } else if (this.state.orderingType === 'location') {
            temp = this.locationSort(hotSpots);
        }

        return temp.map((hotSpot, index) => (
            <div key={hotSpot.id + ' ' + index}>
                <ListItem
                    primaryText={hotSpot.name}
                    secondaryText={secondaryText(hotSpot)}
                    onTouchTap={this.handleFocusChange(consts.pages.DETAIL_PAGE, {place_id: hotSpot.place_id})}
                />
                <Divider/>
            </div>
        ));
    }

    render() {
        // This is kind of shitty, but whatevs. We don't want to just show
        // a spinner if we don't even have a location to use to fetch data
        const loading = this.state.loading;

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

            <div style={{position:'fixed', width:'100%', zIndex:'1000', top:'108px'}}>
                <Tabs
                    onChange={this.handleOrderingChange}
                    value={this.state.orderingType}
                    tabItemContainerStyle={{background:grey700}}
                    inkBarStyle={{background:grey700}}
                >
                    <Tab style={this.state.orderingType === 'rating' ? {color:grey400} : {color:'#303030'}} label='hotness' value={0} />
                    <Tab style={this.state.orderingType === 'location' ? {color:grey400} : {color:'#303030'}} label='location' value={1} />
                </Tabs>
            </div>

            <div style={{position:'relative', paddingTop:'80px'}}>
                {loading ? <div style={{
                    position: 'relative',
                }}>
                <RefreshIndicator
                    size={40}
                    left={-20}
                    top={10}
                    status={'loading'}
                    loadingColor="#C58100"
                    style={{marginLeft: '50%'}}
                      />
                </div> : null}
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                >
                    <div style={{overflow: 'hidden'}}>
                        <List>
                            {this.hotSort(this.state.bar)}
                        </List>
                    </div>
                    <div style={{overflow: 'hidden'}}>
                        <List>
                            {this.hotSort(this.state.night_club)}
                        </List>
                    </div>
                    <div style={{overflow: 'hidden'}}>
                        <List>
                            {this.hotSort(this.state.cafe)}
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
                disabled={!this.props.location}
                onTouchTap={this.handleFocusChange(
                    consts.pages.CHECKIN_PAGE,
                    {locationName: this.state[this.state.type][0] ? this.state[this.state.type][0].name : null}
                )
                }>
                <ContentAdd />
            </FloatingActionButton>
        </div>
        )
    }
}

export default Landing;

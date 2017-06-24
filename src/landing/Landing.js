import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SwipeableViews from 'react-swipeable-views';
import LinearProgress from 'material-ui/LinearProgress';
import SvgIcon from 'material-ui/SvgIcon';

import consts from '../consts';
import { HotnessDisplay } from '../hotness/Hotness';

import './Landing.css';


function Disco(props) {
    return (
        <SvgIcon viewBox="0 60 512 420" {...props}>
            <g>
                <g>
                    <path d="M441.616,278.102c0-95.11-73.015-173.588-166.094-182.097V16.781C275.522,7.513,268.008,0,258.741,0
			c-9.268,0-16.781,7.513-16.781,16.781v79.224c-93.091,8.51-166.093,87.003-166.093,182.097c0,0.057,0.002,0.114,0.002,0.172
			c0,0.015-0.002,0.028-0.002,0.044c0,0.025,0.003,0.048,0.003,0.072c0.157,100.876,82.328,182.588,182.871,182.588
			c100.377,0,182.715-81.554,182.872-182.588c0-0.025,0.003-0.048,0.003-0.072c0-0.015-0.002-0.029-0.002-0.044
			C441.614,278.216,441.616,278.159,441.616,278.102z M122.606,216.786h38.143c-2.8,14.328-4.618,29.339-5.377,44.749h-45.02
			C112.103,245.755,116.313,230.704,122.606,216.786z M122.805,339.847c-6.344-13.911-10.606-28.961-12.403-44.749h44.989
			c0.778,15.415,2.626,30.424,5.447,44.749H122.805z M143.893,373.408h25.812c4.084,12.072,8.969,23.493,15.061,34.356
			C169.164,398.828,155.321,387.156,143.893,373.408z M169.561,183.224H143.53c11.498-13.936,25.471-25.755,41.237-34.786
			C178.607,159.42,173.675,170.994,169.561,183.224z M241.961,422.554c-16.989-9.772-29.094-31.02-36.483-49.146h36.483V422.554z
			 M241.961,339.847H195.1c-3.165-14.105-5.229-29.148-6.096-44.749h52.957V339.847z M241.961,261.536h-52.985
			c0.845-15.595,2.885-30.639,6.024-44.749h46.961V261.536z M241.961,183.224h-36.659c7.377-18.23,19.542-39.729,36.659-49.575
			V183.224z M373.953,183.224h-26.032c-4.109-12.219-9.047-23.805-15.206-34.786C348.483,157.469,362.456,169.288,373.953,183.224z
			 M275.523,133.649c17.114,9.844,29.281,31.341,36.659,49.575h-36.659V133.649z M275.523,422.554v-49.146h36.483
			C304.628,391.51,292.523,412.777,275.523,422.554z M322.383,339.847h-46.86v-44.749h52.957
			C327.613,310.697,325.549,325.742,322.383,339.847z M275.523,261.536v-44.749h46.961c3.139,14.112,5.18,29.155,6.024,44.749
			H275.523z M332.716,407.766c6.113-10.9,10.992-22.329,15.063-34.356h25.812C362.163,387.156,348.32,398.828,332.716,407.766z
			 M394.679,339.847h-38.032c2.821-14.325,4.67-29.334,5.447-44.749h44.989C405.284,310.885,401.023,325.935,394.679,339.847z
			 M362.11,261.536c-0.757-15.409-2.576-30.421-5.377-44.749h38.144c6.293,13.918,10.503,28.968,12.253,44.749H362.11z"/>
                </g>
            </g>
            <g>
                <g>
                    <polygon points="464.896,445.313 451.5,420.819 438.105,445.313 413.611,458.708 438.105,472.104 451.5,496.597 464.896,472.104
			489.389,458.708 		"/>
                </g>
            </g>
            <g>
                <g>
                    <polygon points="95.289,85.216 68.498,93.064 41.706,85.216 49.553,112.008 41.706,138.8 68.498,130.953 95.289,138.8
			87.442,112.008 		"/>
                </g>
            </g>
            <g>
                <g>
                    <polygon points="58.353,402.742 47.517,382.93 36.682,402.742 16.869,413.578 36.682,424.412 47.517,444.225 58.353,424.412
			78.165,413.578 		"/>
                </g>
            </g>
            <g>
                <g>
                    <polygon points="475.319,101.172 464.483,81.361 453.648,101.172 433.835,112.008 453.648,122.843 464.483,142.656
			475.319,122.843 495.131,112.008 		"/>
                </g>
            </g>
            <g>
                <g>
                    <polygon points="138.951,458.354 112.128,466.209 85.304,458.354 93.161,485.177 85.304,512 112.128,504.144 138.951,512
			131.095,485.177 		"/>
                </g>
            </g>
        </SvgIcon>
);
}

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

    locationSearch(type){
        this.setState({hotSpots: []});
        const {location, map} = this.props;
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
            slideIndex: value,
            loading: true
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
                    primaryText={hotSpot.name}
                    secondaryText={secondaryText(hotSpot)}
                    onTouchTap={this.handleFocusChange(consts.pages.DETAIL_PAGE, {place_id: hotSpot.place_id})}
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

            <div style= {{
                        position: 'relative',
                        top: '60px'
                    }}>
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                >
                <Tab icon={<FontIcon className="fa fa-glass" />} value={0} />
                <Tab icon={<Disco />} value={1} />
                <Tab icon={<FontIcon className="fa fa-coffee" />} value={2} />
                </Tabs>
                {this.state.loading ? <LinearProgress mode="indeterminate" /> : null}
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

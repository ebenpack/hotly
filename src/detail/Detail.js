import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import Truncate from 'react-truncate';

import {HotnessDisplay} from '../hotness/Hotness';
import searchVenues, {getVenueHours, getFoursquareVenueFromGooglePlace, transformVenueHoursToGoogleFormat} from '../data/foursquare';

import './Detail.css';

const HotMap = withGoogleMap((props) => {
    return <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={18}
        defaultCenter={props.location}
        onClick={props.onMapClick}
    >
        <Marker
            position={props.location}
            onRightClick={() => {}}
        />
    </GoogleMap>
});

class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deets: null,
            foursquare: null,
            expanded: {}
        };

        this.handleFocusChange = this.handleFocusChange.bind(this);
        this.foursquareInfo = this.foursquareInfo.bind(this);
    }

    handleFocusChange(focus) {
        return () => {
            this.setState({deets: null});
            const {updateFocus} = this.props;
            updateFocus(focus);
        };
    }

    componentWillMount() {
        const {location, map, params} = this.props;
        const service = new window.google.maps.places.PlacesService(map);
        service.getDetails({
            placeId: params.place_id
        }, callback.bind(this));

        function callback(googlePlace, status) {
            const that = this;

            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                this.setState({
                    deets: googlePlace
                });

                // Get Foursquare Data - TODO: run in parallel and join processes with Google Search
                searchVenues(location.lat, location.lng, googlePlace.name)
                    .then(function (response) {
                        const venues = response.data.response.venues;
                        const foursquareVeneue = getFoursquareVenueFromGooglePlace(googlePlace, venues);

                        that.setState({
                            foursquare: foursquareVeneue
                        });

                        return foursquareVeneue;
                    })
                    .then(function (venue) {
                        if (!venue || !venue.id) return;

                        getVenueHours(venue.id)
                            .then(function (response) {
                                // const hours = response.data.response.hours; // TODO: do we need this if we have Google's hours?
                                venue['popular_hours'] = response.data.response.popular;

                                that.setState({
                                    foursquare: venue
                                })
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            } else {
                // TODO: Errors? I dgaf
            }
        }
    }

    toggleLines(event) {
        const id = event.target.dataset.id
        event.preventDefault();
        let expanded = this.state.expanded;
        debugger;
        expanded[id] = !expanded[id]
        this.setState({
            expanded: expanded
        });
    }

    foursquareInfo() {
        const {foursquare} = this.state;
        if (!foursquare) return null;
        const hereNow = foursquare.hereNow;
        const popularHours = transformVenueHoursToGoogleFormat(foursquare.popular_hours);

        return (
            <Card>
                <CardText>
                    {hereNow ? (
                        <span>
                            <p>
                                <img style={{maxHeight:'25px'}} src={require('../img/Foursquare Social.png')} alt="foursquare logo"/>
                                &nbsp; &nbsp;
                                {hereNow.summary} (Check Ins: {hereNow.count})
                            </p>
                        </span>
                    ) : null}
                    {popularHours ? (
                        <span>
                            <h3>Popular Hours:</h3>
                                {popularHours.weekday_text.map(hours => (
                                    <span>{hours}<br /></span>
                                ))}
                        </span>
                    ) : null}
                </CardText>
            </Card>
        );
    }

    render() {
        const {params} = this.props;
        const {deets} = this.state;

        let closing_time = 'N/A';
        if (deets && deets.opening_hours) {
            const date = new Date();
            const day = date.getDay();
            if (deets.opening_hours.periods[day]) {
                const hour = deets.opening_hours.periods[day]['close'].hours;
                let minutes = deets.opening_hours.periods[day]['close'].minutes;
                if (minutes.toString().length === 1) {
                    minutes = '0' + minutes;
                }
                closing_time = ((hour + 11) % 12 + 1) + ':'  + minutes;
            }
        }

        let price_level = '';
        if (deets && deets.price_level) {
            price_level = '';
            for (let i = 1; i <= deets.price_level; i++) {
                price_level += '$';
            }
        }

        const {
            expanded
        } = this.state;

        // TODO: Some loading spinner bullshit

        return (
            <div className="Detail" style={{
                position: 'relative',
                paddingTop: '60px'
            }}>
                {deets ? (
                    <div>
                        <GridList cellHeight={180} cols={2.2}
                            style={{
                                display: 'flex',
                                flexWrap: 'nowrap',
                                overflowX: 'auto',
                            }}
                        >
                            {deets.photos?
                            deets.photos.map((photo, i) => (
                                <GridTile key={i}>
                                    <img alt="location" src={photo.getUrl({'maxWidth': 300, 'maxHeight': 300})}/>
                                </GridTile>
                            )) : null
                            }
                        </GridList>
                        <Card>
                            <CardHeader
                                actAsExpander={true}
                                showExpandableButton={true}
                                title={<HotnessDisplay rating={deets.rating}/>}
                                subtitle={<div>{price_level} <br/> Closes at: {closing_time}<br/> {this.foursquareInfo()}</div>}
                                subtitleColor='#C58100'
                            />
                            <CardTitle
                                titleColor='#24A39A'
                                title={deets.name}
                                subtitle={
                                    <div>
                                        <a style={{color:'#FB3842'}} href={deets.website}>Website</a>
                                        <br/>
                                        <a style={{color:'#FB3842'}} href={"tel:" + deets.international_phone_number}>{deets.formatted_phone_number}</a>
                                        <br />
                                        <a style={{color:'#FB3842'}} href={deets.url}>{deets.formatted_address}</a>
                                    </div>
                                }
                            />
                            <CardText expandable={true}>
                                {deets.reviews ?
                                    deets.reviews.map((review,id) => (
                                        <Card>
                                            <CardHeader
                                                avatar={
                                                    <a href={review.author_url}>
                                                        <img style={{maxHeight:'50px'}}alt='' src={review.profile_photo_url}/>
                                                    </a>
                                                }
                                                title={review.author_name}
                                                subtitle={review.relative_time_description}
                                            />
                                            <CardText>
                                                {<HotnessDisplay rating={review.rating}/>}
                                                <div>
                                                    <Truncate
                                                        lines={!expanded[id] && 2}
                                                        ellipsis={
                                                            <span>...
                                                                <a data-id={id} style={{color:'#24A39A'}} href='#' onClick={this.toggleLines.bind(this)}>More</a>
                                                            </span>
                                                        }>
                                                        {review.text}
                                                    </Truncate>
                                                    {expanded[id] && (
                                                        <span>
                                                            <a data-id={id} style={{color:'#24A39A'}} href='#' onClick={this.toggleLines.bind(this)}>Less</a>
                                                            </span>
                                                    )}
                                                </div>
                                            </CardText>
                                        </Card>
                                    )) : null
                                }
                            </CardText>
                        </Card>
                        <HotMap
                            location={{
                                lat: deets.geometry.location.lat(),
                                lng: deets.geometry.location.lng()
                            }}
                            containerElement={
                                <div style={{height: '500px'}} />
                            }
                            mapElement={
                                <div style={{height: '500px'}} />
                            }
                            onMapLoad={() => {
                            }}
                            onMapClick={() => {
                            }}
                            markers={this.state.markers}
                            onMarkerRightClick={() => {}}
                        />
                    </div>
                ) : null
                }
            </div>
        );
    }
}

export default Detail;

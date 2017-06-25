import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';

import {HotnessDisplay} from '../hotness/Hotness';
import searchVenues, {getFoursquareVenueFromGooglePlace} from '../data/foursquare';

import './Detail.css';


class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deets: null,
            foursquare: null
        };

        this.handleFocusChange = this.handleFocusChange.bind(this);
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
                        console.log(response);

                        const venues = response.data.response.venues;

                        that.setState({
                            foursquare: getFoursquareVenueFromGooglePlace(googlePlace, venues)
                        });
                    })
                    .catch(function (error) {
                        // probably nothing to do here if there's an error, we just don't show any 4square data
                        console.log(error);
                    });

            } else {
                // TODO: Errors? I dgaf
            }
        }
    }

    render() {
        const {params} = this.props;
        const {deets, foursquare} = this.state;

        const foursquareInfo = () => {
            if (!foursquare) return null;
            const hereNow = foursquare.hereNow;

            return (
                <Card>
                    <CardHeader
                        title="Foursquare"
                        avatar={require('../img/Foursquare Social.png')}
                    />
                    <CardText>
                        {hereNow ? (
                            <span>
                                <h3>Here now:</h3>
                                <p>{hereNow.summary} (Check Ins: {hereNow.count})</p>
                            </span>
                            ) : null}
                    </CardText>
                </Card>
            );
        };

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
                            {deets.photos.map((photo, i) => (
                                <GridTile key={i}>
                                    <img alt="location" src={photo.getUrl({'maxWidth': 300, 'maxHeight': 300})}/>
                                </GridTile>
                            ))}
                        </GridList>
                        <Card>
                            <CardTitle title={deets.name} />
                            <CardText>
                                <p>Address: {deets.formatted_address}</p>
                                <p>Phone_number: <a href={"tel:" + deets.international_phone_number}>{deets.formatted_phone_number}</a></p>
                                <div> Closes at: {closing_time} </div>
                                <p>rating: <HotnessDisplay rating={deets.rating}/></p>
                                <p>price_level: {deets.price_level}</p>
                                {/* <p>reviews: {deets.reviews}</p> */}
                                <p>website: {deets.website}</p>
                            </CardText>
                        </Card>

                        {foursquareInfo()}
                    </div>
                ) : null
                }
            </div>
        );
    }
}

export default Detail;

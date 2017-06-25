import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {Card, CardHeader, CardText} from 'material-ui/Card';

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
                    />
                    <CardText>
                        {hereNow ? <p>Here now: {hereNow.summary} - Check Ins: {hereNow.count}</p> : null}
                    </CardText>
                </Card>
            );
        };


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
                                    <img src={photo.getUrl({'maxWidth': 300, 'maxHeight': 300})}/>
                                </GridTile>
                            ))}
                        </GridList>
                        {deets.formatted_address ? <p>Address: {deets.formatted_address}</p> : null}
                        {deets.international_phone_number ? <p>Phone_number: <a href={"tel:" + deets.international_phone_number}>{deets.international_phone_number}</a></p> : null}
                        {deets.opening_hours ? <p>Hours: {deets.opening_hours.weekday_text}</p> : null}
                        {deets.rating ? <p>rating: <HotnessDisplay rating={deets.rating}/></p> : null}
                        {deets.price_level ? <p>price_level: {deets.price_level}</p> : null}

                        {foursquareInfo()}
                    </div>
                ) : null
                }
            </div>
        );
    }
}

export default Detail;

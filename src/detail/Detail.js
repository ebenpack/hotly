import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {Card, CardTitle, CardText} from 'material-ui/Card';

import {HotnessDisplay} from '../hotness/Hotness';

import './Detail.css';


class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deets: null
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

    componentDidMount() {
        const {map, params} = this.props;
        const service = new window.google.maps.places.PlacesService(map);
        service.getDetails({
            placeId: params.place_id
        }, callback.bind(this));

        function callback(results, status) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                this.setState({
                    deets: results
                });
            } else {
                // TODO: Errors? I dgaf
            }
        }
    }

    render() {
        const {deets} = this.state;

        let closing_time = 'N/A';
        if (deets && deets.opening_hours) {
            const date = new Date();
            const day = date.getDay();
            if (deets.opening_hours.periods[day]) {
                const hour = deets.opening_hours.periods[day]['close'].hours
                let minutes = deets.opening_hours.periods[day]['close'].minutes
                if (minutes.toString().length === 1) {
                    minutes = '0' + minutes;
                }
                closing_time = ((hour + 11) % 12 + 1) + ':'  + minutes;
                closing_time += hour >= 12 ? ' PM' : ' AM';
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
                                    <img src={photo.getUrl({'maxWidth': 300, 'maxHeight': 300})} alt=""/>
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
                    </div>
                ) : null
                }
            </div>
        );
    }
}

export default Detail;

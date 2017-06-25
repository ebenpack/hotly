import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import consts from '../consts';
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
        const {location, map, params} = this.props;
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
        const {params} = this.props;
        const {deets} = this.state;
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
                        <p>Address: {deets.formatted_address}</p>
                        <p>Phone_number: <a href={"tel:" + deets.international_phone_number}>{deets.international_phone_number}</a></p>
                        <p>Hours: {deets.opening_hours && deets.opening_hours.weekday_text}</p>
                        <p>rating: <HotnessDisplay rating={deets.rating}/></p>
                        <p>price_level: {deets.price_level}</p>
                    </div>
                ) : null
                }
            </div>
        );
    }
}

export default Detail;

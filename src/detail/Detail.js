import React, {Component} from 'react';

import '../app/App.css';
import consts from '../consts';


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
            debugger
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                this.setState({
                    deets: results
                });
            } else {
                // TODO: Errors? I dgaf
            }
        }

        this.setState({foo:'bar'});
    }

    render() {
        const {params} = this.props;
        const {deets} = this.state;
        // TODO: Some loading spinner bullshit
        return (
            <div className="Detail">
                {deets ? (
                    <div>
                        <p>formatted_address: {deets.formatted_address}</p>
                        <p>international_phone_number: {deets.international_phone_number}</p>
                        <p>opening_hours.weekday_text: {deets.opening_hours.weekday_text}</p>
                        <div>
                            Here's some photos, dummy
                            {deets.photos.map((photo, i)=>
                                <img src={photo.getUrl({'maxWidth': 100, 'maxHeight': 100})} key={i}/>
                            )}
                        </div>
                        <p>rating: {deets.rating}</p>
                        <p>price_level: {deets.price_level}</p>
                    </div>
                ) : null
                }
                <p className="App-intro">
                    <button onClick={this.handleFocusChange(consts.pages.LANDING_PAGE)}>Landing</button>
                </p>
            </div>
        );
    }
}

export default Detail;

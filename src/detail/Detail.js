import React, {Component} from 'react';

import '../app/App.css';
import consts from '../consts';


class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleFocusChange = this.handleFocusChange.bind(this);
    }

    handleFocusChange(focus) {
        return () => {
            const {updateFocus} = this.props;
            updateFocus(focus);
        };
    }

    componentDidMount({location, map}) {


        const service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: location,
            type: 'bar',
            rankBy: window.google.maps.places.RankBy.DISTANCE
        }, callback.bind(this));

        function callback(results, status) {
            let google_results = [];
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    google_results.push(results[i]);
                }
                this.setState({results: google_results});
            }
        }

        this.setState({foo:'bar'});
    }

    render() {
        const {params} = this.props;
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Detail - {params.place_id}</h2>
                </div>
                <p className="App-intro">
                    <button onClick={this.handleFocusChange(consts.pages.LANDING_PAGE)}>Landing</button>
                </p>
            </div>
        );
    }
}

export default Detail;

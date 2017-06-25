import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';

import searchVenues from '../data/foursquare';
import consts from '../consts';


class HotSpotCompletion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: []
        };

        this.handleChangeLocation = this.handleChangeLocation.bind(this);
    }

    handleChangeLocation(hotSpot) {
        return () => {
            const {updateLocation} = this.props;
            updateLocation(hotSpot);
        };
    }

    componentWillMount() {
        const {lat, lng} = this.props;
        const that = this;
        const categories = [
            consts.foursquare.CATEGORY_ID.NIGHTLIFE_SPOT,
            consts.foursquare.CATEGORY_ID.COFFEE_SHOP,
            consts.foursquare.CATEGORY_ID.CAFE
        ];

        searchVenues(lat, lng, null, categories)
            .then((response) => {
                that.setState({
                    dataSource: response.data.response.venues.map(venue => venue.name)
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <AutoComplete
                    hintText="Where are you at?"
                    dataSource={this.state.dataSource}
                    onNewRequest={this.handleChangeLocation}
                    filter={(data) => data}
                />
            </div>
        );
    }
}

export default HotSpotCompletion;

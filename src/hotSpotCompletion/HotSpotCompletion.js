import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';

import searchVenues from '../data/foursquare';
import consts from '../consts';


class HotSpotCompletion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            searchText: ''
        };

        this.handleChangeLocation = this.handleChangeLocation.bind(this);
    }

    handleChangeLocation(hotSpot) {
        const {updateLocation} = this.props;
        updateLocation(hotSpot);
        this.setState({searchText: '',})
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
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleUpdateInput (searchText) {
        this.setState({
            searchText: searchText,
        });
    }


    render() {
        return (
            <div>
                <AutoComplete
                    searchText={this.state.searchText}
                    hintText="Where are you at?"
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput.bind(this)}
                    onNewRequest={this.handleChangeLocation}
                    openOnFocus={true}
                    filter={AutoComplete.fuzzyFilter}
                />
            </div>
        );
    }
}

export default HotSpotCompletion;

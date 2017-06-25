import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';


const debounce = (func, wait, immediate) => {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
};

// Warning: This file is full of race conditions

class PlaceCompletion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locationHints: []
        };
        const self = this;

        function fetchCompletions(callback, val) {
            self.setState({locationFieldValue: val});
            const autoComplete = new window.google.maps.places.AutocompleteService();
            autoComplete.getPlacePredictions({input: val}, callback);
            // getQueryPredictions ???? What's the diff?
        }

        this.fetchCompletions = debounce(fetchCompletions, 300);
    }

    updateLocationField(val) {
        let self = this;
        this.fetchCompletions(cb, val);
        function cb(predictions, status) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                self.setState({locationHints: predictions});
            }
        }
    }

    render() {
        return (
            <AutoComplete
                open={this.state.locationHints.length > 0}
                hintText="Enter your location"
                dataSource={this.state.locationHints.map((result) => result.description)}
                onUpdateInput={this.updateLocationField.bind(this)}
                // This component doesn't work like you think it works. We need to override the
                // filter to just poop back whatever's in the data source
                filter={(data) => data}
                onNewRequest={(name, index) =>
                    this.state.locationHints.length > 0
                        ? this.props.selectAutocompletion(
                            // If user hits `enter`, index will be -1, so just grab whateverthefuck
                            this.state.locationHints[index > -1 ? index : 0]
                        )
                        : null
                }
            />
        );
    }
}

export default PlaceCompletion;

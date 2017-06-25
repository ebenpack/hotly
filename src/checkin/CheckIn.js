import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import Hotness from '../hotness/Hotness';
import HotSpotCompletion from '../hotSpotCompletion/HotSpotCompletion';

import './CheckIn.css';


class CheckIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: props.params.locationName,
            allowUserToTypeLocation: !props.params.locationName,
            noiseLevel: "",
            crowdSize: "",
            amenities: {},
        };

        this.handleFocusChange = this.handleFocusChange.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
    }

    handleFocusChange(focus) {
        return () => {
            const {updateFocus} = this.props;
            updateFocus(focus);
        };
    }

    updateLocation(location) {
        this.setState({location});
    }

    toggleMusic() {
        let amenities = this.state.amenities;
        amenities['music'] = !amenities['music'];
        this.setState({amenities: amenities});
    }

    toggleDancing() {
        let amenities = this.state.amenities;
        amenities['dancing'] = !amenities['dancing'];
        this.setState({amenities: amenities});
    }

    render() {
        const {lat, lng} = this.props.location;

        return (
            <div className="CheckIn"
                style={{
                    position: 'relative',
                    top: '60px'
                }}
            >
                { this.state.allowUserToTypeLocation ?
                    <Card>
                        <CardTitle
                            title="Enter Your Location"
                        />
                        <CardActions>
                            <HotSpotCompletion lat={lat} lng={lng} updateLocation={this.updateLocation} />
                        </CardActions>
                    </Card>
                    :
                    <Card
                        onTouchTap={() => { this.setState({allowUserToTypeLocation: !this.state.allowUserToTypeLocation}) }}
                    >
                        <CardTitle
                            title={this.state.location}
                            subtitle="Not here?"
                        />
                    </Card>
                }
                <Card>
                    <CardHeader
                        title="How hot is it?"
                        subtitle="Rate the location you're at"
                    />
                    <CardText>
                        <Hotness rating={0} total={5}/>
                    </CardText>
                </Card>
                <Card>
                    <CardHeader
                        title="How loud is it?"
                    />
                    <CardActions>
                        <RaisedButton
                            label="Quiet"
                            onTouchTap={() => this.setState({noiseLevel: "quiet"}) }
                            {... this.state.noiseLevel === "quiet" ? {backgroundColor: "#CCC"} : {}}
                        />
                        <RaisedButton
                            label="Loud"
                            onTouchTap={() => this.setState({noiseLevel: "loud"}) }
                            {... this.state.noiseLevel === "loud" ? {backgroundColor: "#CCC"} : {}}
                        />
                    </CardActions>
                </Card>
                <Card>
                    <CardHeader
                        title="How packed is it?"
                    />
                    <CardActions>
                        <RaisedButton
                            label="Empty"
                            onTouchTap={() => this.setState({crowdLevel: "empty"}) }
                            {... this.state.crowdLevel === "empty" ? {backgroundColor: "#CCC"} : {}}
                        />
                        <RaisedButton
                            label="Busy"
                            onTouchTap={() => this.setState({crowdLevel: "busy"}) }
                            {... this.state.crowdLevel === "busy" ? {backgroundColor: "#CCC"} : {}}
                        />
                    </CardActions>
                </Card>
                <Card>
                    <CardHeader
                        title="What's there?"
                    />
                    <CardActions>
                        <RaisedButton
                            label="Music"
                            onTouchTap={this.toggleMusic.bind(this)}
                            {... this.state.amenities['music'] ? {backgroundColor: "#CCC"} : {}}
                        />
                        <RaisedButton
                            label="Dancing"
                            onTouchTap={this.toggleDancing.bind(this)}
                            {... this.state.amenities['dancing'] ? {backgroundColor: "#CCC"} : {}}
                        />
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default CheckIn;

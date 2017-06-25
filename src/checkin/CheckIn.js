import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Hotness from '../hotness/Hotness';

import './CheckIn.css';


class CheckIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: props.params.locationName,
            allowUserToTypeLocation: !props.params.locationName,
            noiseLevel: "",
            crowdSize: "",
            amenities: "",
        };

        console.log(props);
        this.handleFocusChange = this.handleFocusChange.bind(this);
    }

    handleFocusChange(focus) {
        return () => {
            const {updateFocus} = this.props;
            updateFocus(focus);
        };
    }

    render() {
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
                            <TextField
                                name="userEnteredLocation"
                            />
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
                            label="Noisy"
                            onTouchTap={() => this.setState({noiseLevel: "noisy"}) }
                            {... this.state.noiseLevel === "noisy" ? {backgroundColor: "#CCC"} : {}}
                        />
                        <RaisedButton
                            label="LOUD"
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
                        <RaisedButton
                            label="Packed"
                            onTouchTap={() => this.setState({crowdLevel: "packed"}) }
                            {... this.state.crowdLevel === "packed" ? {backgroundColor: "#CCC"} : {}}
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
                            onTouchTap={() => this.setState({amenities: "music"}) }
                            {... this.state.amenities === "music" ? {backgroundColor: "#CCC"} : {}}
                        />
                        <RaisedButton
                            label="Dancing"
                            onTouchTap={() => this.setState({amenities: "dancing"}) }
                            {... this.state.amenities === "dancing" ? {backgroundColor: "#CCC"} : {}}
                        />
                        <RaisedButton
                            label="Food"
                            onTouchTap={() => this.setState({amenities: "food"}) }
                            {... this.state.amenities === "food" ? {backgroundColor: "#CCC"} : {}}
                        />
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default CheckIn;

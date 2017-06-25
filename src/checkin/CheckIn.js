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
            allowUserToTypeLocation: !props.params.locationName
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
                        <RaisedButton>
                            Quiet
                        </RaisedButton>
                        <RaisedButton>
                            Noisy
                        </RaisedButton>
                        <RaisedButton>
                            LOUD
                        </RaisedButton>
                    </CardActions>
                </Card>
                <Card>
                    <CardHeader
                        title="How packed is it?"
                    />
                    <CardActions>
                        <RaisedButton>
                            Empty
                        </RaisedButton>
                        <RaisedButton>
                            Busy
                        </RaisedButton>
                        <RaisedButton>
                            Packed
                        </RaisedButton>
                    </CardActions>
                </Card>
                <Card>
                    <CardHeader
                        title="What's there?"
                    />
                    <CardActions>
                        <RaisedButton>
                            Music
                        </RaisedButton>
                        <RaisedButton>
                            Dancing
                        </RaisedButton>
                        <RaisedButton>
                            Food
                        </RaisedButton>
                    </CardActions>
                </Card>
            </div>
        );
    }

    getGeoLocation() {
        // return App.state.location
    }
}

export default CheckIn;

import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

import Hotness from '../hotness/Hotness';

import './CheckIn.css';


class CheckIn extends Component {
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

    render() {
        return (
             <div className="CheckIn" style={{
                position: 'relative',
                top: '60px'
                }}>
                <Card>
                    <CardHeader
                        title="How hot is it?"
                        subtitle="Rate the location you're at"
                    />
                    <CardText>
                        <Hotness rating={0} total={5}/>
                    </CardText>
                </Card>
            </div>
        );
    }
}

export default CheckIn;

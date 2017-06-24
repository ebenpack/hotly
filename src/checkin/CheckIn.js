import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import {Card, CardHeader, CardText} from 'material-ui/Card';

import consts from '../consts';
import Hotness from '../hotness/Hotness';

import './CheckIn.css';


class CheckIn extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.handleFocusChange = this.handleFocusChange.bind(this);
    }

    handleFocusChange(focus) {
        return () => {
            const { updateFocus } = this.props;
            updateFocus(focus);
        };
    }

    render() {
        return (
            <div className="CheckIn">
                <AppBar
                    title="Check In"
                    iconElementLeft={
                        <IconButton>
                            <NavigationChevronLeft onTouchTap={this.handleFocusChange(consts.pages.LANDING_PAGE)} />
                        </IconButton>
                    }
                />
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

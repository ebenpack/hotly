import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import hotSpots from './LandingTempData'
import consts from '../consts';

import './Landing.css';


class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.handleFocusChange = this.handleFocusChange.bind(this);
    }

    handleFocusChange(focus, params={}) {
        return () => {
            const { updateFocus } = this.props;
            updateFocus(focus, params);
        };
    }

    render() {
        const listItems = hotSpots.map((hotSpot) => {
            return (
                <ListItem
                    leftIcon=""
                    primaryText={hotSpot.name}
                    secondaryText={`${hotSpot.vicinity} - ${hotSpot.rating}`}
                    onTouchTap={this.handleFocusChange(consts.pages.DETAIL_PAGE, {place_id: hotSpot.place_id})}
                />
            );
        });

        return (
            <div className="Landing">
                <AppBar
                    title="What's Hot?"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <List>
                    { listItems}
                </List>
                <FloatingActionButton secondary={true}
                    style={{float: 'right', marginRight: 20}}
                    onTouchTap={this.handleFocusChange(consts.pages.CHECKIN_PAGE)}
                >
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        )
    }
}

export default Landing;

import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import LandingTempData from './LandingTempData'
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

    render(props) {
        props = LandingTempData;

        return (
            <div className="Landing">
                <AppBar
                    title="What's Hot?"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <List>
                    <ListItem
                        value={1}
                        primaryText="Brendan Lim"
                        leftAvatar={<Avatar src="images/ok-128.jpg"/>}
                        nestedItems={[
                            <ListItem
                                value={2}
                                primaryText="Grace Ng"
                                leftAvatar={<Avatar src="images/uxceo-128.jpg"/>}
                                onTouchTap={this.handleFocusChange(consts.pages.DETAIL_PAGE, {value: 2})}
                            />,
                        ]}
                        onTouchTap={this.handleFocusChange(consts.pages.DETAIL_PAGE, {value: 1})}
                    />
                    <ListItem
                        value={3}
                        primaryText="Kerem Suer"
                        leftAvatar={<Avatar src="images/kerem-128.jpg"/>}
                        onTouchTap={this.handleFocusChange(consts.pages.DETAIL_PAGE, {value: 3})}
                    />
                    <ListItem
                        value={4}
                        primaryText="Eric Hoffman"
                        leftAvatar={<Avatar src="images/kolage-128.jpg"/>}
                        onTouchTap={this.handleFocusChange(consts.pages.DETAIL_PAGE, {value: 4})}
                    />
                    <ListItem
                        value={5}
                        primaryText="Raquel Parrado"
                        leftAvatar={<Avatar src="images/raquelromanp-128.jpg"/>}
                        onTouchTap={this.handleFocusChange(consts.pages.DETAIL_PAGE, {value: 5})}
                    />
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

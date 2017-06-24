import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';

import LandingTempData from './LandingTempData'
import consts from './consts';


let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
    return class SelectableList extends Component {

        componentWillMount() {
            this.setState({
                selectedIndex: this.props.defaultValue,
            });
        }

        handleRequestChange = (event, index) => {
            this.setState({
                selectedIndex: index,
            });
        };

        render() {
            return (
                <ComposedComponent
                    value={this.state.selectedIndex}
                    onChange={this.handleRequestChange}
                >
                    {this.props.children}
                </ComposedComponent>
            );
        }
    };
}

SelectableList = wrapState(SelectableList);

class Landing extends Component {
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

    render(props) {
        props = LandingTempData;

        return (
            <div>
                <AppBar
                    title="What's Hot?"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <button onClick={this.handleFocusChange(consts.pages.CHECKIN_PAGE)}>Checkin</button>
                <button onClick={this.handleFocusChange(consts.pages.DETAIL_PAGE)}>Detail</button>
                <SelectableList defaultValue={3}>
                    <ListItem
                        value={1}
                        primaryText="Brendan Lim"
                        leftAvatar={<Avatar src="images/ok-128.jpg"/>}
                        nestedItems={[
                            <ListItem
                                value={2}
                                primaryText="Grace Ng"
                                leftAvatar={<Avatar src="images/uxceo-128.jpg"/>}
                            />,
                        ]}
                    />
                    <ListItem
                        value={3}
                        primaryText="Kerem Suer"
                        leftAvatar={<Avatar src="images/kerem-128.jpg"/>}
                    />
                    <ListItem
                        value={4}
                        primaryText="Eric Hoffman"
                        leftAvatar={<Avatar src="images/kolage-128.jpg"/>}
                    />
                    <ListItem
                        value={5}
                        primaryText="Raquel Parrado"
                        leftAvatar={<Avatar src="images/raquelromanp-128.jpg"/>}
                    />
                </SelectableList>
            </div>
        )
    }
}

export default Landing;

import React, {Component} from 'react';
import SocialWhatshot from 'material-ui/svg-icons/social/whatshot';
import {red900} from 'material-ui/styles/colors';


export const HotnessDisplay = (props) => {
    const { rating } = props;
    const flames = [];

    for (let i = 0; i < rating; i++) {
        flames.push(
            <SocialWhatshot
                key={`${i}-hotness`}
                color={'#FB3842'}
            />
        );
    }

    return (
        <span>{ flames }</span>
    );
};

class Hotness extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };


    }

    render() {
        return null;
    }
}

export default Hotness;

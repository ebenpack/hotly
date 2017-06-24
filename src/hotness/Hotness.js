import React, {Component} from 'react';
import SocialWhatshot from 'material-ui/svg-icons/social/whatshot';
import {grey500} from 'material-ui/styles/colors';


export const HotnessDisplay = (props) => {
    const { rating, total } = props;
    const flames = [];
    const numOfFlames = total || rating;

    for (let i = 0; i < numOfFlames; i++) {
        flames.push(
            <SocialWhatshot
                key={`${i}-hotness`}
                color={i < rating ? '#FB3842' : grey500}
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
            rating: 0
        };


    }

    render() {
        const { rating } = this.state;
        const { total } = this.props;

        return (
            <HotnessDisplay rating={rating} total={total} />
        );
    }
}

export default Hotness;

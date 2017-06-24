import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import SocialWhatshot from 'material-ui/svg-icons/social/whatshot';
import {grey500} from 'material-ui/styles/colors';


export const HotnessDisplay = (props) => {
    const { rating, total, onChange } = props;
    const flames = [];
    const numOfFlames = total || rating;

    const handleTouchTap = (newRating) => () => onChange ? onChange(newRating) : null;

    for (let i = 1; i <= numOfFlames; i++) {
        flames.push(
            <IconButton key={`${i}-hotness`} onTouchTap={handleTouchTap(i)} style={{padding: 0, width: 24, height: 24}}>
                <SocialWhatshot
                    color={i <= rating ? '#FB3842' : grey500}
                    hoverColor={'#FB3842'}
                />
            </IconButton>
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

        this.handleRatingChange = this.handleRatingChange.bind(this);
    }

    handleRatingChange(newRating) {
        console.log(`newRating: ${newRating}`);
        this.setState({
            rating: newRating
        });
    }

    render() {
        const { rating } = this.state;
        const { total } = this.props;

        return (
            <HotnessDisplay rating={rating} total={total} onChange={this.handleRatingChange} />
        );
    }
}

export default Hotness;

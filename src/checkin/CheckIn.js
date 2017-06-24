import React, {Component} from 'react';

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
            </div>
        );
    }
}

export default CheckIn;

import React, { Component } from 'react';
import './App.css';
import consts from './consts';


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

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Landing</h2>
                </div>
                <p className="App-intro">
                    <button onClick={this.handleFocusChange(consts.pages.CHECKIN_PAGE)}>Checkin</button>
                    <button onClick={this.handleFocusChange(consts.pages.DETAIL_PAGE)}>Detail</button>
                </p>
            </div>
        );
    }
}

export default Landing;

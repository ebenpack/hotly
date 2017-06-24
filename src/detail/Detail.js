import React, { Component } from 'react';

import '../app/App.css';
import consts from '../consts';


class Detail extends Component {
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
        const { params } = this.props;
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Detail - {params.value}</h2>
                </div>
                <p className="App-intro">
                    <button onClick={this.handleFocusChange(consts.pages.LANDING_PAGE)}>Landing</button>
                </p>
            </div>
        );
    }
}

export default Detail;

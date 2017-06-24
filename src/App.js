import React, { Component } from 'react';
import './App.css';
import Landing from './Landing';
import Detail from './Detail';
import CheckIn from './CheckIn';
import consts from './consts';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focus: consts.pages.LANDING_PAGE
        };

        this.updateFocus = this.updateFocus.bind(this);
    }

    updateFocus(focus) {
        this.setState({focus});
    }

    render() {
        const { focus } = this.state;

        const currentPage = () => {
            switch (focus) {
                case consts.pages.LANDING_PAGE: {
                    return <Landing updateFocus={this.updateFocus} />;
                }
                case consts.pages.DETAIL_PAGE: {
                    return <Detail updateFocus={this.updateFocus} />;
                }
                case consts.pages.CHECKIN_PAGE: {
                    return <CheckIn updateFocus={this.updateFocus} />;
                }
                default:
                    return <h2>PAGE NOT FOUND</h2>;
            }
        };

        return (
            <div>
                { currentPage() }
            </div>
        );
    }
}

export default App;

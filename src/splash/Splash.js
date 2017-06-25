import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const Splash = ({splashIsOpen, close}) => (
    <Dialog repositionOnUpdate={false}
            autoDetectWindowHeight={false}
            modal={false}
            open={splashIsOpen}
            contentStyle={{width: '100%', transform: 'translate(0, 0)'}}
            bodyStyle={{padding: 20}}
            style={{padding: 20, height: '100vh'}}
            actions={<FlatButton label="Get Started!" onTouchTap={close}/>}
    >
        Welcome to Hotly! The 'hot' new webapp designed to help you find the hot nightspots in your area.
        Find what's going on near you, and where the 'hotspots' are.
        Then check in to let others know what you think about stuff.

        <br />
        <br />

        So don't get left out in the 'cold'... join hotly.

        <br />
        <br />

        We'd like your geolocation for this webapp to work.
    </Dialog>
);

export default Splash;

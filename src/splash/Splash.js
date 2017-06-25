import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const Splash = ({splashIsOpen, close}) => (
    <Dialog repositionOnUpdate={false}
            autoDetectWindowHeight={false}
            modal={false}
            open={splashIsOpen}
            contentStyle={{width: '100%', transform: 'translate(0, 0)'}}
            bodyStyle={{padding: 0}}
            style={{paddingTop: 0, height: '100vh'}}
    >
        <Card>
            <CardHeader
                title="Welcome to Hotly!"
            />
            <CardText>
                Welcome to Hotly! The 'hot' new webapp designed to help you find the hot nightspots in your area.
                Find what's going on near you, and where the 'hotspots' are.
                Then check in to let others know what you think about stuff.
                So don't get left out in the 'cold'... join hotly.
            </CardText>
            <CardActions>
                <FlatButton label="Get Started!" onTouchTap={close}/>
            </CardActions>
        </Card>
    </Dialog>
);


export default Splash;

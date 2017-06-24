import { fullWhite } from 'material-ui/styles/colors';
import spacing from 'material-ui/styles/spacing';
import {fade} from 'material-ui/utils/colorManipulator';


export default {
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    borderRadius: 2,
    palette: {
        primary1Color: '#303030',
        accent1Color: '#C58100',
        textColor: '#C58100',
        secondaryTextColor: fade(fullWhite, 0.7),
        alternateTextColor: '#24A39A',
        canvasColor: '#303030',
    },
};

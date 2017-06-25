import { fullWhite } from 'material-ui/styles/colors';
import spacing from 'material-ui/styles/spacing';
import {fade} from 'material-ui/utils/colorManipulator';


export default {
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    borderRadius: 2,
    palette: {
        primary1Color: '#303030',
        primary3Color: '#C58100',
        accent1Color: '#980008',
        textColor: '#C58100',
        disabledColor: '#007970',
        secondaryTextColor: fade(fullWhite, 0.7),
        alternateTextColor: '#007970',
        canvasColor: '#303030',
        shadowColor: '#303030',
    },
};

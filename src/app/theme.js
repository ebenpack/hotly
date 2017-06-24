import {
    red500, red900, redA700,
    cyan700, cyan800,
    amber600,
    fullWhite,
} from 'material-ui/styles/colors';
import spacing from 'material-ui/styles/spacing';
import {fade} from 'material-ui/utils/colorManipulator';


export default {
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    borderRadius: 2,
    palette: {
        primary1Color: red500,
        primary2Color: red900,
        primary3Color: redA700,
        accent1Color: cyan700,
        accent2Color: cyan800,
        accent3Color: amber600,
        textColor: fullWhite,
        secondaryTextColor: fade(fullWhite, 0.7),
        alternateTextColor: '#303030',
        canvasColor: '#303030',
        borderColor: fade(fullWhite, 0.3),
        disabledColor: fade(fullWhite, 0.3),
        pickerHeaderColor: fade(fullWhite, 0.12),
        clockCircleColor: fade(fullWhite, 0.12),
    },
};

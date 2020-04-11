import { createMuiTheme } from "@material-ui/core/styles";
import { common } from "@material-ui/core/colors";

const themeGreen = '#c4ebd0';
const themeBrown = '#645a47'

export default createMuiTheme({
    palette: {
        primary: {
            main: themeGreen
        },
        text: {
            primary: themeBrown
        }
    },
    typography: {
        fontSize: 13
    },
    overrides: {
        MuiButton: {
            containedPrimary: {
                color: themeBrown
            }
        },
        MuiSvgIcon: {
            colorPrimary: {
                color: themeBrown
            }
        }
    },
    props: {
        MuiTypography: {
            color: 'textPrimary'
        },
        MuiButton: {
            variant: "contained",
            color: "primary",
            disableElevation: true,
        },
        MuiFormControl: {
            variant: "outlined"
        },
        MuiTextField: {
            variant: "outlined"
        },
        MuiPaper: {
            elevation: 0
        }
    }
});
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
    overrides: {
        MuiButton: {
            containedPrimary: {
                color: themeBrown
            }
        }
    },
    props: {
        MuiTypography: {
            color: 'textPrimary'
        },
        MuiSvgIcon: {
            htmlColor: themeBrown
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
        }
    }
});
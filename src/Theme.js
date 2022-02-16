import { createTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import cyan from '@material-ui/core/colors/cyan';

const Theme = createTheme({
    palette: {
        primary: {
            main: cyan['800'],
        },
        secondary: { 
            main: cyan['800']
        } 
    },
});

export default Theme;
import { createMuiTheme, responsiveFontSizes }
    from '@materialui/core/styles';
    
export const theme = responsiveFontSizes(createMuiTheme({

    typography: {
        fontFamily: [ 'Ubuntu',
        'Raleway',
        'Open Sans',
        ].join(','),
        h1: {
            fontSize: '5rem',
            fontFamily: 'Ubuntu',
        }
        ,
        h2: {
            fontSize: '3.5rem',
            fontFamily: 'Ubuntu',
            fontStyle: 'bold',
        }
        ,
        h3: {
            fontSize: '2.5rem',
            fontFamily: 'Ubuntu',
        }
        ,
    },
    palette: {
        background: {
            default: ' #3B3B3B',
        },
        primary: {
        main: '#2B37D4',
        },
        secondary: {
        main: '##00000040',
        },
        error: {
        main: '#D72A2A',
        },
        warning: {
        main: '#FC7B09',
        },
        info: {
        main: '#6B7D6A',
        },
        success: {
        main: '#09FE00',
        },
      
    }    

}));


import { createTheme, ThemeProvider } from '@mui/material/styles';


const ThemeWrapper = ({ children }) => {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#F5CB5C',
                light: '#F5CB5C',
                dark: '#F5CB5C',
                contrastText: '#000',
            },
            secondary: {
                main: '#539C52',
                light: '#539C52',
                dark: '#539C52',
                contrastText: '#fff',
            },
            lightGray: {
                main: '#EFEEEE',
                light: '#EFEEEE',
                dark: '#EFEEEE',
                contrastText: '#000',
            },
            black: {
                main: '#000',
                light: '#000',
                dark: '#000',
                contrastText: '#fff',
            },
            white: {
                main: '#fff',
                light: '#fff',
                dark: '#fff',
                contrastText: '#000',
            },
            darkGreen: {
                main: '#2A3F2E',
                light: '#2A3F2E',
                dark: '#2A3F2E',
                contrastText: '#fff',
            }
        },
        components: {
            MuiTabs: {
                styleOverrides: {
                    root: ({ ownerState, theme }) => ({
                        fontFamily: 'inherit',
                        '& .Mui-selected': {
                            color: `${theme.palette.primary.contrastText}!important`,
                        },
                    }),
                    indicator: ({ ownerState, theme }) => ({
                        backgroundColor: theme.palette.primary.main,
                        mixBlendMode: 'multiply',
                        height: '100%',
                        width: '100%',
                        borderRadius: '0.5rem',
                    }),
                },
            },
            MuiTab: {
                styleOverrides: {
                    root: ({ ownerState, theme }) => ({
                        fontFamily: 'inherit',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: '500',
                        textAlign: 'left',
                        color: theme.palette.primary.contrastText,
                        padding: '0.75rem 1.25rem',
                        justifyContent: 'flex-start',
                        minHeight: '0px',
                    }),
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        fontFamily: 'inherit',
                        textTransform: 'none',
                        padding: '0.75rem 1.25rem',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                    },
                },
            },
            MuiFormControlLabel: {
                styleOverrides: {
                    root: {
                        gap: '0rem',
                    },
                    label: {
                        fontFamily: 'inherit',
                        fontSize: '0.875rem',
                        fontWeight: '400',
                    },
                },
            },
        }
    })

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

export default ThemeWrapper
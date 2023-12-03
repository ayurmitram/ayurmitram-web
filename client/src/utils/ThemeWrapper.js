import { createTheme, ThemeProvider } from '@mui/material/styles';


const ThemeWrapper = ({ children }) => {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#F5CB5C',
                light: '#F5CB5C',
                dark: '#F5CB5C',
                contrastText: '#000',
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
                        fontWeight: '300',
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
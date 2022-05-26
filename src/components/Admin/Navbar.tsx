import React, { useState} from 'react';
import {useHistory} from "react-router-dom";
import {AppBar, Box, Toolbar, Container, Button} from '@material-ui/core'
import {useDispatch} from "react-redux";
import Typography from "@material-ui/core/Typography";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {logout} from "../../actionCreators/authActionCreators";

const Navbar = ({children}) => {
    const {pages} = useTypedSelector(state => state.navbar)
    const {token} = useTypedSelector(state => state.auth)
    const dispatch = useDispatch();
    const history = useHistory()
    const teleport = (to) => {
        history.push(to);
    };
    const exit = () => {
        dispatch(logout())
        teleport('/login')
    }


    return (
        <div>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            onClick={() => teleport('/')}
                            variant="h6"
                            noWrap
                            style={{'cursor': 'pointer'}}
                            component="div"
                        >
                            LOGO
                        </Typography>
                        <Box sx={{flexGrow: 1, display: 'flex'}}>
                            {pages.map((page, key) => (
                                <Button
                                    key={key}
                                    onClick={() => teleport(page.to)}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>
                        {token ?
                            <Typography
                                onClick={() => exit()}
                                variant="h6"
                                noWrap
                                style={{'cursor': 'pointer'}}
                                component="div"
                            >
                                Logout
                            </Typography>
                            :
                            <div>
                                {history.location.pathname !== '/login' &&
                                < Button onClick={() => teleport('login')}>
                                    Login
                                    </Button>
                                }
                                {history.location.pathname !== '/registration' &&
                                <Button onClick={() => teleport('registration')}>
                                    Registration
                                </Button>}
                            </div>
                        }

                    </Toolbar>
                </Container>
            </AppBar>
            {children}
        </div>
    );
};
export default Navbar
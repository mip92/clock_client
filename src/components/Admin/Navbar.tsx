import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {AppBar, Box, Toolbar, Container, Button, IconButton, Menu, MenuItem, makeStyles} from '@material-ui/core'
import {useDispatch} from "react-redux";
import {logout} from "../../actionCreators/authActionCreators";
import Typography from "@material-ui/core/Typography";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {AccountCircle} from "@material-ui/icons";
import {setNavbarPages} from "../../actionCreators/navbarActionCreators";
import ChangeEmail from "../MyWorkplace/ChangeEmail";

const Navbar = () => {
    const useStyles = makeStyles({
        root: {
            cursor: 'pointer'
        },
    });
    const classes = useStyles();
    const {pages} = useTypedSelector(state => state.navbar)
    const {token, role, id} = useTypedSelector(state => state.auth)
    const dispatch = useDispatch();
    const history = useHistory()
    useEffect(() => {
        dispatch(setNavbarPages(role, id))
    }, [role])
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const teleport = (to) => {
        history.push(to);
    };
    const exit = () => {
        dispatch(logout())
        teleport('/login')
    }
    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const changeEmailHandler = () => {
        setAnchorEl(null);
        teleport('/changeEmail')
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            onClick={() => teleport('/')}
                            variant="h6"
                            noWrap
                            className={classes.root}
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
                                className={classes.root}
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
                        {token && (
                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={changeEmailHandler}>Change Email</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};
export default Navbar
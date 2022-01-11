import React from 'react';
import {NavLink, useHistory} from "react-router-dom";
/*

    return (
        <div>

            <NavLink to="/menu/cities">Города</NavLink>
            <NavLink to="/menu/masters">Мастера</NavLink>
            <NavLink to="/menu/users">Пользователи</NavLink>

        </div>
    );
};*/

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {useDispatch} from "react-redux";
import {logout} from "../../actionCreators/adminActionCreators";

const pages = [
    {
        to: '/menu/cities',
        name: 'Города'
    },
    {
        to: '/menu/masters',
        name: 'Мастера'
    },
    {
        to: '/menu/users',
        name: 'Пользователи'
    },
    {
        to: '/menu/orders',
        name: 'Заказы'
    }
];

const Navbar = ({children}) => {
    const dispatch =useDispatch();
    const history = useHistory()

    const teleport = (to) => {
        history.push(to);
    };
    const exit=()=>{
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
                            style={{'cursor':'pointer'}}
                            component="div"
                            sx={{mr: 2, display: 'flex'}}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{flexGrow: 1, display: 'flex'}}>
                            {pages.map((page, key) => (
                                <Button
                                    key={key}
                                    onClick={() => teleport(page.to)}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>
                        <Typography
                            onClick={() =>exit()}
                            variant="h6"
                            noWrap
                            style={{'cursor':'pointer'}}
                            component="div"
                            sx={{mr: 2, display: 'flex'}}
                        >
                            Выйти
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            {children}
        </div>
    );
};
export default Navbar;
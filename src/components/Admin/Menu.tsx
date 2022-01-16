import React from 'react';
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import Navbar from "./Navbar";

const Menu:React.FC = () => {
    const history = useHistory()
    return (
        <Navbar>
            Ресурс недоступен
            <Button onClick={() => history.push('/login')}>Войти</Button>
        </Navbar>
    )
}
export default Menu
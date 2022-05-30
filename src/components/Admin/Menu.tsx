import React from 'react';
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import Navbar from "./Navbar";

const Menu: React.FC = () => {
    const history = useHistory()
    return (
        <Navbar>
            Resource unavailable
            <Button onClick={() => history.push('/login')}>Login</Button>
        </Navbar>
    )
}
export default Menu
import React, {useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {setToken} from "../../actionCreators/adminActionCreators";
import {useDispatch} from "react-redux";
import Cities from "../City/Cities";
import Masters from "./Masters";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import Users from "./Users";

const Menu:React.FC = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setToken())
    }, [])
    const {token} = useTypedSelector(state => state.admin)
    if (token) {history.push('/menu/orders')}
    return (
        <div>
            Ресурс недоступен
            <Button onClick={() => history.push('/login')}>Войти</Button>
        </div>
    )
}
export default Menu
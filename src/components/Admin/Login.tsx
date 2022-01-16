import React, {useEffect} from 'react';
import {Button, Input} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {
    loginAdmin,
    setAdminEmail,
    setAdminPassword
} from "../../actionCreators/adminActionCreators";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import s from "../../style/Login.module.css";
import {useInput} from "../../hooks/useInput";
import {useHistory} from "react-router-dom";

const Login: React.FC = () => {
    let history = useHistory();
    const dispatch = useDispatch()
    const {isFetch, error} = useTypedSelector(state => state.admin)
    const email = useInput('')
    const password = useInput('')
    useEffect(() => {
        dispatch(setAdminEmail(email.value))
    }, [email.value])
    useEffect(() => {
        dispatch(setAdminPassword(email.value))
    }, [password.value])

    const login = async () => {
        await dispatch(loginAdmin(email.value, password.value, history))
    }
    if (isFetch) return (
        <div className={s.wrapper}>
            <div className={s.password}>Загрузка</div>
        </div>
    )
    return (
        <div className={s.wrapper}>
            <Input
                value={email.value}
                onChange={email.onChange}
                placeholder="Email"
                color="primary"
                inputProps={{'aria-label': 'description'}}
                className={s.email}
            />
            <Input
                value={password.value}
                onChange={password.onChange}
                placeholder="Password"
                color="primary"
                inputProps={{'aria-label': 'description'}}
                className={s.password}
            />
            <Button className={s.btn} onClick={() => login()}>Login</Button>
            <div className={s.error}>{error}</div>
        </div>

    );
}
export default Login
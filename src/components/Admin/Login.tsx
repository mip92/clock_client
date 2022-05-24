import React, {useEffect} from 'react';
import {Button, Input} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import s from "../../style/Login.module.css";
import {useInput} from "../../hooks/useInput";
import {useHistory} from "react-router-dom";
import {loginAuth, setAuthEmail} from "../../actionCreators/authActionCreators";

const Login: React.FC = () => {
    const dispatch = useDispatch()
    const {isFetch, error} = useTypedSelector(state => state.auth)
    const email = useInput('')
    const password = useInput('')
    useEffect(() => {
        dispatch(setAuthEmail(email.value))
    }, [email.value])
    /*useEffect(() => {
        dispatch(setAuthPassword(email.value))
    }, [password.value])*/

    const login = async () => {
        await dispatch(loginAuth(email.value, password.value))
    }
    const onKeyDown=(e:React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        if (e.key ==="Enter"){
            e.preventDefault()
            login()
        }
    }
    if (isFetch) return (
        <div className={s.wrapper}>
            <div className={s.password}>Загрузка</div>
        </div>
    )
    return (
        <div className={s.wrapper}>
            <Input
                onKeyDown={(e)=>onKeyDown(e)}
                value={email.value}
                onChange={email.onChange}
                placeholder="Email"
                color="primary"
                inputProps={{'aria-label': 'description'}}
                className={s.email}
            />
            <Input
                onKeyDown={(e)=>onKeyDown(e)}
                value={password.value}
                onChange={password.onChange}
                placeholder="Password"
                color="primary"
                type='password'
                inputProps={{'aria-label': 'description'}}
                className={s.password}
            />
            <Button className={s.btn}  onClick={() => login()}>Login</Button>
            <div className={s.error}>{error}</div>
        </div>
    );
}
export default Login
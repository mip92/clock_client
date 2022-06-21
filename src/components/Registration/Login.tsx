import React, {useEffect, useState} from 'react';
import {Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {loginAuth} from "../../actionCreators/authActionCreators";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import s from "../../style/Login.module.css";
import {useHistory, useParams} from "react-router-dom";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import InputWithError from "./InputWithError";
import Typography from "@material-ui/core/Typography";
import {Role} from "../../enums/Roles";
import {UrlByRole} from "../../enums/RolesUrls2";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});
const formOptions = {resolver: yupResolver(validationSchema)};

const Login: React.FC = () => {
    const history = useHistory();
    let prevLocation;
    history.listen(nextLocation => {
        prevLocation = nextLocation;
    });
    const dispatch = useDispatch()
    const {isFetch, error, role, id} = useTypedSelector(state => state.auth)
    const {key} = useParams<{ key: string }>();
    const {register, handleSubmit, formState: {errors}, setError} = useForm(formOptions);
    const onSubmit = handleSubmit(async data => {
            await dispatch(loginAuth(data.email, data.password))
        }
    );
    useEffect(() => {
        if (error?.param) {
            setError(error.param, {
                type: "server error",
                message: error.msg
            });
        }
    }, [error])

    useEffect(() => {
        if (key && id && role === Role.USER) {
            return history.push(`/rating/${key}`)
        }
        if (id && !key && role) {
            const url = UrlByRole[role]
            if (role===Role.ADMIN) return history.push(url)
            return history.push(url + id)
        }
        //if (prevLocation === '/' && id) return history.push('/')
    }, [id])
    const [isPasswordOpen, setIsPasswordOpen] = useState(true)
    const openHandler = () => {
        setIsPasswordOpen(prevState => !prevState)
    }


    if (isFetch) return (
        <div className={s.wrapper}>
            <div className={s.password}>Loading...</div>
        </div>
    )
    return (
        <form onSubmit={onSubmit} className={s.wrapper}>
            <Typography variant="h6"
                        color={'secondary'}
                        className={s.typography}
            >Authorization</Typography>
            <InputWithError
                cn={s.email}
                type="email"
                placeholder="Email"
                reg={register("email")}
                error={errors.email?.message}/>
            <InputWithError
                cn={s.password}
                type={isPasswordOpen ? "password" : "text"}
                placeholder="Password"
                reg={register("password")}
                error={errors.password?.message}/>
            <div onMouseUp={() => openHandler()}
                 onMouseDown={() => openHandler()}
                 className={s.openFirst}>
                {!isPasswordOpen ? <VisibilityIcon/> : <VisibilityOffIcon/>}
            </div>
            <Button className={s.btn} type='submit'>Login</Button>
        </form>
    );
}
export default Login
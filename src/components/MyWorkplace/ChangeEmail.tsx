import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {changeEmailAuth} from "../../actionCreators/authActionCreators";
import s from "../../style/ChangeEmail.module.css";
import Typography from "@material-ui/core/Typography";
import InputWithError from "../Registration/InputWithError";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const ChangeEmail = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const {isFetch, error, role, token, id} = useTypedSelector(state => state.auth)
    const validationSchema = Yup.object().shape({
        currentEmail: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        newEmail: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });
    const formOptions = {resolver: yupResolver(validationSchema)};
    const {register, handleSubmit, resetField, formState: {errors}, setError} = useForm(formOptions);

    const onSubmit = handleSubmit(async data => {
            await dispatch(changeEmailAuth(data.currentEmail, data.newEmail, data.password, role))
            if (role === "USER") history.push(`/MyOffice/${id}`)
            else if (role === "MASTER") history.push(`/MyOffice/${id}`)
        }
    );

    /*useEffect(()=>{
        if (!error) {
            switch (role) {
                case "ADMIN":
                    return history.push('/menu/orders')
                case "USER":
                    return history.push(`/myOffice/${id}`)
                case "MASTER":
                    return history.push(`/MyWorkplace/${id}`)
            }
        }
    },[id])*/

    useEffect(() => {
        if (error?.param) {
            setError(error.param, {
                type: "server error",
                message: error.msg
            });
        }
    }, [error])

    useEffect(() => {
        resetField("currentEmail")
        resetField("newEmail")
        resetField("password")
    }, [token])

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
            >Change E-Mail</Typography>
            <InputWithError
                cn={s.email}
                type="email"
                placeholder="Current email"
                reg={register("currentEmail")}
                error={errors.currentEmail?.message}/>
            <InputWithError
                cn={s.newEmail}
                type="email"
                placeholder="New email"
                reg={register("newEmail")}
                error={errors.newEmail?.message}/>
            <InputWithError
                cn={s.password}
                type="password"
                placeholder="Password"
                reg={register("password")}
                error={errors.password?.message}/>
            <Button className={s.btn} type='submit'>Change Email</Button>
        </form>
    );
};

export default ChangeEmail;
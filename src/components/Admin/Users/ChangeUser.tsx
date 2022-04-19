import React, {useEffect} from 'react';
import {Button} from "@material-ui/core";
import s from "../../../style/Master.module.css";
import CheckIcon from "@material-ui/icons/Check";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import $api from "../../../http";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import InputWithError from "../../Registration/InputWithError";

const ChangeUser = ({deleteUser, user, activateInput, updateUser, error}) => {
    const validationSchema = Yup.object().shape({
        newEmailOfUser: Yup.string().required('Email is required').email('Email is invalid'),
        newNameOfUser: Yup.string().min(6, 'User name must be longer than 6 characters')
        .required('User name is required'),
    });
    const formOptions = {resolver: yupResolver(validationSchema)};
    const {register, setValue, handleSubmit, watch, formState: {errors}, setError} = useForm(formOptions);
    const onSubmit = handleSubmit(async data => {
            const response = await $api.put(`/users`, {
                    id: user.id,
                    newEmail: data.newEmailOfUser,
                    newName: data.newNameOfUser,
                }
            )
            activateInput(false)
            updateUser({id: response.data.id, email: response.data.email, name: response.data.name})
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
        setValue("newEmailOfUser", user.email, {
            shouldValidate: true,
            shouldDirty: true
        })
        setValue("newNameOfUser", user.name, {
            shouldValidate: true,
            shouldDirty: true
        })
    }, [user])
    return (
        <form onSubmit={onSubmit} className={s.wrapper}>
            <InputWithError
                cn={s.name}
                type="text"
                placeholder="name"
                reg={register("newNameOfUser")}
                error={errors.newNameOfUser?.message}/>
            <InputWithError
                cn={s.email}
                type="email"
                placeholder="email"
                reg={register("newEmailOfUser")}
                error={errors.newEmailOfUser?.message}/>
            <div className={s.role}>
                {user.role}
            </div>

            <Button className={s.btn} style={{cursor: "pointer"}} type='submit'>
                <CheckIcon/>
            </Button>
            <HighlightOffIcon style={{cursor: "pointer"}} onClick={() => deleteUser(user.id)}/>
        </form>
    );
};

export default ChangeUser;
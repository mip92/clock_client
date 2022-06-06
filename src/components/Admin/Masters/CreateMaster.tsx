import React, {useEffect, useState} from 'react';
import s from "../../../style/Master.module.css";
import {Button} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import {addOneMaster, fetchError} from "../../../actionCreators/adminMasterActionCreators";
import {useDispatch} from "react-redux";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import InputWithError from "../../Registration/InputWithError";
import CitiesMultySelect from "../Cities/CitiesMultySelect";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

const validationSchema = Yup.object().shape({
    name: Yup.string().min(6, 'Master name must be longer than 6 characters')
        .required('Master name is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
});
const formOptions = {resolver: yupResolver(validationSchema)};

const CreateMaster = ({cities}) => {
    const {error} = useTypedSelector(state => state.adminMaster);
    const dispatch = useDispatch();
    const [arrayCurrentCities, setArrayCurrentCities] = useState<number[]>([])
    const {register, handleSubmit, formState: {errors}, setError} = useForm(formOptions);
    useEffect(() => {
        if (error?.param) {
            setError(error.param, {
                type: "server error",
                message: error.msg
            });
        }
    }, [error])
    useEffect(() => {
        if (errors.param === 'citiesId' && errors.value !== arrayCurrentCities) {
            dispatch(fetchError(null))
        }
    }, [errors.citiesId])
    const fetch = handleSubmit(async data => {
            dispatch(addOneMaster(data.name, data.email, arrayCurrentCities))
        }
    )
    return (
        <form onSubmit={fetch} className={s.wrapper}>
            <div>
                <InputWithError
                    cn={s.name}
                    type="text"
                    placeholder="Master name"
                    reg={register("name")}
                    error={errors.name?.message}/>
                <InputWithError
                    cn={s.email}
                    type="email"
                    placeholder="Master email"
                    reg={register("email")}
                    error={errors.email?.message}/>
                <div className={s.city}>
                    <CitiesMultySelect cities={cities} setArrayCurrentCities={setArrayCurrentCities}/>
                    <div className={s.error}>{errors.citiesId?.message}</div>
                </div>
                <Button type="submit">
                    <AddCircleOutlineIcon style={{cursor: "pointer"}}/>
                </Button>
            </div>
        </form>
    )
};

export default CreateMaster;

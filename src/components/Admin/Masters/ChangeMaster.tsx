import React, {useContext, useEffect, useState} from 'react';
import s from "../../../style/Master.module.css";
import {Button, Input} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import MyAlert from "../../utilits/MyAlert";
import {changeMaster, fetchError} from "../../../actionCreators/adminMasterActionCreators";
import {MasterContext} from "../../../context/masterContext";
import {useDispatch} from "react-redux";
import CitiesCheckBox from "../Cities/CitiesCheckBox";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import InputWithError from "../../Registration/InputWithError";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

const ChangeMaster = ({master, activateInput, delMaster, newNameOfMaster, newEmailOfMaster}) => {
    const arr = []
    // @ts-ignore
    master.cities.map(c => arr.push(c.id))
    const [arrayCurrentCities, setArrayCurrentCities] = useState<number[]>(arr)
    const dispatch = useDispatch()
    const {cities} = useContext(MasterContext)
    const {error}=useTypedSelector(state => state.adminMaster)
    const validationSchema = Yup.object().shape({
        newNameOfMaster: Yup.string().min(6, 'Master name must be longer than 6 characters')
            .required('Master name is required'),
        newEmailOfMaster: Yup.string().required('Email is required').email('Email is invalid'),
    });
    const formOptions = {resolver: yupResolver(validationSchema)};
    const {register, handleSubmit, setValue, watch, formState: {errors}, setError} = useForm(formOptions);
    useEffect(() => {
        setValue("newNameOfMaster", master.name, {
            shouldValidate: true,
            shouldDirty: true
        })
        setValue("newEmailOfMaster", master.email, {
            shouldValidate: true,
            shouldDirty: true
        })
    }, [master])

    useEffect(() => {
        if (error?.param) {
            setError(error.param, {
                type: "server error",
                message: error.msg
            });
        }
    }, [error])

    const onSubmit = handleSubmit(async data => {
            dispatch(changeMaster(master.id, data.newNameOfMaster, data.newEmailOfMaster, arrayCurrentCities, activateInput))
        }
    )
    useEffect(() => {
        if (error?.param) {
            setError(error.param, {
                type: "server error",
                message: error.msg
            });
        }
    }, [error])

    useEffect(() => {
        if (errors.param = 'citiesId' && errors.value !== arrayCurrentCities) {
            dispatch(fetchError(null))
        }
    }, [arrayCurrentCities])
    return (
        <form onSubmit={onSubmit} className={s.wrapper}>
            <InputWithError
                cn={s.name}
                type="text"
                placeholder="Master name"
                reg={register("newNameOfMaster")}
                error={errors.newNameOfMaster?.message}/>
            <InputWithError
                cn={s.name}
                type="email"
                placeholder="Master email"
                reg={register("newEmailOfMaster")}
                error={errors.newEmailOfMaster?.message}/>
            <div className={s.city}>
                <CitiesCheckBox cities={cities}
                                arrayCurrentCities={arrayCurrentCities}
                                setArrayCurrentCities={setArrayCurrentCities}
                />
                <div>{errors.citiesId?.message}</div>

            </div>
            <Button type="submit">
                <CheckIcon style={{cursor: "pointer"}}/>
            </Button>
            <MyAlert handler={delMaster}
                     text={`Вы точно хотите удалить ${master.name} из списка мастеров`}/>
        </form>
    );
};

export default ChangeMaster;
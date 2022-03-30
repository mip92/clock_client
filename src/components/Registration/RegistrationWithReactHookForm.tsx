import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Button, Checkbox, Input} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import s from "../../style/Registration.module.css";
import Typography from "@material-ui/core/Typography";
import CitiesCheckBox from "../Admin/CitiesCheckBox";
import $api from "../../http";
import {City} from "../../types/mainInterfacesAndTypes";
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useFetching} from "../../hooks/useFetching";

interface Idata {
    citiesId: number[],
    email: string
    isMaster: boolean
    isRulesChecked: boolean
    name: string
    firstPassword: string
    secondPassword: string
}

const RegistrationWithReactHookForm: React.FC = () => {

    const [arrayCurrentCities, setArrayCurrentCities] = useState<number[]>([])
    const [cities, setCities] = useState<City[]>([])
    const [isSeeCities, setIsSeeCities] = useState(false)


    const findCities = async (offset: number, limit: number): Promise<void> => {
        try {
            const response = await $api.get(`/cities?offset=${offset}&limit=${limit}`)
            setCities(response.data.rows)
        } catch (e) {
            const err = JSON.parse(e.request.responseText).message[0]
            console.log(err)
        }
    }
    useEffect(() => {
        findCities(0, 50)
    }, [])

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        name: Yup.string()
            .required('First Name is required'),
        firstPassword: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        secondPassword: Yup.string()
            .oneOf([Yup.ref('firstPassword'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        isRulesChecked: Yup.boolean()
            .oneOf([true],'Rules is required')
    });

    const formOptions = {resolver: yupResolver(validationSchema)};
    const {register, handleSubmit, watch, formState: {errors}} = useForm(formOptions);
    useEffect(() => {
        setIsSeeCities(value => !value)
    }, [watch("isMaster")])

    const [registration, isLoading, error, setError] = useFetching(async (data) => {
        const newData: Idata = {
            citiesId: arrayCurrentCities,
            email: data.email,
            isMaster: data.isMaster,
            isRulesChecked: data.isRulesChecked,
            name: data.name,
            firstPassword: data.firstPassword,
            secondPassword: data.secondPassword
        }
        await $api.post(`/auth/registration/`, newData)
    })

    const onSubmit = handleSubmit(async data =>registration(data));


    return (
        <form onSubmit={onSubmit} className={s.wrapper}>
            <Typography variant="h6"
                        color={'secondary'}
                        className={s.typography}
            >Регистрация</Typography>
            <Input
                placeholder="Email"
                {...register("email")}
                color="primary"
                inputProps={{'aria-label': 'description'}}
                type='email'
                className={s.email}/>
            <Input
                placeholder="Name"
                {...register("name")}
                color="primary"
                inputProps={{'aria-label': 'description'}}
                type='text'
                className={s.name}/>
            <Input
                placeholder="Password"
                {...register("firstPassword")}
                color="primary"
                inputProps={{'aria-label': 'description'}}
                type='password'
                className={s.firstPassword}/>
            <Input
                placeholder="Repeat password"
                {...register("secondPassword")}
                color="primary"
                inputProps={{'aria-label': 'description'}}
                type='password'
                className={s.secondPassword}/>
            <div className={s.checkboxes}>
                <FormControlLabel
                    control={<Checkbox {...register("isRulesChecked")} />}
                    labelPlacement="start"
                    label="Agree with the service rules"/>
                <FormControlLabel
                    control={<Checkbox {...register("isMaster")}/>}
                    label="I am the clock master"
                    labelPlacement="start"
                />
                {isSeeCities && <CitiesCheckBox cities={cities}
                                                arrayCurrentCities={arrayCurrentCities}
                                                setArrayCurrentCities={setArrayCurrentCities}
                />}
            </div>
            <Input type="submit"
                   color='primary'
                   className={s.btn}/>
            <div className={s.error}>
                {errors.email?.message && <p>{errors.email?.message}</p>}
                {errors.name?.message && <p>{errors.name?.message}</p>}
                {errors.firstPassword?.message && <p>{errors.firstPassword?.message}</p>}
                {errors.secondPassword?.message && <p>{errors.secondPassword?.message}</p>}
                {errors.isRulesChecked?.message && <p>{errors.isRulesChecked?.message}</p>}
                <div className={s.error}>{error}</div>
            </div>
        </form>
    );
}
export default RegistrationWithReactHookForm;

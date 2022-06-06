import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Checkbox, Input} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import s from "../../style/Registration.module.css";
import Typography from "@material-ui/core/Typography";
import $api from "../../http";
import {City} from "../../types/mainInterfacesAndTypes";
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch} from "react-redux";
import {IRigistrationData, RigistrationAuth} from "../../actionCreators/authActionCreators";
import {useHistory} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import InputWithError from "./InputWithError";
import CitiesMultySelect from "../Admin/Cities/CitiesMultySelect";
import {UrlByRole} from "../../enums/RolesUrls2";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    name: Yup.string()
        .required('First Name is required')
        .min(6, 'Name must be at least 3 characters'),
    firstPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    secondPassword: Yup.string()
        .oneOf([Yup.ref('firstPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    isRulesChecked: Yup.boolean()
        .oneOf([true], 'Rules is required'),
});
const formOptions = {resolver: yupResolver(validationSchema)};

const Registration: React.FC = () => {
    const {isFetch, error, role, id} = useTypedSelector(state => state.auth)
    const [arrayCurrentCities, setArrayCurrentCities] = useState<number[]>([])
    const [cities, setCities] = useState<City[]>([])
    const [isSeeCities, setIsSeeCities] = useState(false)
    const history = useHistory();
    const findCities = async (offset: number, limit: number): Promise<void> => {
        try {
            const response = await $api.get(`/cities?offset=${offset}&limit=${limit}`)
            setCities(response.data.rows)
        } catch (e) {
            const err = JSON.parse(e.request.responseText).message[0]
        }
    }
    useEffect(() => {
        findCities(0, 50)
    }, [])

    const dispatch = useDispatch()
    const {register, handleSubmit, watch, formState: {errors}, setError} = useForm(formOptions);
    const onSubmit = handleSubmit(async data => {
            const newData: IRigistrationData = {
                citiesId: arrayCurrentCities,
                email: data.email,
                isMaster: data.isMaster,
                isRulesChecked: data.isRulesChecked,
                name: data.name,
                firstPassword: data.firstPassword,
                secondPassword: data.secondPassword
            }
            dispatch(RigistrationAuth(newData))
        }
    );
    useEffect(() => {
        setIsSeeCities(value => !value)
    }, [watch("isMaster")])

    useEffect(() => {
        if (error?.param) {
            setError(error.param, {
                type: "server error",
                message: error.msg
            });
        }
    }, [error])

    useEffect(() => {
        if (id && role) {
            const url = UrlByRole[role]
            return history.push(url + id)
        }
    }, [id])

    if (isFetch) return <div>Loading...</div>
    return (
        <form onSubmit={onSubmit} className={s.wrapper}>
            <Typography variant="h6"
                        color={'secondary'}
                        className={s.typography}
            >Registration</Typography>
            <InputWithError
                cn={s.email}
                type="email"
                placeholder="Email"
                reg={register("email")}
                error={errors.email?.message}/>
            <InputWithError
                cn={s.name}
                type="text"
                placeholder="Name"
                reg={register("name")}
                error={errors.name?.message}/>
            <InputWithError
                cn={s.firstPassword}
                type="password"
                placeholder="Password"
                reg={register("firstPassword")}
                error={errors.firstPassword?.message}/>
            <InputWithError
                cn={s.secondPassword}
                type="password"
                placeholder="Repeat password"
                reg={register("secondPassword")}
                error={errors.secondPassword?.message}/>
            <div className={s.checkboxes}>
                <FormControlLabel
                    control={<Checkbox {...register("isRulesChecked")} />}
                    labelPlacement="start"
                    label={errors.isRulesChecked?.message ?
                        `Agree with the service rules (${errors.isRulesChecked?.message})`
                        : "Agree with the service rules"}/>
                <FormControlLabel
                    control={<Checkbox {...register("isMaster")}/>}
                    label="I am the clock master"
                    labelPlacement="start"
                />
                {isSeeCities && <CitiesMultySelect cities={cities}
                                                   setArrayCurrentCities={setArrayCurrentCities}
                />}
            </div>
            <Input type="submit"
                   color='primary'
                   className={s.btn}/>
        </form>
    );
}
export default Registration;

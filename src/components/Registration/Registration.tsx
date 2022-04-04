import React, {useEffect, useState} from 'react';
import {Button, Input} from "@material-ui/core";
import {useInput} from "../../hooks/useInput";
import s from "../../style/Registration.module.css";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useFetching} from "../../hooks/useFetching";
import $api from "../../http";
import CitiesCheckBox from "../Admin/CitiesCheckBox";
import {City} from "../../types/mainInterfacesAndTypes";
import Typography from "@material-ui/core/Typography";

const initialState: City = {
    cityName: 'Загрузка',
    createdAt: '',
    id: 0,
    updatedAt: '',
    price: 0
}
const Registration: React.FC = () => {
    const email = useInput('')
    const name = useInput('')
    const firstPassword = useInput('')
    const secondPassword = useInput('')
    const [disabledBtn, setDisabledBtn] = useState<boolean>(false)
    const [isRulesChecked, setIsRulesChecked] = useState<boolean>(false)
    const [isMaster, setIsMaster] = useState<boolean>(false)
    const [arrayCurrentCities, setArrayCurrentCities] = useState<number[]>([])
    const [cities, setCities] = useState<City[]>([initialState])
    useEffect(() => {
        setDisabledBtn(false)
        setError("")
    }, [email.value, name.value, firstPassword.value, secondPassword.value, isRulesChecked, isMaster])

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

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            registration()
        }
    }
    const handleChangeCheckBox = (func) => {
        func(prevState => !prevState)
    }

    const [registration, isLoading, error, setError] = useFetching(async () => {
        const res = await $api.post(`/auth/registration/`, {
            firstPassword: firstPassword.value,
            secondPassword: secondPassword.value,
            email: email.value,
            name: name.value,
            isRulesChecked,
            isMaster,
            citiesId: arrayCurrentCities
        })
    })
    return (
        <div>
            <div className={s.wrapper}>
                <Typography variant="h6"
                            color={'secondary'}
                            className={s.typography}
                >Регистрация</Typography>
                <Input
                    onKeyDown={(e) => onKeyDown(e)}
                    value={email.value}
                    onChange={email.onChange}
                    placeholder="Email"
                    color="primary"
                    inputProps={{'aria-label': 'description'}}
                    className={s.email}
                />
                <Input
                    onKeyDown={(e) => onKeyDown(e)}
                    value={name.value}
                    onChange={name.onChange}
                    placeholder="Name"
                    color="primary"
                    inputProps={{'aria-label': 'description'}}
                    className={s.name}
                />
                <Input
                    onKeyDown={(e) => onKeyDown(e)}
                    value={firstPassword.value}
                    onChange={firstPassword.onChange}
                    placeholder="Password"
                    color="primary"
                    type='password'
                    inputProps={{'aria-label': 'description'}}
                    className={s.firstPassword}
                />
                <Input
                    onKeyDown={(e) => onKeyDown(e)}
                    value={secondPassword.value}
                    onChange={secondPassword.onChange}
                    placeholder="Repeat password"
                    color="primary"
                    type='password'
                    inputProps={{'aria-label': 'description'}}
                    className={s.secondPassword}
                />
                <div className={s.checkboxes}>
                    <FormControlLabel
                        value="start"
                        control={<Checkbox checked={isRulesChecked}
                                           onChange={() => handleChangeCheckBox(setIsRulesChecked)}/>}
                        label="Agree with the service rules"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="start"
                        control={<Checkbox checked={isMaster}
                                           onChange={() => handleChangeCheckBox(setIsMaster)}/>}
                        label="I am the clock master"
                        labelPlacement="start"
                    />
                    {isMaster && <CitiesCheckBox cities={cities}
                                                 arrayCurrentCities={arrayCurrentCities}
                                                 setArrayCurrentCities={setArrayCurrentCities}
                    />}
                </div>
                <Button variant="contained"
                        color='primary'
                        className={s.btn}
                        disabled={disabledBtn}
                        onClick={() => registration()}>
                    Registration
                </Button>
                {/*<div className={s.error}>{error}</div>*/}
            </div>
        </div>
    );
};

export default Registration;
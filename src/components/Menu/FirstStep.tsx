import MultilineTextFields from "./MultilineTextFields";
import React, {useContext, useEffect, useState} from "react";
import {Card, Input} from "@material-ui/core";
import ClockSize from "./ClockSize";
import {FormContext} from "../../context/formContext";
import s from "../../style/FirstStep.module.css"
import MyDate from "./MyDate"
import {City} from "../../types/mainInterfacesAndTypes";
import $api from "../../http";
import {useFetching} from "../../hooks/useFetching";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import RegistrationAlert from "./RegistrationAlert";
import {useDispatch} from "react-redux";
import {fetchCities, setCurrentCity, setCurrentTime} from "../../actionCreators/orderActionCreators";

const FirstStep: React.FC = () => {
    const {token} = useTypedSelector(state => state.auth)
    const {cities, currentCity, currentTime, time} = useTypedSelector(state => state.order)
    const dispatch = useDispatch()
    const {
        email,
        name,
    } = useContext(FormContext)

    const initialState: City = {
        cityName: 'Загрузка',
        createdAt: '',
        id: 0,
        updatedAt: '',
        price: 0
    }
    const [error, setError] = useState<boolean | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [openAlert, setOpenAlert] = React.useState(false);

    /*const findCities = async (offset: number, limit: number): Promise<void> => {
        try {
            setLoading(true)
            const response = await $api.get(`/cities?offset=${offset}&limit=${limit}`)
            setCities(response.data.rows)
            setLoading(false)
        } catch (e) {
            const err = JSON.parse(e.request.responseText).message[0]
            setError(err)
            setTimeout(async () => {
                setError(null)
            }, 2000)
        }
    }*/
    useEffect(() => {
        dispatch(fetchCities(0, 50))
    }, [])
    useEffect(() => {
        dispatch(setCurrentCity(cities[0] && cities[0].id))
    }, [cities])



    const [findUser, isLoading, errorfindUser, setUserError] = useFetching(async () => {
        const res = await $api.post(`/users/findUser`, {
            email: email.value,
        })
        console.log(res)
    })
    const [valueChange, setValueChange] = useState<boolean>()

    useEffect(() => {
        setValueChange(true)
        setTimeout(() => {
            setValueChange(false)
        }, 5000)
    }, [email.value])

    useEffect(() => {
        if (!valueChange) findUser()
    }, [valueChange])
    useEffect(() => {
        if (errorfindUser == 'User with this email is already registered' && !token) setOpenAlert(true)
        return () => setOpenAlert(false)
    }, [errorfindUser])


    return (
        <Card className={s.wrapper}>
            <Input
                value={email.value}
                onChange={email.onChange}
                placeholder="Ваша почта"
                color="primary"
                inputProps={{'aria-label': 'description'}}
                className={s.email}
            />
            <Input
                value={name.value}
                onChange={name.onChange}
                placeholder="Ваша имя"
                color="primary"
                inputProps={{'aria-label': 'description'}}
                className={s.name}
            />
            <div className={s.size}>
                <ClockSize/>
            </div>
            <div className={s.city}>
                <MultilineTextFields current={currentCity}
                                     label={"Город"}
                                     cities={cities}/>
            </div>
            <div className={s.date}>
                <MyDate/>
            </div>

            <div className={s.time} style={{
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
                <MultilineTextFields current={currentTime}
                                     label={"Время"}
                                     time={time}/>
            </div>
            <RegistrationAlert open={openAlert}/>
        </Card>
    )
}

export default FirstStep
import MultilineTextFields from "./MultilineTextFields";
import React, {useContext, useEffect, useState} from "react";
import {Card, Input} from "@material-ui/core";
import ClockSize from "./ClockSize";
import {FormContext} from "../../context/formContext";
import s from "../../style/FirstStep.module.css"
import MyDate from "./MyDate"
import {City, Time} from "../../types/mainInterfacesAndTypes";
import $api from "../../http";

const FirstStep: React.FC = () => {
    const {
        currentCity,
        setCurrentCity,
        currentTime,
        setCurrentTime,
        email,
        name,
    } = useContext(FormContext)

    const initialState = {
        cityName: 'Загрузка',
        createdAt: '',
        id: 0,
        updatedAt: ''
    }
    const [error, setError] = useState<boolean | null>(null)
    const [cities, setCities] = useState<City[]>([initialState])
    const [loading, setLoading] = useState<boolean>(false)
    const time: Time[] = [
        {
            "id": 8,
            "time": "8:00",
        },
        {
            "id": 9,
            "time": "9:00",
        },
        {
            "id": 10,
            "time": "10:00",
        },
        {
            "id": 11,
            "time": "11:00",
        },
        {
            "id": 12,
            "time": "12:00",
        },
        {
            "id": 13,
            "time": "13:00",
        },
        {
            "id": 14,
            "time": "14:00",
        },
        {
            "id": 15,
            "time": "15:00",
        },
        {
            "id": 16,
            "time": "16:00",
        },
        {
            "id": 17,
            "time": "17:00",
        },
        {
            "id": 18,
            "time": "18:00",
        },
        {
            "id": 19,
            "time": "19:00",
        },
        {
            "id": 20,
            "time": "20:00",
        },
    ]
    const findCities = async (offset: number, limit: number): Promise<void> => {
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
    }
    useEffect(() => {
        findCities(0, 50)
    }, [])
    useEffect(() => {
        setCurrentCity(cities[0] && cities[0].id)
    }, [cities])
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
                                     setCurrent={setCurrentCity}
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
                                     setCurrent={setCurrentTime}
                                     label={"Время"}
                                     time={time}/>
            </div>
        </Card>
    )
}

export default FirstStep
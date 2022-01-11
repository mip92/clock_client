import MultilineTextFields from "./MultilineTextFields";
import React, {useContext, useEffect, useState} from "react";
import {Card, Input} from "@material-ui/core";
import ClockSize from "./ClockSize";
import {FormContext} from "../../context/formContext";
import s from "../../style/FirstStep.module.css"
import axios from "axios";
import Date from "./Date"
import {ICity} from "../../types/mainInterfaces";


const FirstStep: React.FC = () => {

    const {
        currencyCity,
        setCurrencyCity,
        currencyTime,
        setCurrencyTime,
        email,
        name,
    } = useContext(FormContext)


    const [error, setError] = useState<boolean | null>(null)
    const [cities, setCities] = useState<Array<ICity>>([])
    const [loading, setLoading] = useState<boolean>(false)
    const time = [
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
    const findCities = async (offset:number, limit:number): Promise<void> => {
        try {
            setLoading(true)
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/cities?offset=${offset}&limit=${limit}`)
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
        findCities(0,50)
    }, [])
    useEffect(() => {
        setCurrencyCity(cities[0] && cities[0].id)
    }, [cities])

    //if (!cities) return <div>Загрузка</div>
    return (
        <Card className={s.wrapper}>
            <Input {...email}
                   placeholder="Ваша почта"
                   color="primary"
                   inputProps={{'aria-label': 'description'}}
                   className={s.email}
            />
            <Input {...name}
                   placeholder="Ваша имя"
                   color="primary"
                   inputProps={{'aria-label': 'description'}}
                   className={s.name}
            />
            <div className={s.size}>
                <ClockSize/>
            </div>
            <div className={s.city}>
                {!loading ? <MultilineTextFields currency={currencyCity}
                                                 setCurrency={setCurrencyCity}
                                                 label={"Город"}
                                                 cities={cities}/> : <div>Загрузка</div>}
            </div>
            <div className={s.date}>
                {!loading ? <div>
                        <div style={{
                            textAlign: 'left',
                            color: 'rgba(0, 0, 0, 0.54)',
                            marginBottom: '0px',
                            fontSize: "14px"
                        }}>Дата
                        </div>
                        <Date/>
                    </div>
                    : <div>Загрузка</div>
                }
            </div>

            <div className={s.time} style={{
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
                {!loading ? <MultilineTextFields currency={currencyTime}
                                                 setCurrency={setCurrencyTime}
                                                 label={"Время"}
                                                 time={time}/> : <div>Загрузка</div>}
            </div>
        </Card>
    )
}

export default FirstStep
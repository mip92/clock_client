import {Button, Card, Grid, List, ThemeProvider} from '@material-ui/core';
import {theme} from "../../App";
import Typography from "@material-ui/core/Typography";
import React, {useContext, useState} from "react";
import StepWrapper from "./StepWrapper";
import FirstStep from "./FirstStep";
import s from "../../style/Steper.module.css"
import axios from "axios";
import {FormContext} from "../../context/formContext";
import SecondStep from "./SecondStep";
import {master} from "../../types/adminMasterTypes";
import {useFetching} from "../../hooks/useFetching";


const Steper: React.FC = () => {
    const {
        currencyCity,
        currencyTime,
        clockSize,
        currentMaster,
        email,
        name,
        date
    } = useContext(FormContext)
    const [activeStep, setActiveStep] = useState<number>(0)
    const [masters, setMasters] = useState<Array<master>>([])
    const [chooseAMaster, isLoadingchooseAMaster, errorchooseAMaster] = useFetching(async () => {
        let clock = getKeyByValue(clockSize, true);
        let dateWithTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), currencyTime)

        await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/order/`, {
            email: email.value,
            name: name.value,
            clockSize: clock,
            cityId: currencyCity,
            dateTime: dateWithTime,
            masterId: currentMaster
        })
        setActiveStep(2)
    })
    const [findMaster, isLoadingfindMaster, errorfindMaster] = useFetching(async () => {
        let clock = getKeyByValue(clockSize, true);
        let dateWithTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), currencyTime)


        const res1 = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users`, {
            email: email.value,
            name: name.value
        })
        const res2 = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/masters/getFreeMasters/`, {
            cityId: currencyCity,
            dateTime: dateWithTime,
            clockSize: clock,
        })

        const masters: Array<master> = res2.data
        setMasters(masters)
        setActiveStep(1)
    })
    const back = (): void => {
        setActiveStep(prev => prev - 1)
        if (activeStep <= 0) setActiveStep(0)
    }

    const next = (): void => {
        if (activeStep === 0) {
            // @ts-ignore
            findMaster()
        }
        if (activeStep === 1) {
            // @ts-ignore
            chooseAMaster()
        }
    }

    function getKeyByValue(object: any, value: boolean) {
        let v = Object.keys(object).find(key => object[key] === value);
        if (v === 'small') return 1
        if (v === 'middle') return 2
        if (v === 'big') return 3
    }

    const steps: Array<string> = ["Форма", "Выбор мастере", "Подтверждение заказа"]
    return (
        <div>
            <ThemeProvider theme={theme}>
                <div className={s.main}>
                    <Card className={s.card} variant="outlined">
                        <List className={s.list}>
                            <Typography variant="h6"
                                        color={'secondary'}
                                        className={s.typography}
                            >Заявка на услуги мастера</Typography>
                            <StepWrapper activeStep={activeStep} steps={steps}>
                                {activeStep === 0 && <FirstStep/>}
                                {activeStep === 1 && <SecondStep masters={masters}/>}
                                {activeStep === 2 && <div style={{textAlign: "center"}}>
                                    Вам на почту отправлено письмо, подтвердите заказ мастера
                                </div>}

                            </StepWrapper>
                            <Grid className={s.buttons}>
                                <Button variant="contained"
                                        color='primary'
                                        disabled={activeStep === 0}
                                        onClick={back}>
                                    Назад</Button>
                                <div style={{color: 'red'}}>{errorchooseAMaster || errorfindMaster}</div>
                                <Button variant="contained"
                                        color='primary'
                                        disabled={email.value === '' || name.value === '' || activeStep === 2}
                                        onClick={() => next()}>
                                    Далее</Button>

                            </Grid>
                        </List>
                    </Card>
                </div>
            </ThemeProvider>
        </div>
    );
};
export default Steper
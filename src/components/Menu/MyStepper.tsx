import {Button, Card, Grid, List, ThemeProvider} from '@material-ui/core';
import {theme} from "../../App";
import Typography from "@material-ui/core/Typography";
import React, {useContext, useEffect, useState} from "react";
import StepWrapper from "./StepWrapper";
import FirstStep from "./FirstStep";
import s from "../../style/Steper.module.css"
import {FormContext} from "../../context/formContext";
import SecondStep from "./SecondStep";
import {Master} from "../../types/adminMasterTypes";
import {useFetching} from "../../hooks/useFetching";
import $api from "../../http";
import Registration from "../Registration/Registration";
import {Link} from "react-router-dom";

const MyStepper: React.FC = () => {
    const {
        clockSize,
        currentMaster,
        email,
        name,
        date
    } = useContext(FormContext)
    const [activeStep, setActiveStep] = useState<number>(0)
    const [masters, setMasters] = useState<Array<Master>>([])
    const [chooseAMaster, isLoadingChooseAMaster, errorChooseAMaster, setError] = useFetching(async () => {
        let clock = getKeyByValue(clockSize, true);
        let dateWithTime = new Date(date)
       // dateWithTime.setHours(currentTime)
        dateWithTime.setMinutes(0)
        await $api.post(`/order/`, {
            email: email.value,
            name: name.value,
            clockSize: clock,
            //cityId: currentCity,
            dateTime: dateWithTime,
            masterId: currentMaster
        })
        setActiveStep(2)
    })
    useEffect(() => {
        setError('')
        setFindMasterError('')
    }, [email.value, name.value, clockSize, currentMaster, date])
    const [findMaster, isLoadingMaster, errorfindMaster, setFindMasterError] = useFetching(async () => {
        let clock = getKeyByValue(clockSize, true);
        let dateWithTime = new Date(date)
        //dateWithTime.setHours(currentTime)
        dateWithTime.setMinutes(0)
        const res = await $api.post(`/masters/getFreeMasters/`, {
            //cityId: currentCity,
            dateTime: dateWithTime,
            clockSize: clock,
            email: email.value,
            name: name.value
        })

        const masters: Master[] = res.data
        setMasters(masters)
        setActiveStep(1)
    })
    const back = (): void => {
        setActiveStep(prev => prev - 1)
        if (activeStep <= 0) setActiveStep(0)
    }

    const next = (): void => {
        if (activeStep === 0) {
            findMaster()
        }
        if (activeStep === 1) {
            chooseAMaster()
        }
    }

    function getKeyByValue(object: any, value: boolean) {
        let v = Object.keys(object).find(key => object[key] === value);
        if (v === 'small') return 1
        if (v === 'middle') return 2
        if (v === 'big') return 3
    }

    const steps: string[] = ["Форма", "Выбор мастере", "Подтверждение заказа"]
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
                                {activeStep === 0 && <FirstStep
                                    setMasters={setMasters}
                                    next={next}
                                    tempFiles={tempFiles}
                                    addTempFiles={addTempFiles}/>}
                                {activeStep === 1 && <SecondStep back={back} next={next} masters={masters}/>}
                                {activeStep === 2 && <div style={{textAlign: "center"}}>
                                    Вам на почту отправлено письмо, подтвердите заказ мастера
                                    <Button variant="contained"
                                            color='primary'
                                            onClick={() => setActiveStep(0)}>
                                        На главную</Button>
                                </div>}

                            </StepWrapper>
                            <Grid>
                                {activeStep !== 2 && <div className={s.buttons}>
                                    <Button variant="contained"
                                            color='primary'
                                            disabled={activeStep === 0}
                                            onClick={back}>
                                        Назад</Button>
                                    <div style={{color: 'red'}}>{errorChooseAMaster || errorfindMaster}</div>
                                    <Button variant="contained"
                                            color='primary'
                                            disabled={email.value === '' || name.value === '' || activeStep === 2}
                                            onClick={() => next()}>
                                        Далее</Button>
                                </div>
                                }
                            </Grid>
                        </List>
                    </Card>
                </div>
            </ThemeProvider>
        </div>
    );
};
export default MyStepper
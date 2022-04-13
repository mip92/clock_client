import {Button, Card, Grid, List, ThemeProvider} from '@material-ui/core';
import {theme} from "../../App";
import Typography from "@material-ui/core/Typography";
import React, {useContext, useEffect, useState} from "react";
import StepWrapper from "./StepWrapper";
import s from "../../style/Steper.module.css"
import {FormContext} from "../../context/formContext";
import SecondStep from "./SecondStep";
import {Master} from "../../types/adminMasterTypes";
import {useFetching} from "../../hooks/useFetching";
import $api from "../../http";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import ThirdStep from "./ThirdStep";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FirstStep from "./FirstStep";

const MyStepper: React.FC = () => {
    const {currentMaster, date} = useContext(FormContext)
    const {currentCity, clockSize,dateTime,email,name}=useTypedSelector(state => state.order)
    const [activeStep, setActiveStep] = useState<number>(0)
    const [masters, setMasters] = useState<Array<Master>>([])
    let currentTime
    const [chooseAMaster, isLoadingChooseAMaster, errorChooseAMaster, setChooseAMasterError] = useFetching(async () => {
        await $api.post(`/order/`, {
            email: email,
            name: name,
            clockSize: clockSize,
            cityId: currentCity,
            dateTime: dateTime,
            masterId: currentMaster
        })
        setActiveStep(2)
    })
    useEffect(() => {
        setChooseAMasterError('')
        //setFindMasterError('')
    }, [clockSize, currentCity, currentMaster, currentTime, date])


    /*const [findMaster, isLoadingMaster, errorfindMaster, setFindMasterError] = useFetching(async () => {
        let clock = getKeyByValue(clockSize, true);
        let dateWithTime = new Date(date)
        currentTime && dateWithTime.setHours(currentTime)
        dateWithTime.setMinutes(0)
        const res = await $api.post(`/masters/getFreeMasters/`, {
            cityId: currentCity,
            dateTime: dateWithTime,
            clockSize: clock,
            email: email.value,
            name: name.value
        })

        const masters: Master[] = res.data
        setMasters(masters)
        setActiveStep(1)
    })*/

    const back = (): void => {
        setActiveStep(prev => prev - 1)
        if (activeStep <= 0) setActiveStep(0)
    }

    const next = (): void => {
        if (activeStep === 1) chooseAMaster()
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
                                {activeStep === 0 && <FirstStep setActiveStep={setActiveStep} setMasters={setMasters} />}
                                {activeStep === 1 && <SecondStep masters={masters}/>}
                                {activeStep === 2 && <ThirdStep/>}
                            </StepWrapper>
                            <Grid>
                                {activeStep !== 2 && activeStep !== 0 && <div className={s.buttons}>
                                    <Button variant="contained"
                                            color='primary'
                                            disabled={activeStep === 0}
                                            onClick={back}>
                                        Назад</Button>
                                    <div style={{color: 'red'}}>{errorChooseAMaster}</div>
                                    <Button variant="contained"
                                            color='primary'
                                            disabled={ activeStep === 2}
                                            onClick={() => next()}>
                                        Далее</Button>
                                    {/*<Button title="Submit" onPress={handleSubmit(onSubmit)} />*/}

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
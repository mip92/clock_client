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
import FourthStep from "./FourthStep";
import FirstStep from "./FirstStep";
import axios from "axios";
import {picture} from "../../types/mainInterfacesAndTypes";


const MyStepper: React.FC = () => {
    const {currentMaster, date} = useContext(FormContext)
    const {currentCity, clockSize,dateTime,email,name}=useTypedSelector(state => state.order)
    const [activeStep, setActiveStep] = useState<number>(0)
    const [masters, setMasters] = useState<Array<Master>>([])
    const [tempFiles, addTempFiles] = useState<picture[]>([] as picture[])
    const [error, setError] = useState<boolean>(false)
   /* const [chooseAMaster, isLoadingChooseAMaster, errorChooseAMaster, setChooseAMasterError] = useFetching(async () => {
        setActiveStep(2)
    })*/
    const [orderId, setOrderId]=useState<number>()

    const sendPicture = async (picture) => {
        try {
            const response1 = await $api.post(`/order/`, {
                email: email,
                name: name,
                clockSize: clockSize,
                cityId: currentCity,
                dateTime: dateTime,
                masterId: currentMaster
            })
            setOrderId(response1.data.id)
            let formData = new FormData;
            if (picture) {
                console.log(picture)
                for (let i = 0; i < picture.length; i++) {
                    formData.append(`picture${i}`, picture[i]);
                }
            }
            const response2 = await axios.post(`http://localhost:5000/api/picture/${response1.data.id}`,
                formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
            setActiveStep(2)
        }catch (e) {
            console.log(e)
        }
    }

    /*useEffect(() => {
        //setChooseAMasterError('')
        //setFindMasterError('')
    }, [clockSize, currentCity, currentMaster, dateTime, date])*/

    const back = (): void => {
        setActiveStep(prev => prev - 1)
        if (activeStep <= 0) setActiveStep(0)
    }

    const next = (): void => {
        setActiveStep(prev => prev + 1)
        if (activeStep === 1) sendPicture(tempFiles)
        //else if(activeStep === 2) sendPicture(tempFiles)
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
                                {activeStep === 0 && <FirstStep next={next} setMasters={setMasters}
                                                                tempFiles={tempFiles}
                                                                addTempFiles={addTempFiles}
                                                                />}
                                {activeStep === 1 && <SecondStep next={next} back={back} masters={masters}/>}
                                {activeStep === 2 && <FourthStep orderId={orderId} setActiveStep={setActiveStep}/>}
                            </StepWrapper>
                            <Grid>
                               {/* {activeStep !== 2 && activeStep !== 0 && */}<div className={s.buttons}>
                                    {/*<Button variant="contained"
                                            color='primary'
                                            disabled={activeStep === 0}
                                            onClick={back}>
                                        Назад</Button>
                                    <div style={{color: 'red'}}>{errorChooseAMaster}</div>
                                    <Button variant="contained"
                                            color='primary'
                                            disabled={ activeStep === 3}
                                            onClick={() => next()}>
                                        Далее</Button>*/}
                                    {/*<Button title="Submit" onPress={handleSubmit(onSubmit)} />*/}

                                </div>

                            </Grid>
                        </List>
                    </Card>
                </div>
            </ThemeProvider>
        </div>
    );
};
export default MyStepper
import {Card, Grid, List, ThemeProvider} from '@material-ui/core';
import {theme} from "../../App";
import Typography from "@material-ui/core/Typography";
import React, {useContext, useState} from "react";
import StepWrapper from "./StepWrapper";
import s from "../../style/Steper.module.css"
import {FormContext} from "../../context/formContext";
import SecondStep from "./SecondStep";
import {Master} from "../../types/adminMasterTypes";
import $api from "../../http";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import FourthStep from "./FourthStep";
import FirstStep from "./FirstStep";

const MyStepper: React.FC = () => {
    const {currentMaster} = useContext(FormContext)
    const {currentCity, clockSize, dateTime, email, name} = useTypedSelector(state => state.order)
    const [activeStep, setActiveStep] = useState<number>(0)
    const [masters, setMasters] = useState<Array<Master>>([])
    const [tempFiles, addTempFiles] = useState<File[]>([])
    const [orderId, setOrderId] = useState<number>()
    const [dealPrice, setDealPrice] = useState<number>()

    const sendPicture = async (pictures: File[]) => {
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
            setDealPrice(response1.data.dealPrice)
            let formData = new FormData();
            const fivePicturesOrLess = pictures.slice(0, 5)
            if (fivePicturesOrLess) {
                fivePicturesOrLess.forEach((picture, index) => {
                    formData.append(`picture${index}`, picture);
                })
            }
            await $api.post(`/picture/${response1.data.id}`,
                formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
            setActiveStep(2)
        } catch (e) {
            console.log(e)
        }
    }

    const back = (): void => {
        setActiveStep(prev => prev - 1)
        if (activeStep <= 0) setActiveStep(0)
    }

    const next = (): void => {
        setActiveStep(prev => prev + 1)
        if (activeStep === 1) sendPicture(tempFiles)
    }

    const steps: string[] = ["Form", "Master select", "Confirmation"]
    return (
        <div data-testid="myId">
            <ThemeProvider theme={theme}>
                <div className={s.main}>
                    <Card className={s.card} variant="outlined">
                        <List className={s.list}>
                            <Typography variant="h6"
                                        color={'secondary'}
                                        className={s.typography}
                                        data-testid="Application"
                            >Application for the services of a master</Typography>
                            <StepWrapper activeStep={activeStep} steps={steps}>
                                {activeStep === 0 && <FirstStep data-testid="firstStep" next={next} setMasters={setMasters}
                                                                tempFiles={tempFiles}
                                                                addTempFiles={addTempFiles}
                                />}
                                {activeStep === 1 && <SecondStep data-testid="secondStep" next={next} back={back} masters={masters}/>}
                                {activeStep === 2 && <FourthStep data-testid="thirdStep" dealPrice={dealPrice} orderId={orderId}/>}
                            </StepWrapper>
                        </List>
                    </Card>
                </div>
            </ThemeProvider>
        </div>
    );
};
export default MyStepper
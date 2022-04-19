import React, {useContext} from "react";
import {Button, Card} from "@material-ui/core";
import s from "../../style/SecondStep.module.css"
import {Master} from "../../types/adminMasterTypes";
import FormMaster from "./FormMaster";
import {FormContext} from "../../context/formContext";

interface MastersProps {
    masters: Master[],
    next: Function,
    back: Function
}

const SecondStep: React.FC<MastersProps> = ({masters, next, back}) => {
    const {currentMaster, setCurrentMaster} = useContext(FormContext)
    return (
        <div>
            <Card className={s.wrapper}>
                {masters.map((m, key) => <FormMaster key={key}
                                                     currentMaster={currentMaster}
                                                     setCurrentMaster={setCurrentMaster} master={m}

                />)}

            </Card>
            <div className={s.buttons}>
                <Button variant="contained"
                        color='primary'
                        onClick={() => back()}>
                    Назад</Button>
                <div style={{color: 'red'}}></div>
                <Button variant="contained"
                        color='primary'
                        onClick={() => next()}>
                    Далее</Button>
            </div>
        </div>
    )
}

export default SecondStep
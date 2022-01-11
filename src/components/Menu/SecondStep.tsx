import React, {useContext} from "react";
import {Card} from "@material-ui/core";
import s from "../../style/SecondStep.module.css"
import {master} from "../../types/adminMasterTypes";
import FormMaster from "./FormMaster";
import {FormContext} from "../../context/formContext";

interface mastersProps {
    masters: Array<master>
}
const SecondStep: React.FC<mastersProps> = ({masters}) => {
    const {currentMaster, setCurrentMaster}=useContext(FormContext)
    return (
        <Card className={s.wrapper}>
            {masters.map((m,key)=><FormMaster key={key}
                                              currentMaster={currentMaster}
                                              setCurrentMaster={setCurrentMaster} master={m}/>)}
        </Card>
    )
}

export default SecondStep
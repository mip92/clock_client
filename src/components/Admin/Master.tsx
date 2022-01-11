import React, {useContext, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {master} from "../../types/adminMasterTypes";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CachedIcon from '@material-ui/icons/Cached';
import CheckIcon from '@material-ui/icons/Check';
import s from "../../style/Master.module.css"
import {Input} from "@material-ui/core";
import {useInput} from "../../hooks/useInput";
import {changeMaster, delOneMaster} from "../../actionCreators/adminMasterActionCreators";
import MultilineTextFields from "../Menu/MultilineTextFields";
import {MasterContext} from "../../context/masterContext";
import MyAlert from "../utilits/Alert";

interface masterProps {
    master: master,
    currentPage: number
}

const Master: React.FC<masterProps> = ({master,currentPage}) => {
    const {cities} = useContext(MasterContext)
    const [currency, setCurrency] = React.useState(1);
    const [isInputActivate, activateInput] = useState(false)
    const newNameOfMaster = useInput('')
    const newEmailOfMaster = useInput('')
    const dispatch = useDispatch()

    const delMaster = () => {
        dispatch(delOneMaster(master.id))
    }
    const constChangeMasterName = () => {
        newNameOfMaster.change(master.name)
        newEmailOfMaster.change(master.email)
        activateInput(true)
    }
    const cnangeMasterEventListener = () => {
        dispatch(changeMaster(master.id, newNameOfMaster.value, newEmailOfMaster.value, currency))
        activateInput(false)
    }
    useEffect(()=>{
        activateInput(false)
    },[currentPage])
    if (!master.cities) {
        return <div>Загрузка</div>
    }
    if (!isInputActivate) {
        return (
            <div>
                <div className={s.wrapper}>
                    <div>{master.name}</div>
                    <div>{master.email}</div>
                    <div>{master.cities.map((c, key) => <div key={key}>{c.city_name}</div>)}</div>
                    <CachedIcon onClick={constChangeMasterName} style={{cursor: "pointer"}}/>
                    <MyAlert handler={delMaster}
                             text={`Вы точно хотите удалить ${master.name} из списка мастеров`}/>
                </div>
            </div>
        )
            ;
    } else
        return (
            <div className={s.wrapper}>
                <Input {...newNameOfMaster}
                       placeholder="Новое имя мастера"
                       color="primary"
                       inputProps={{'aria-label': 'description'}}
                       className={s.name}
                />
                <Input {...newEmailOfMaster}
                       placeholder="Новоя почта мастера"
                       color="primary"
                       inputProps={{'aria-label': 'description'}}
                       className={s.name}
                />
                <div className={s.city}>
                    <MultilineTextFields currency={currency}
                                         setCurrency={setCurrency}
                                         label={''}
                                         cities={cities}/>
                </div>
                <CheckIcon onClick={cnangeMasterEventListener} style={{cursor: "pointer"}}/>
                <MyAlert handler={delMaster}
                         text={`Вы точно хотите удалить ${master.name} из списка мастеров`}/>
            </div>
        );
}
export default Master
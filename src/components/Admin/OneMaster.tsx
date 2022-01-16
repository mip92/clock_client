import React, {useContext, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {Master} from "../../types/adminMasterTypes";
import CachedIcon from '@material-ui/icons/Cached';
import CheckIcon from '@material-ui/icons/Check';
import s from "../../style/Master.module.css"
import {Input} from "@material-ui/core";
import {useInput} from "../../hooks/useInput";
import {changeMaster, delOneMaster} from "../../actionCreators/adminMasterActionCreators";
import MultilineTextFields from "../Menu/MultilineTextFields";
import {MasterContext} from "../../context/masterContext";
import MyAlert from "../utilits/MyAlert";

interface MasterProps {
    master: Master,
    currentPage: number
}

const OneMaster: React.FC<MasterProps> = ({master, currentPage}) => {
    const {cities} = useContext(MasterContext)
    const [current, setCurrent] = useState(1);
    const [isInputActivate, activateInput] = useState(false)
    const newNameOfMaster = useInput('')
    const newEmailOfMaster = useInput('')
    const dispatch = useDispatch()
    const delMaster = () => {
        dispatch(delOneMaster(master.id))
    }
    const constChangeMasterName = () => {
        newNameOfMaster.changeInput(master.name)
        newEmailOfMaster.changeInput(master.email)
        activateInput(true)
    }
    const cnangeMasterEventListener = () => {
        dispatch(changeMaster(master.id, newNameOfMaster.value, newEmailOfMaster.value, current))
        activateInput(false)
    }
    useEffect(() => {
        activateInput(false)
    }, [currentPage])
    if (!master.cities) {
        return <div>Загрузка</div>
    }
    if (!isInputActivate) {
        return (
            <div>
                <div className={s.wrapper}>
                    <div>{master.name}</div>
                    <div>{master.email}</div>
                    <div>{master.cities.map((c, key) => <div key={key}>{c.cityName}</div>)}</div>
                    <CachedIcon onClick={constChangeMasterName} style={{cursor: "pointer"}}/>
                    <MyAlert handler={delMaster}
                             text={`Вы точно хотите удалить ${master.name} из списка мастеров`}/>
                </div>
            </div>
        );
    } else
        return (
            <div className={s.wrapper}>
                <Input
                    value={newNameOfMaster.value}
                    onChange={newNameOfMaster.onChange}
                    placeholder="Новое имя мастера"
                    color="primary"
                    inputProps={{'aria-label': 'description'}}
                    className={s.name}
                />
                <Input value={newEmailOfMaster.value}
                       onChange={newEmailOfMaster.onChange}
                       placeholder="Новоя почта мастера"
                       color="primary"
                       inputProps={{'aria-label': 'description'}}
                       className={s.name}
                />
                <div className={s.city}>
                    <MultilineTextFields current={current}
                                         setCurrent={setCurrent}
                                         label={''}
                                         cities={cities}/>
                </div>
                <CheckIcon onClick={cnangeMasterEventListener} style={{cursor: "pointer"}}/>
                <MyAlert handler={delMaster}
                         text={`Вы точно хотите удалить ${master.name} из списка мастеров`}/>
            </div>
        );
}
export default OneMaster
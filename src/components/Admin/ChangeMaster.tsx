import React, {useContext, useState} from 'react';
import s from "../../style/Master.module.css";
import {Input} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import MyAlert from "../utilits/MyAlert";
import {changeMaster} from "../../actionCreators/adminMasterActionCreators";
import {MasterContext} from "../../context/masterContext";
import {useDispatch} from "react-redux";
import CitiesCheckBox from "./CitiesCheckBox";

const ChangeMaster = ({master, activateInput, delMaster, newNameOfMaster, newEmailOfMaster}) => {
    const arr =[]
    // @ts-ignore
    master.cities.map(c=>arr.push(c.id))
    const [arrayCurrentCities, setArrayCurrentCities]=useState<number[]>(arr)
    const dispatch = useDispatch()
    const {cities} = useContext(MasterContext)
    const cnangeMasterEventListener = () => {
        dispatch(changeMaster(master.id, newNameOfMaster.value, newEmailOfMaster.value, arrayCurrentCities))
        activateInput(false)
    }
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
                <CitiesCheckBox cities={cities}
                                arrayCurrentCities={arrayCurrentCities}
                                setArrayCurrentCities={setArrayCurrentCities}
                />
                {/*<MultilineTextFields current={current}
                                     setCurrent={setCurrent}
                                     label={''}
                                     cities={cities}/>*/}
            </div>
            <CheckIcon onClick={cnangeMasterEventListener} style={{cursor: "pointer"}}/>
            <MyAlert handler={delMaster}
                     text={`Вы точно хотите удалить ${master.name} из списка мастеров`}/>
        </div>
    );
};

export default ChangeMaster;
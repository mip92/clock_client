import React from 'react';
import {Master} from "../../types/adminMasterTypes";
import s from "../../style/FormMaster.module.css";
import {Card} from "@material-ui/core";

interface MasterProps {
    master: Master,
    setCurrentMaster: (arg0: number)=>void,
    currentMaster:number
}

const FormMaster: React.FC<MasterProps> = ({master, setCurrentMaster, currentMaster}) => {
    return (
        <Card className={s.wrapper} onClick={()=>setCurrentMaster(master.id)} style={currentMaster===master.id ? {background: '#ffe0b2'}:{background:'white'}}>
            <div>Имя: {master.name}</div>
            <div>Почта: {master.email}</div>
            <div>Рейтинг: {master.rating}</div>
        </Card>
    );
};

export default FormMaster
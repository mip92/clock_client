import React, {useEffect, useState} from 'react';
import {Master} from "../../types/adminMasterTypes";
import s from "../../style/FormMaster.module.css";
import {Card} from "@material-ui/core";
import MyModal from "../utilits/MyModal";
import Ratings from "./Ratings";


interface MasterProps {
    master: Master,
    setCurrentMaster: (arg0: number) => void,
    currentMaster: number
}

const FormMaster: React.FC<MasterProps> = ({master, setCurrentMaster, currentMaster}) => {

    return (
        <div className={s.wrapper}>
        <Card className={s.masterInfo} onClick={() => setCurrentMaster(master.id)}
              style={currentMaster === master.id ? {background: '#ffe0b2'} : {background: 'white'}}>
            <div>Name: {master.name}</div>
            <div>E-Mail: {master.email}</div>
            <div>Rating: {master.rating}</div>
        </Card>
            <div className={s.comments}>
                <MyModal name="Comments">
                    <Ratings masterId={master.id}/>
                </MyModal>
            </div>
        </div>
    );
};

export default FormMaster
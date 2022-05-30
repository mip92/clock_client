import React, {useEffect, useState} from 'react';
import {Master} from "../../types/adminMasterTypes";
import s from "../../style/FormMaster.module.css";
import {Card} from "@material-ui/core";
import {useFetching} from "../../hooks/useFetching";
import $api from "../../http";
import Ratings from "./Rating/Ratings";
import MyModal from "../utilits/MyModal";

interface MasterProps {
    master: Master,
    setCurrentMaster: (arg0: number) => void,
    currentMaster: number
}

interface AxiosGetRating {
    averageRating: null | number
    masterId: string
}

const FormMaster: React.FC<MasterProps> = ({master, setCurrentMaster, currentMaster}) => {
    const [masterRating, setMasterRating] = useState<number | null>(0)
    console.log(masterRating)
    const [fetching, isFetch, error] = useFetching(async () => {
        const response = await $api.get<AxiosGetRating>(`/rating/${master.id}`)
        response.data.averageRating === null ? setMasterRating(0) : setMasterRating(response.data.averageRating)
    })

    useEffect(() => {
        fetching()
    }, [])
    return (
        <div className={s.wrapper}>
            <Card className={s.masterInfo} onClick={() => setCurrentMaster(master.id)}
                  style={currentMaster === master.id ? {background: '#ffe0b2'} : {background: 'white'}}>
                <div>Name: {master.name}</div>
                <div>E-Mail: {master.email}</div>
                {isFetch ? <div>Loading...</div> : <div>Rating: {masterRating}</div>}

            </Card>
            <div className={s.comments}>
                <MyModal name='Comments' >
                    <Ratings masterId={master.id}/>
                </MyModal>
            </div>
        </div>
    );
};

export default FormMaster
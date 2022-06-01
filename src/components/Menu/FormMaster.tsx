import React, {useEffect, useState} from 'react';
import {Master} from "../../types/adminMasterTypes";
import s from "../../style/FormMaster.module.css";
import {Card} from "@material-ui/core";
import MyModal from "../utilits/MyModal";
import Ratings from "./Ratings";
import {useFetching} from "../../hooks/useFetching";
import $api from "../../http";


interface MasterProps {
    master: Master,
    setCurrentMaster: (arg0: number) => void,
    currentMaster: number
}

interface RatingResponse {
    averageRating: number
    masterId: number
}

const FormMaster: React.FC<MasterProps> = ({master, setCurrentMaster, currentMaster}) => {
const [rating, setRating]=useState<number>(0)
    const [fetching, isFetch, error] = useFetching(async () => {
        const response = await $api.get<RatingResponse>(`/rating/${master.id}`)
        response.data.averageRating ? setRating(response.data.averageRating) : setRating(0)
    })

    useEffect(()=>{
        fetching()
    },[])
    return (
        <div className={s.wrapper}>
        <Card className={s.masterInfo} onClick={() => setCurrentMaster(master.id)}
              style={currentMaster === master.id ? {background: '#ffe0b2'} : {background: 'white'}}>
            <div>Name: {master.name}</div>
            <div>E-Mail: {master.email}</div>
            <div>Rating: {rating}</div>
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
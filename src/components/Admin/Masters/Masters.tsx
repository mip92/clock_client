import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import s from "../../../style/Master.module.css";
import {Input} from "@material-ui/core";
import {addOneMaster, setMaster, setMasterName} from "../../../actionCreators/adminMasterActionCreators";
import {Master} from "../../../types/adminMasterTypes";
import MyModal from "../../utilits/MyModal";
import {City} from "../../../types/mainInterfacesAndTypes";
import $api from "../../../http";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {usePaginatorWithRedux} from "../../../hooks/usePaginatorWithRedux";
import CreateMaster from "./CreateMaster";
import OneMaster from "./OneMaster";

interface MastersProps {
    cities: City[],
    isFetch: boolean
}

const Masters: React.FC<MastersProps> = ({isFetch, cities}) => {
    const {masters} = useTypedSelector(state => state.adminMaster)
    const dispatch = useDispatch()
    const {offset, limit, handleChange, changePage, currentPage, isLoading, error, pagesArray, fetching} = usePaginatorWithRedux(async () => {
        return await $api.get(`/masters?offset=${offset}&limit=${limit}`)
    }, setMaster)
    useEffect(() => {
        fetching()
    }, [limit, currentPage])

    useEffect(() => {
        return () => {
            dispatch(setMasterName(''))
        };
    }, [])
    if (isFetch || !cities || isLoading) return <div>Загрузка</div>

    return (
        <div>
            <h3>Список мастеров</h3>
            <div>
                <div className={s.wrapper}>
                    <div>Имя мастера</div>
                    <div>Почта</div>
                    <div>Города</div>
                    <div>Изменить</div>
                    <div>Удалить</div>
                    <div>Подтвержден</div>
                </div>
                {masters && masters.map((m: Master, key: React.Key | null | undefined) =>
                    <OneMaster key={key}
                               master={m}
                               currentPage={currentPage}/>)}
                {pagesArray.map((p: number, key: React.Key) => <span
                    className={currentPage === p ? s.page_current : s.page}
                    key={key}
                    onClick={() => changePage(p)}
                >{p}</span>)}
                <span style={{marginLeft: 30, padding: 5}}>Лимит</span>
                <Input
                    style={{width: 20}}
                    value={limit}
                    onChange={handleChange}
                    placeholder="Мастеров в поле"
                    color="primary"
                    inputProps={{'aria-label': 'description'}}
                />
            </div>
            <MyModal name='Добавить мастера'>
                <CreateMaster cities={cities}/>
            </MyModal>
        </div>
    );
}
export default Masters
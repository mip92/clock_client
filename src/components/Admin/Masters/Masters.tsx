import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import s from "../../../style/Master.module.css";
import {setMaster, setMasterName} from "../../../actionCreators/adminMasterActionCreators";
import {Master} from "../../../types/adminMasterTypes";
import MyModal from "../../utilits/MyModal";
import {City} from "../../../types/mainInterfacesAndTypes";
import $api from "../../../http";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

import CreateMaster from "./CreateMaster";
import OneMaster from "./OneMaster";
import {usePaginatorWithReduxLimit} from "../../../hooks/usePaginatorWithReduxLimit";
import {Button, Input} from "@material-ui/core";
import CitiesMultySelect from "../Cities/CitiesMultySelect";

interface MastersProps {
    cities: City[],
    isFetch: boolean
}

const Masters: React.FC<MastersProps> = ({isFetch, cities}) => {
    const {masters} = useTypedSelector(state => state.adminMaster)
    const dispatch = useDispatch()
    const {
        offset,
        changePage,
        currentPage,
        isLoading,
        error,
        pagesArray,
        fetching,
        limitArray,
        currentLimit,
        changeLimit,
        setSortBy,
        sortBy,
        setSelect,
        select
    } = usePaginatorWithReduxLimit(async () => {
        return await $api.get(`/masters?offset=${offset}&limit=${currentLimit}&sortBy=${sortBy}&select=${select}&cities=${currentArray}&filter=${inputValue}`)
    }, setMaster)
    const [currentArray, setArrayCurrentCities] = useState<number[]>([])
    useEffect(() => {
        fetching()
    }, [currentLimit, currentPage, sortBy, select])

    useEffect(() => {
        return () => {
            dispatch(setMasterName(''))
        };
    }, [])


    const sortHandler = (value: string) => {
        if (value === sortBy) select == "ASC" ? setSelect("DESC") : setSelect("ASC")
        setSortBy(value)
    }
    const [inputValue, setInputValue]=useState<string>('')

    if (isFetch || !cities || isLoading) return <div>Загрузка</div>
    return (
        <div>
            <h3>Список мастеров</h3>
            <div>
                <CitiesMultySelect cities={cities} setArrayCurrentCities={setArrayCurrentCities}/>
                <Input value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
                <Button onClick={()=>fetching()}>Выбрать фильтры</Button>
            <div className={s.wrapper}>
                <Button onClick={() => sortHandler('name')}>Имя мастера</Button>
                <Button onClick={() => sortHandler('email')}>Почта</Button>
                <div>Города</div>
                <div>Изменить</div>
                <div>Удалить</div>
                <Button onClick={() => sortHandler("isApproved")}>Подтверждение</Button>
            </div>
            {masters && masters.map((m: Master, key: React.Key | null | undefined) =>
                <OneMaster key={key}
                           master={m}
                           currentPage={currentPage}/>)}
        </div>
    {
        pagesArray.map((p: number, key: React.Key) => <span
            className={currentPage === p ? s.page_current : s.page}
            key={key}
            onClick={() => changePage(p)}
        >{p}</span>)
    }
    <span style={{marginLeft: 30, padding: 5}}>Лимит</span>

    {
        limitArray.map((l, key: React.Key) => <span
            className={currentLimit === l ? s.page_limit : s.limit}
            key={key}
            onClick={() => changeLimit(l)}
        >{l}</span>)
    }
    <div className={s.button}>
        <MyModal name='Добавить мастера'>
            <CreateMaster cities={cities}/>
        </MyModal>
    </div>
</div>
)
    ;
}
export default Masters
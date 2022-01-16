import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import OneMaster from "./OneMaster"
import s from "../../style/Master.module.css";
import {Input} from "@material-ui/core";
import {useInput} from "../../hooks/useInput";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {addOneMaster, setMasterName} from "../../actionCreators/adminMasterActionCreators";
import MultilineTextFields from "../Menu/MultilineTextFields";
import {usePaginator} from "../../hooks/usePaginator";
import axios from "axios";
import {Master} from "../../types/adminMasterTypes";
import MyModal from "../utilits/MyModal";
import {City} from "../../types/mainInterfacesAndTypes";

interface MastersProps {
    cities: City[],
    isFetch: boolean
}

const Masters: React.FC<MastersProps> = ({isFetch,cities}) => {
    const [current, setCurrent] = useState(1);
    const newMasterName = useInput('')
    const newMasterEmail = useInput('')
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setMasterName(newMasterName.value))
    }, [newMasterName.value])
    useEffect(() => {
        setCurrent(cities[0] && cities[0].id)
    }, [cities])
    const addMaster = () => {
        dispatch(addOneMaster(newMasterName.value, newMasterEmail.value, current))
        newMasterName.changeInput('')
        newMasterEmail.changeInput('')
        setCurrent(1)
    }
    const [offset, limit, handleChange, changePage, currentPage, masters, isLoading, error, pagesArray, getMasters] = usePaginator(async () => {
        return await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/masters?offset=${offset}&limit=${limit}`)
    })
    useEffect(() => {
        getMasters()
    }, [limit, currentPage])
    useEffect(()=>{
        return () => {
            setCurrent(1);
            dispatch(setMasterName(''))
        };
    })
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
                </div>
                {masters && masters.map((m: Master, key: React.Key | null | undefined) => <OneMaster key={key}
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
                <div className={s.wrapper}>
                    <div>
                        <Input
                            value={newMasterName.value}
                            onChange={newMasterName.onChange}
                            placeholder="Имя мастера"
                            color="primary"
                            inputProps={{'aria-label': 'description'}}
                            className={s.name}
                        />
                        <Input
                            value={newMasterEmail.value}
                            onChange={newMasterEmail.onChange}
                            placeholder="Почта мастера"
                            color="primary"
                            inputProps={{'aria-label': 'description'}}
                            className={s.name}
                        />
                        <div className={s.city}>
                            <MultilineTextFields current={current}
                                                 setCurrent={setCurrent}
                                                 label={"Город"}
                                                 cities={cities}/>
                        </div>
                    </div>
                    <AddCircleOutlineIcon style={{cursor: "pointer"}} onClick={addMaster}/>
                </div>
            </MyModal>

        </div>
    );
}
export default Masters
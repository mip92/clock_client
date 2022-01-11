import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import Master from "./Master"
import s from "../../style/Master.module.css";
import {Input} from "@material-ui/core";
import {useInput} from "../../hooks/useInput";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {addOneMaster, setMasterName} from "../../actionCreators/adminMasterActionCreators";
import MultilineTextFields from "../Menu/MultilineTextFields";
import {city} from "../../types/adminCityTypes";
import {usePaginator} from "../../hooks/usePaginator";
import axios from "axios";
import {master} from "../../types/adminMasterTypes";
import {ICities} from "../../types/mainInterfaces";
import MyModal from "../utilits/MyModal";

interface MastersListProps {
    cities: Array<ICities>,
    isFetch: boolean
}

const Masters: React.FC<MastersListProps> = ({cities, isFetch}) => {
    const [currency, setCurrency] = React.useState(1);
    const newMasterName = useInput('')
    const newMasterEmail = useInput('')
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setMasterName(newMasterName.value))
    }, [newMasterName.value])
    useEffect(() => {
        setCurrency(cities[0] && cities[0].id)
    }, [cities])
    const addMaster = () => {
        dispatch(addOneMaster(newMasterName.value, newMasterEmail.value, currency))
        newMasterName.change('')
        newMasterEmail.change('')
        setCurrency(1)
    }
    const [offset, limit, handleChange, changePage, currentPage, masters, isLoading, error, pagesArray, getMasters] = usePaginator(async () => {
        return await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/masters?offset=${offset}&limit=${limit}`)
    })
    useEffect(() => {
        getMasters()
    }, [limit, currentPage])

    if (isFetch || !cities) return <div>Загрузка</div>
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
                {masters && masters.map((m: master, key: React.Key | null | undefined) => <Master key={key}
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
                        <Input {...newMasterName}
                               placeholder="Имя мастера"
                               color="primary"
                               inputProps={{'aria-label': 'description'}}
                               className={s.name}
                        />
                        <Input {...newMasterEmail}
                               placeholder="Почта мастера"
                               color="primary"
                               inputProps={{'aria-label': 'description'}}
                               className={s.name}
                        />
                        <div className={s.city}>
                            <MultilineTextFields currency={currency}
                                                 setCurrency={setCurrency}
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
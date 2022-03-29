import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import OneCity from "./OneCity"
import {addOneCity, fetchCities, setCityName} from "../../actionCreators/adminCityActionCreators";
import s from "../../style/Cities.module.css";
import {Input} from "@material-ui/core";
import {useInput} from "../../hooks/useInput";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MyModal from "../utilits/MyModal";
import Navbar from '../Admin/Navbar';

const Cities: React.FC = () => {
    const {cities, pagesArray} = useTypedSelector(state => state.adminCity)
    const newCity = useInput('')
    const dispatch = useDispatch()
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState<number>(0)

    const handlerChangePrice = (e) => {
        if (e.target.value < 1) setPrice(1)
        else setPrice(e.target.value)
    }
    useEffect(() => {
        dispatch(fetchCities(offset, limit))
    }, [currentPage, limit])
    useEffect((): void => {
        dispatch(setCityName(newCity.value))
    }, [newCity.value])
    const addCity = (): void => {
        dispatch(addOneCity(newCity.value, price))
        newCity.changeInput('')
    }
    const changePage = (page: number) => {
        setOffset(page * limit - limit)
        setCurrentPage(page)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(event.target.value) === 0) setLimit(10)
        else setLimit(Number(event.target.value));
    };

    return (
        <div>
            <h3>Список городов</h3>
            <div className={s.title}>
                <div>Название города</div>
                <div>Цена за час</div>
                <div>Редактировать</div>
                <div>Удалить</div>
            </div>
            <div>
                {cities && cities.map((c, key) => <OneCity currentPage={currentPage} key={key} city={c}/>)}
                <div className={s.page_wrapper}>
                    {pagesArray.map((p, key) => <span
                        className={currentPage === p ? s.page_current : s.page}
                        key={key}
                        onClick={() => changePage(p)}
                    >{p}</span>)}
                    <span style={{marginLeft: 30, padding: 5}}>Лимит</span>
                    <Input
                        style={{width: 20}}
                        value={limit}
                        onChange={handleChange}
                        placeholder="Городов в поле"
                        color="primary"
                        inputProps={{'aria-label': 'description'}}
                    />
                </div>
            </div>
            <MyModal name='Добавить город'>
                <div className={s.wrapper}>
                    <div>
                        <Input value={newCity.value}
                               onChange={newCity.onChange}
                               placeholder="Название города"
                               color="primary"
                               inputProps={{'aria-label': 'description'}}
                               className={s.name}
                        />
                        <Input value={price}
                               onChange={(e) => handlerChangePrice(e)}
                               type='number'
                               placeholder="Цена за час"
                               color="primary"
                               inputProps={{'aria-label': 'description'}}
                               className={s.name}
                        />
                    </div>
                    <AddCircleOutlineIcon style={{cursor: "pointer"}} onClick={addCity}/>
                </div>
            </MyModal>
        </div>
    );
}
export default Cities
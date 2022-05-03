import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import OneCity from "./OneCity"
import {fetchCities} from "../../../actionCreators/adminCityActionCreators";
import s from "../../../style/Cities.module.css";
import {Input} from "@material-ui/core";
import MyModal from "../../utilits/MyModal";
import AddCity from './AddCity';


const Cities: React.FC = () => {
    const {cities, pagesArray} = useTypedSelector(state => state.adminCity)
    const dispatch = useDispatch()
    const [offset, setOffset] = useState<number>(0)
    const [limit, setLimit] = useState<number>(5)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [isOpen ,setIsOpen]=useState<boolean>(false)

    useEffect(() => {
        dispatch(fetchCities(offset, limit))
    }, [currentPage, limit])

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
                {cities && cities.map((c, key) => <OneCity isOpen={isOpen} setIsOpen={setIsOpen} currentPage={currentPage} key={key} city={c}/>)}
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
                <AddCity/>
            </MyModal>
        </div>
    );
}
export default Cities
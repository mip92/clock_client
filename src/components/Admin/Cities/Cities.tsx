import React, {useEffect} from 'react';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import OneCity from "./OneCity"
import {setCities} from "../../../actionCreators/adminCityActionCreators";
import s from "../../../style/Cities.module.css";
import {Button, Input} from "@material-ui/core";
import MyModal from "../../utilits/MyModal";
import AddCity from './AddCity';
import {usePaginatorWithReduxLimit} from "../../../hooks/usePaginatorWithReduxLimit";
import $api from "../../../http";
import {useDispatch} from "react-redux";
import ColumnButton from "../ColumnButton";


const Cities: React.FC = () => {
    const dispatch = useDispatch()
    const {cities} = useTypedSelector(state => state.adminCity)
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
        sortBy,
        select,
        inputValue,
        setInputValue,
        sortHandler
    } = usePaginatorWithReduxLimit(async () => {
        return await $api.get(`/cities?offset=${offset}&limit=${currentLimit}&sortBy=${sortBy}&select=${select}&filter=${inputValue}`)
    }, setCities, "cityName")
    useEffect(() => {
        fetching()
    }, [currentLimit, currentPage, sortBy, select])
    /*const newCity = useInput('')
    const dispatch = useDispatch()
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState<number>(0)


    useEffect(() => {
        dispatch(fetchCities(offset, limit))
    }, [currentPage, limit])
    useEffect((): void => {
        dispatch(setCityName(newCity.value))
    }, [newCity.value])

    const changePage = (page: number) => {
        setOffset(page * limit - limit)
        setCurrentPage(page)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(event.target.value) === 0) setLimit(10)
        else setLimit(Number(event.target.value));
    };
    const [isOpen, setIsOpen] = useState(false)
    const sortHandler = (value: string) => {

    }*/
    return (
        <div>
            <h3>Список городов</h3>
            <div>
                <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                <Button onClick={() => fetching()}>Выбрать фильтры</Button>
                <div className={s.title}>
                    <ColumnButton sortHandler={sortHandler} sortBy={sortBy} name={'cityName'} select={select}/>
                    <ColumnButton sortHandler={sortHandler} sortBy={sortBy} name={'price'} select={select} />
                    <div>Редактировать</div>
                    <div>Удалить</div>
                </div>
                {!cities || isLoading ?
                    <div>
                        <div className={s.timelineItem}>
                            <div className={s.animatedBackground}>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        {cities && cities.map((c, key) => <OneCity
                            currentPage={currentPage} key={key} city={c}/>)}
                    </div>
                }
            </div>
            {
                pagesArray.map((p: number, key: React.Key) => <span
                    className={currentPage === p ? s.page_current : s.page}
                    key={key}
                    onClick={() => changePage(p)}
                >{p}</span>)
            }
            <span style={{marginLeft: 30, padding: 5}}>Лимит</span>
            {limitArray.map((l, key: React.Key) => <span
                className={currentLimit === l ? s.page_limit : s.limit}
                key={key}
                onClick={() => changeLimit(l)}
            >{l}</span>)
            }
            <div className={s.button}>
                <MyModal name='Добавить город'>
                    <AddCity/>
                </MyModal>
            </div>
        </div>
    );
}
export default Cities
import React, {useEffect, useState} from 'react';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import OneCity from "./OneCity"
import {setCities} from "../../../actionCreators/adminCityActionCreators";
import s from "../../../style/Cities.module.css";
import {Button, Input} from "@material-ui/core";
import MyModal from "../../utilits/MyModal";
import AddCity from './AddCity';
import {usePaginatorWithReduxLimit} from "../../../hooks/usePaginatorWithReduxLimit";
import $api from "../../../http";
import ColumnButton from "../ColumnButton";


const Cities: React.FC = () => {
    const {cities} = useTypedSelector(state => state.adminCity)
    const {
        offset,
        changePage,
        currentPage,
        isLoading,
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
    const [open, setOpen] = useState(false);
    return (
        <div>
            <h3>List of cities</h3>
            <div>
                <Input value={inputValue} placeholder='city name' onChange={(e) => setInputValue(e.target.value)}/>
                <Button onClick={() => fetching()}>Select filters</Button>
                <div className={s.title}>
                    <ColumnButton sortHandler={sortHandler} sortBy={sortBy} name={'cityName'} select={select}/>
                    <ColumnButton sortHandler={sortHandler} sortBy={sortBy} name={'price'} select={select}/>
                    <div>Edit</div>
                    <div>Remove</div>
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
            <span style={{marginLeft: 30, padding: 5}}>Limit</span>
            {limitArray.map((l, key: React.Key) => <span
                className={currentLimit === l ? s.page_limit : s.limit}
                key={key}
                onClick={() => changeLimit(l)}
            >{l}</span>)
            }
            <div className={s.button}>
                <MyModal name='Add city' open={open} setOpen={setOpen}>
                    <AddCity setOpen={setOpen}/>
                </MyModal>
            </div>
        </div>
    );
}
export default Cities
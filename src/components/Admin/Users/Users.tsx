import React, {useEffect} from 'react';
import s from "../../../style/Master.module.css";
import {Button, Input} from "@material-ui/core";
import {usePaginator} from "../../../hooks/usePaginator";
import OneUser, {User} from "./User";
import $api from "../../../http";
import MyModal from "../../utilits/MyModal";
import CreateMaster from "../Masters/CreateMaster";

const Users: React.FC = () => {
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
        sortHandler,
        objects, delObject,
        updateObject
    } =
        usePaginator(() => $api.get(`/users?offset=${offset}&limit=${currentLimit}&sortBy=${sortBy}&select=${select}&filter=${inputValue}`), 'name')

    useEffect(() => {
        fetching()
    }, [currentLimit, currentPage, sortBy, select])

    return (
        <div className={s.wrapper}>
            <div>
                <h3>Список пользователей</h3>
                <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                <Button onClick={() => fetching()}>Выбрать фильтры</Button>
                <div className={s.wrapper}>
                    <Button onClick={() => sortHandler('name')}>
                        Имя пользователя
                    </Button>
                    <Button onClick={() => sortHandler('email')}>
                        Почта
                    </Button>
                    <div>Изменить</div>
                    <div>Удалить</div>
                </div>
                {objects && objects.map((u: User, key: React.Key) => <OneUser deleteUser={delObject}
                                                                              updateUser={updateObject}
                                                                              key={key} user={u} error={error}/>)}
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
            </div>
        </div>
    )
        ;
}
export default Users
import React, {useEffect} from 'react';
import s from "../../../style/Users.module.css";
import {Button, Input} from "@material-ui/core";
import {usePaginator} from "../../../hooks/usePaginator";
import OneUser, {User} from "./User";
import $api from "../../../http";
import ColumnButton from "../ColumnButton";

const Users: React.FC = () => {
    const [
        offset,
        changePage,
        currentPage,
        isLoading,
        error,
        pages,
        fetching,
        limits,
        currentLimit,
        changeLimit,
        sortBy,
        select,
        inputValue,
        setInputValue,
        sortHandler,
        users,
        delObject,
        updateObject
    ] = usePaginator(() => $api.get(`/users?offset=${offset}&limit=${currentLimit}&sortBy=${sortBy}&select=${select}&filter=${inputValue}`), 'name')

    useEffect(() => {
        fetching()
    }, [currentLimit, currentPage, sortBy, select])

    return (
        <div>
            <div>
                <h3>Список пользователей</h3>
                <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                <Button onClick={() => fetching()}>Выбрать фильтры</Button>
                <div className={s.wrapper}>
                    <ColumnButton sortHandler={sortHandler} sortBy={sortBy} name={'name'} select={select}/>
                    <ColumnButton sortHandler={sortHandler} sortBy={sortBy} name={'email'} select={select}/>
                    <div>Изменить</div>
                    <div>Удалить</div>
                </div>
                {isLoading ?
                    <div>
                        <div className={s.timelineItem}>
                            <div className={s.animatedBackground}>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        {users && users.map((u: User, key: React.Key) => <OneUser deleteUser={delObject}
                                                                                  updateUser={updateObject}
                                                                                  key={key} user={u}
                                                                                  error={error}/>)}
                    </div>
                }
                {
                    pages.map((p: number, key: React.Key) => <span
                        className={currentPage === p ? s.page_current : s.page}
                        key={key}
                        onClick={() => changePage(p)}
                    >{p}</span>)
                }
                <span style={{marginLeft: 30, padding: 5}}>Лимит</span>
                {
                    limits.map((l, key: React.Key) => <span
                        className={currentLimit === l ? s.page_limit : s.limit}
                        key={key}
                        onClick={() => changeLimit(l)}
                    >{l}</span>)
                }
            </div>
        </div>
    );
}
export default Users
import React, {useEffect} from 'react';
import s from "../../style/Master.module.css";
import {Input} from "@material-ui/core";
import {usePaginator} from "../../hooks/usePaginator";
import axios from "axios";
import User, {user} from "./User";


const Users: React.FC = () => {

    const[offset, limit, handleChange, changePage, currentPage, users, isLoading, error, pagesArray, getUsers, delUser, updateUser]=usePaginator(async () => {
       return await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users?offset=${offset}&limit=${limit}`)
    })
    useEffect(()=>{
        getUsers()
    },[limit, currentPage])

    return (
        <div>
            <h3>Список пользователей</h3>
            <div>
                <div className={s.wrapper}>
                    <div>Имя пользователя</div>
                    <div>Почта</div>
                    <div>Роль</div>
                    <div>Изменить</div>
                    <div>Удалить</div>
                </div>
                {users && users.map((u: user, key: React.Key) => <User deleteUser={delUser} updateUser={updateUser} key={key} user={u}/>)}
                {pagesArray.map((p: number, key: React.Key)=> <span
                    className={currentPage===p ? s.page_current :s.page}
                    key={key}
                    onClick={()=>changePage(p)}
                >{p}</span>)}
                <span style={{marginLeft:30, padding:5}}>Лимит</span>
                <Input
                    style={{width:20}}
                    value={limit}
                    onChange={handleChange}
                    placeholder="Пользователей в поле"
                    color="primary"
                    inputProps={{'aria-label': 'description'}}
                />
            </div>

        </div>
    );
}
export default Users
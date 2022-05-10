import React, {useEffect} from 'react';
import WorkplaceTable from './WorkplaceTable';
import {useParams} from "react-router-dom";
import {usePaginatorWithRedux} from "../../hooks/usePaginatorWithRedux";
import $api from "../../http";
import s from "../../style/MyWorkplace.module.css";
import {setOrders} from "../../actionCreators/workplaseActionCreators";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Input} from "@material-ui/core";

const MyWorkplace = () => {
    const {masterId} = useParams<{masterId :string}>();
    const {orders}=useTypedSelector(state => state.workplase)
    const {offset, limit, handleChange, changePage, currentPage, isLoading, error, pagesArray, fetching} = usePaginatorWithRedux(async () => {
         return masterId && await $api.get(`/order?offset=${offset}&limit=${limit}&masterId=${masterId}`)
    }, setOrders)
    useEffect(() => {
        fetching()
    }, [limit, currentPage])
    if (isLoading) return <div>Загрузка</div>
    return (
        <div>
            <WorkplaceTable orders={orders}/>
            {pagesArray.map((p: number, key: React.Key) => <span
                className={currentPage === p ? s.page_current : s.page}
                key={key}
                onClick={() => changePage(p)}
            >{p}</span>)}
            <span style={{marginLeft: 30, padding: 5}}>Лимит</span>
            <Input
                style={{width: 40}}
                type='number'
                value={limit}
                onChange={handleChange}
                placeholder="Городов в поле"
                color="primary"
                inputProps={{'aria-label': 'description'}}
            />
        </div>
    );
};

export default MyWorkplace;
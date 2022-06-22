import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {usePaginatorWithRedux} from "../../hooks/usePaginatorWithRedux";
import $api from "../../http";
import {setOrders} from "../../actionCreators/workplaseActionCreators";
import s from "../../style/MyWorkplace.module.css";
import {Input} from "@material-ui/core";
import OfficeTable from "./OfficeTable";

const MyOffice = () => {
    const {id} =useTypedSelector(state => state.auth)
    const {orders} = useTypedSelector(state => state.workPlase)
    const {
        offset,
        limit,
        handleChange,
        changePage,
        currentPage,
        isLoading,
        pagesArray,
        fetching
    } = usePaginatorWithRedux(async () => {
        return await $api.get(`/order?offset=${offset}&limit=${limit}&userId=${id}`)
    }, setOrders)
    useEffect(() => {
        fetching()
    }, [limit, currentPage])

    if (isLoading) return <div>Loading...</div>
    return (
        <div>
            <OfficeTable orders={orders}/>
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
                placeholder="Cities in the field"
                color="primary"
                inputProps={{'aria-label': 'description'}}
            />
        </div>
    );
};

export default MyOffice;
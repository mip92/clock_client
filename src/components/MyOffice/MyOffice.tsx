import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {usePaginatorWithRedux} from "../../hooks/usePaginatorWithRedux";
import $api from "../../http";
import {AxiosOrder} from "../Admin/Orders";
import {setOrders} from "../../actionCreators/workplaseActionCreators";
import s from "../../style/MyWorkplace.module.css";
import {Input} from "@material-ui/core";
import OfficeTable from "./OfficeTable";

const MyOffice = () => {
    let {userId} = useParams<{userId :string}>();
    const {orders}=useTypedSelector(state => state.workplase)
    const {offset, limit, handleChange, changePage, currentPage, isLoading, error, pagesArray, fetching} = usePaginatorWithRedux(async () => {
        return await $api.get<AxiosOrder>(`/order?offset=${offset}&limit=${limit}&userId=${userId}`)
    }, setOrders)
    useEffect(() => {
        fetching()
    }, [limit, currentPage])

    if (isLoading) return <div>Загрузка</div>
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
                placeholder="Городов в поле"
                color="primary"
                inputProps={{'aria-label': 'description'}}
            />
        </div>
    );
};

export default MyOffice;
import React, {useEffect} from 'react';
import s from "../../style/Orders.module.css";
import {Input} from "@material-ui/core";
import {usePaginator} from "../../hooks/usePaginator";
import axios from "axios";
import {orderInterface} from "./Order";
import MyTable from "../utilits/MyTable";

interface axiosOrder{
    rows:orderInterface[],
    count:number
}
const Orders: React.FC = () => {
    const [offset, limit, handleChange, changePage, currentPage, orders, isLoading, error, pagesArray, getOrders] = usePaginator(async () => {
        return await axios.get<axiosOrder>(`${process.env.REACT_APP_SERVER_URL}/api/order?offset=${offset}&limit=${limit}`)
    })
    useEffect(() => {
        getOrders()
    }, [limit, currentPage])

    return (
        <div>
            <h3>Список заказов</h3>
            <MyTable rows={orders}/>
            <div>
                <div className={s.page_wrapper}>
                    {pagesArray.map((p,key)=> <span
                        className={currentPage===p ? s.page_current :s.page}
                        key={key}
                        onClick={()=>changePage(p)}
                    >{p}</span>)}
                    <span style={{marginLeft:30, padding:5}}>Лимит</span>
                    <Input
                        style={{width:20}}
                        value={limit}
                        onChange={handleChange}
                        placeholder="Заказов в поле"
                        color="primary"
                        inputProps={{'aria-label': 'description'}}
                    />
                </div>

            </div>
           {/* <MyModal name='Добавить город'>
                <div className={s.wrapper}>
                    <div>
                        <Input {...newCity}
                               placeholder="Название города"
                               color="primary"
                               inputProps={{'aria-label': 'description'}}
                               className={s.name}
                        />
                    </div>
                    <AddCircleOutlineIcon style={{cursor:"pointer"}} onClick={addCity}/>
                </div>
            </MyModal>*/}
        </div>
    );
}
export default Orders
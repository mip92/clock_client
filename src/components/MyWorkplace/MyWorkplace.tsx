import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import $api from "../../http";
import s from "../../style/MyWorkplace.module.css";
import {setOrders} from "../../actionCreators/workplaseActionCreators";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Button} from "@material-ui/core";
import ColumnButton from "../Admin/ColumnButton";
import {usePaginatorWithReduxLimit} from "../../hooks/usePaginatorWithReduxLimit";
import {AxiosOrder} from "../Admin/Orders/MyOrders";
import {MyStatus} from "../MyOffice/Statuses";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {initStateWorkPlace} from "../../store/reducers/workplaceReducer";
import OrderFilters from "../Admin/Orders/OrderFilters";
import OneMsterOrder from "./OneMasterOrder";

const MyWorkplace = ({cities,
                         isFetch,
                         statuses,
                         rangeDealPrice,
                         rangeTotalPrice,
                         currentRangeDeal,
                         currentRangeTotal,
                         setCurrentRangeDeal,
                         setCurrentRangeTotal}) => {
    const {masterId} = useParams<{ masterId: string }>();

    const THButtons = ['dateTime', 'userEmail', 'userName', 'city', 'clockSize', 'dealPrice', 'totalPrice', 'status', 'pictires']

    const {orders} = useTypedSelector(state => state.workPlase)
    const [status, setStatus] = useState<MyStatus[]>([]);
    const [currentArray, setArrayCurrentCities] = useState<number[]>([])
    const [dateStart, setDateStart] = useState<MaterialUiPickersDate>(null);
    const [dateFinish, setDateFinish] = useState<MaterialUiPickersDate>(null);
    const [clockSize, setClockSize] = useState<string[]>([]);

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
        total,
        length
    } = usePaginatorWithReduxLimit(async () => {
        const st: string[] = []
        status.map((s) => {
            return st.push(s.name)
        })
        const url = `/order?offset=${offset}&limit=${currentLimit}&masterId=${masterId}&sortBy=${sortBy}&select=${select}&filterUser=${inputValue}&minDealPrice=${currentRangeDeal[0]}&maxDealPrice=${currentRangeDeal[1]}&minTotalPrice=${currentRangeTotal[0]}&maxTotalPrice=${currentRangeTotal[1]}&cities=${currentArray}&dateStart=${dateStart}&dateFinish=${dateFinish}&clockSize=${clockSize}&status=${st}`
        return await $api.get<AxiosOrder>(url)
    }, setOrders, "userName")


    useEffect(() => {
        if (!isFetch && currentRangeTotal[0]!=undefined) fetching()
    }, [currentLimit, currentPage, sortBy, select, currentRangeTotal])


    const download = () => {
        const st: string[] = []
        status.map((s) => {
            return st.push(s.name)
        })
        const url = `/order/getExcel?masterId=${masterId}&sortBy=${sortBy}&select=${select}&filterUser=${inputValue}&minDealPrice=${currentRangeDeal[0]}&maxDealPrice=${currentRangeDeal[1]}&minTotalPrice=${currentRangeTotal[0]}&maxTotalPrice=${currentRangeTotal[1]}&cities=${currentArray}&dateStart=${dateStart}&dateFinish=${dateFinish}&clockSize=${clockSize}&status=${st}`
        $api.get(url).then((response) => {
                window.location.href = response.data;
            }
        )
    }

    return (
        <div>
            <div>
                <OrderFilters cities={cities} clockSize={clockSize} currentRangeDeal={currentRangeDeal}
                              currentRangeTotal={currentRangeTotal}
                              dateFinish={dateFinish} dateStart={dateStart} inputValue={inputValue}
                              rangeDealPrice={rangeDealPrice} rangeTotalPrice={rangeTotalPrice}
                              setArrayCurrentCities={setArrayCurrentCities} setClockSize={setClockSize}
                              setCurrentRangeDeal={setCurrentRangeDeal} setCurrentRangeTotal={setCurrentRangeTotal}
                              setDateFinish={setDateFinish} setDateStart={setDateStart} setInputValue={setInputValue}
                              setStatus={setStatus} statuses={statuses}
                              status={status}/>
                <Button onClick={() => fetching()}>Выбрать фильтры</Button>
                <Button onClick={() => download()}>Скачать</Button>

                <table>
                    <tbody>
                    <tr>
                        {THButtons.map((name, key) =>
                            <th key={key}>
                                <ColumnButton sortHandler={sortHandler} sortBy={sortBy}
                                              name={name} select={select}/>
                            </th>
                        )}
                    </tr>
                    {!orders || isLoading || isFetch ?
                        <tr className={s.timelineItem}>
                            <td colSpan={8} className={s.animatedBackground}>
                            </td>
                        </tr>
                        :
                        orders !== initStateWorkPlace.orders && orders.map((order, key) => <OneMsterOrder key={key}
                                                                                                          order={order}
                                                                                                          statuses={statuses}/>)
                    }
                    </tbody>
                </table>
            </div>
            {currentPage !==1 && <span onClick={() => changePage(currentPage-1)} className={s.page}>Prev</span>}
            {
                pagesArray.map((p: number, key: React.Key) => <span
                    className={currentPage === p ? s.page_current : s.page}
                    key={key}
                    onClick={() => changePage(p)}
                >{p}</span>)
            }
            {currentPage !==pagesArray.length && <span onClick={() => changePage(currentPage+1)} className={s.page}>Next</span>}

            <span style={{marginLeft: 30, padding: 5}}>Лимит</span>
            {limitArray.map((l, key: React.Key) => <span
                className={currentLimit === l ? s.page_limit : s.limit}
                key={key}
                onClick={() => changeLimit(l)}
            >{l}</span>)
            }
            <span style={{marginLeft: 30, padding: 5}}>
                Показано {length} из {total}
            </span>
        </div>
    );
};

export default MyWorkplace;
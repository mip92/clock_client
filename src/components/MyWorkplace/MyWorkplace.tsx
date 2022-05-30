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
import Pagination from "./Pagination";

const MyWorkplace = ({
                         cities,
                         isFetch,
                         statuses,
                         rangeDealPrice,
                         rangeTotalPrice,
                         currentRangeDeal,
                         currentRangeTotal,
                         setCurrentRangeDeal,
                         setCurrentRangeTotal,
                         clockSizes,
                         isFetchRange
                     }) => {

    const {masterId} = useParams<{ masterId: string }>();
    const THButtons = ['date time', 'user email', 'user name', 'city', 'clock size', 'deal price', 'total price', 'status']

    const {orders} = useTypedSelector(state => state.workPlase)
    const [status, setStatus] = useState<MyStatus[]>([]);
    const [clockSize, setClockSize] = useState<MyStatus[]>([]);
    const [currentArray, setArrayCurrentCities] = useState<number[]>([])
    const [dateStart, setDateStart] = useState<MaterialUiPickersDate>(null);
    const [dateFinish, setDateFinish] = useState<MaterialUiPickersDate>(null);

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
        sortHandler,
        total,
        length
    } = usePaginatorWithReduxLimit(async () => {
        const currentStatusesName: string[] = []
        const currentClockSizesId: number[] = []
        status.map((s) => {
            return currentStatusesName.push(s.name)
        })
        clockSize.map((s) => {
            return currentClockSizesId.push(s.id)
        })

        const url = `/order?offset=${offset}&limit=${currentLimit}&masterId=${masterId}&sortBy=${sortBy}&select=${select}&filterUser=${inputValue}&minDealPrice=${currentRangeDeal[0]}&maxDealPrice=${currentRangeDeal[1]}&minTotalPrice=${currentRangeTotal[0]}&maxTotalPrice=${currentRangeTotal[1]}&cities=${currentArray}&dateStart=${dateStart}&dateFinish=${dateFinish}&clockSize=${currentClockSizesId}&status=${currentStatusesName}`
        return await $api.get<AxiosOrder>(url)
    }, setOrders, "user name")


    useEffect(() => {
        fetching()
    }, [currentLimit, currentPage, sortBy, select])


    const download = () => {
        const st: string[] = []
        const cs: number[] = []
        status.map((s) => {
            return st.push(s.name)
        })
        clockSize.map((s) => {
            return cs.push(s.id)
        })
        const url = `/order/getExcel?masterId=${masterId}&sortBy=${sortBy}&select=${select}&filterUser=${inputValue}&minDealPrice=${currentRangeDeal[0]}&maxDealPrice=${currentRangeDeal[1]}&minTotalPrice=${currentRangeTotal[0]}&maxTotalPrice=${currentRangeTotal[1]}&cities=${currentArray}&dateStart=${dateStart}&dateFinish=${dateFinish}&clockSize=${cs}&status=${st}`
        $api.get(url).then((response) => {
                window.location.href = response.data;
            }
        )
    }
if (isLoading) return <div>Loading...</div>
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
                              status={status} clockSizes={clockSizes}/>
                <Button onClick={() => fetching()}>Select filters</Button>
                <Button onClick={() => download()}>Download excel</Button>

                <table>
                    <tbody>
                    <tr>
                        {THButtons.map((name, key) =>
                            <th key={key}>
                                <ColumnButton sortHandler={sortHandler} sortBy={sortBy}
                                              name={name} select={select}/>
                            </th>
                        )}
                        <th>PICTURES</th>
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
            <Pagination changeLimit={changeLimit}
                        changePage={changePage}
                        currentLimit={currentLimit}
                        currentPage={currentPage}
                        limitArray={limitArray}
                        pagesArray={pagesArray}
                        total={total}
                        length={length}
            />
        </div>
    );
};

export default MyWorkplace;

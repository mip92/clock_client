import React from 'react';
import CitiesMultySelect from "../Cities/CitiesMultySelect";
import {Button, Input, TextField} from "@material-ui/core";
import RangeSlider from "./RangeSlider";
import DateStart from "./DateStart";
import MultipleSelectObject from "./MultySelectObject";
import {City} from "../../../types/mainInterfacesAndTypes";
import {DealPrice, TotalPrice} from "./MyOrders";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {MyStatus} from "../../MyOffice/Statuses";
import s from '../../../style/OrderFilters.module.css'

interface OrderFiltersProps {
    cities: City[],
    setArrayCurrentCities: React.Dispatch<React.SetStateAction<number[]>>,
    inputValue: string,
    userValue?: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    setUserValue?: React.Dispatch<React.SetStateAction<string>>,
    rangeDealPrice: DealPrice,
    currentRangeDeal: number[],
    setCurrentRangeDeal: React.Dispatch<React.SetStateAction<number[]>>,
    rangeTotalPrice: TotalPrice,
    currentRangeTotal: number[],
    setCurrentRangeTotal: React.Dispatch<React.SetStateAction<number[]>>,
    dateStart: MaterialUiPickersDate,
    setDateStart: React.Dispatch<React.SetStateAction<MaterialUiPickersDate>>
    dateFinish: MaterialUiPickersDate,
    setDateFinish: React.Dispatch<React.SetStateAction<MaterialUiPickersDate>>
    clockSize: MyStatus[],
    setClockSize: React.Dispatch<React.SetStateAction<MyStatus[]>>,
    statuses: MyStatus[] | null,
    setStatus: React.Dispatch<React.SetStateAction<MyStatus[]>>,
    status: MyStatus[],
    clockSizes: MyStatus[] | null,
}

const OrderFilters: React.FC<OrderFiltersProps> = ({
                                                       cities,
                                                       setArrayCurrentCities,
                                                       inputValue,
                                                       userValue,
                                                       setInputValue,
                                                       setUserValue,
                                                       rangeDealPrice,
                                                       currentRangeDeal,
                                                       setCurrentRangeDeal,
                                                       rangeTotalPrice,
                                                       currentRangeTotal,
                                                       setCurrentRangeTotal,
                                                       dateStart,
                                                       setDateStart,
                                                       dateFinish,
                                                       setDateFinish,
                                                       clockSize,
                                                       clockSizes,
                                                       setClockSize,
                                                       statuses,
                                                       setStatus,
                                                       status
                                                   }) => {
        return (
            <div className={s.wrapper}>
                <div className={s.item}>
                    <CitiesMultySelect cities={cities} setArrayCurrentCities={setArrayCurrentCities}/>
                </div>
                <div className={s.item}>
                    <MultipleSelectObject name="Clock size" objects={clockSizes} correctName={clockSize}
                                          setCorrectName={setClockSize}/>
                </div>
                <div className={s.item}>
                    <MultipleSelectObject name="Status" objects={statuses} correctName={status} setCorrectName={setStatus}/>
                </div>
                <div className={s.name}>
                    <TextField label={userValue ? "Master name or email" : "User name or email"}
                               placeholder={userValue ? "Master name or email" : "User name or email"}
                               value={inputValue}
                               onChange={(e) => setInputValue(e.target.value)}/>
                </div>

                {userValue && setUserValue &&
                <div className={s.item}>
                    <Input placeholder="User name or email" value={userValue}
                           onChange={(e) => setUserValue(e.target.value)}/>
                </div>}

                <div className={s.range}>
                    <RangeSlider name="Deal Price"
                                 min={rangeDealPrice.minDealPrice}
                                 max={rangeDealPrice.maxDealPrice}
                                 currentRange={currentRangeDeal}
                                 setCurrentRange={setCurrentRangeDeal}/>
                </div>
                <div className={s.range}>
                    <RangeSlider name="Total Price"
                                 min={rangeTotalPrice.minTotalPrice}
                                 max={rangeTotalPrice.maxTotalPrice}
                                 currentRange={currentRangeTotal}
                                 setCurrentRange={setCurrentRangeTotal}/>
                </div>
                <div className={s.date}>
                    <DateStart date={dateStart} setDate={setDateStart} label='Date start sort'/>
                </div>
                <div className={s.date}>
                    <DateStart date={dateFinish} setDate={setDateFinish} label='Date finish sort'/>
                </div>
            </div>
        );
    }
;
export default OrderFilters;
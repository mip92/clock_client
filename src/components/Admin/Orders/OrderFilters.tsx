import React from 'react';
import CitiesMultySelect from "../Cities/CitiesMultySelect";
import {Input} from "@material-ui/core";
import RangeSlider from "./RangeSlider";
import DateStart from "./DateStart";
import MultipleSelect from "./MultySelect";
import MultipleSelectObject from "./MultySelectObject";
import {City} from "../../../types/mainInterfacesAndTypes";
import {DealPrice, TotalPrice} from "./MyOrders";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {MyStatus} from "../../MyOffice/Statuses";

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
    rangeTotalPrice : TotalPrice,
    currentRangeTotal: number[],
    setCurrentRangeTotal: React.Dispatch<React.SetStateAction<number[]>>,
    dateStart: MaterialUiPickersDate,
    setDateStart: React.Dispatch<React.SetStateAction<MaterialUiPickersDate>>
    dateFinish: MaterialUiPickersDate,
    setDateFinish: React.Dispatch<React.SetStateAction<MaterialUiPickersDate>>
    clockSize: string[],
    setClockSize: React.Dispatch<React.SetStateAction<string[]>>,
    statuses :MyStatus[] | null,
    setStatus: React.Dispatch<React.SetStateAction<MyStatus[]>>,
    status: MyStatus[]
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
                          setClockSize,
                          statuses,
                          setStatus,
                          status
                      }) => {
    return (
        <div>
            <CitiesMultySelect cities={cities} setArrayCurrentCities={setArrayCurrentCities}/>
            <Input placeholder={userValue? "Master name or email" :"User name or email"} value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}/>
            {userValue && setUserValue && <Input placeholder="User name or email" value={userValue}
                   onChange={(e) => setUserValue(e.target.value)}/>}
            <RangeSlider name="Deal Price"
                         min={rangeDealPrice.minDealPrice}
                         max={rangeDealPrice.maxDealPrice}
                         currentRange={currentRangeDeal}
                         setCurrentRange={setCurrentRangeDeal}/>
            <RangeSlider name="Total Price"
                         min={rangeTotalPrice.minTotalPrice}
                         max={rangeTotalPrice.maxTotalPrice}
                         currentRange={currentRangeTotal}
                         setCurrentRange={setCurrentRangeTotal}/>
            <DateStart date={dateStart} setDate={setDateStart} label='date start sort'/>
            <DateStart date={dateFinish} setDate={setDateFinish} label='date finish sort'/>
            <MultipleSelect name="Clock size" arr={['1', '2', '3']} correctName={clockSize}
                            setCorrectName={setClockSize}/>
            <MultipleSelectObject name="Status" arr={statuses} correctName={status} setCorrectName={setStatus}/>
        </div>
    );
};

export default OrderFilters;
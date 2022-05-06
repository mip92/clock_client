import React, {useState} from "react";
import {getPageCount, getPagesArray} from "../utils/pages";
import {MyError} from "../types/mainInterfacesAndTypes";

export const usePaginator = (func, initialSortBy: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<MyError>();
    const [offset, setOffset] = useState(0)
    const limitArray = [10, 25, 50]
    const [select, setSelect] = useState<"ASC" | "DESC">('ASC')
    const [currentLimit, changeLimit] = useState<number>(limitArray[0])
    const [currentPage, setCurrentPage] = useState(1)
    const [objects, setObjects] = useState<any>([{}])
    const [pagesArray, setPagesArray] = useState<Array<number>>([])
    const [sortBy, setSortBy] = useState<string>(initialSortBy)
    const [inputValue, setInputValue] = useState<string>('')
    const sortHandler = (value: string) => {
        /*if (value === sortBy)*/
        select == "ASC" ? setSelect("DESC") : setSelect("ASC")
        setSortBy(value)
    }
    const changePage = (page: number) => {
        setOffset(page * currentLimit - currentLimit)
        setCurrentPage(page)
    }
    const delObject = (id: number) => {
        let result = objects.filter(function (item: any) {
            return item.id !== id
        })
        setObjects(result)
    }
    const updateObject = ({...arg}) => {
        let obj = objects.map(function (item: any) {
            if (item.id === arg.id) {
                return {...item, ...arg}
            } else {
                return item
            }
        })
        setObjects(obj)
    }
    const fetching = () => {
        setIsLoading(true)
        const p = func().then((res) => {
            setObjects(res.data.rows)
            let tp: number = getPageCount(res.data.count, currentLimit)
            let pa: Array<number> = getPagesArray(tp)
            setPagesArray(pa)
            setIsLoading(false)
            p.catch(e => {
                    console.log(e)
                    if (e.response.data.message) setError(e.response.data.message);
                    else setError(e.message);
                }
            )
        })
    }


    return {
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
        objects,
        delObject,
        updateObject
    }

}

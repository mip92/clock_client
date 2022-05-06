import React, {useState} from "react";
import {getPageCount, getPagesArray} from "../utils/pages";
import {useDispatch} from "react-redux";


export const usePaginatorWithReduxLimit = (callback: any, ActionCreatorFind, initialSortBy) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [offset, setOffset] = useState(0)
    const [select, setSelect]=useState('ASC')
    const limitArray = [10, 25, 50]
    const [currentLimit, changeLimit] = useState<number>(limitArray[0])
    const [sortBy, setSortBy] = useState<string>(initialSortBy)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pagesArray, setPagesArray] = useState<Array<number>>([])
    const [inputValue, setInputValue]=useState<string>('')
    const sortHandler = (value: string) => {
        /*if (value === sortBy)*/ select == "ASC" ? setSelect("DESC") : setSelect("ASC")
        setSortBy(value)
    }
    const changePage = (page: number) => {
        setOffset(page * currentLimit - currentLimit)
        setCurrentPage(page)
    }
    const fetching = async (...args: any[]): Promise<void> => {
        try {
            setIsLoading(true)
            const res = await callback(args)
            setIsLoading(false)

            dispatch(ActionCreatorFind(res.data.rows))
            let tp: number = getPageCount(res.data.count, currentLimit)
            let pa: Array<number> = getPagesArray(tp)
            setPagesArray(pa)
        } catch (e) {
            if (e.response.data.message) setError(e.response.data.message);
            else setError(e.message);
            /*setTimeout(async () => {
                setError('')
            }, 5000)*/
        } finally {
            setIsLoading(false)
        }
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
        sortHandler
    }
}

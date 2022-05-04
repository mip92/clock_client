import React, {useState} from "react";
import {getPageCount, getPagesArray} from "../utils/pages";
import {useDispatch} from "react-redux";


export const usePaginatorWithReduxLimit = (callback: any, ActionCreator) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(10)
    const [select, setSelect]=useState('ASC')
    const limitArray = [10, 25, 50]
    const [currentLimit, changeLimit] = useState<number>(limitArray[0])
    const [sortBy, setSortBy] = useState<string>('name')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pagesArray, setPagesArray] = useState<Array<number>>([])
    const changePage = (page: number) => {
        setOffset(page * limit - limit)
        setCurrentPage(page)
    }
    const fetching = async (...args: any[]): Promise<void> => {
        try {
            setIsLoading(true)
            const res = await callback(args)
            setIsLoading(false)
            // @ts-ignore
            dispatch(ActionCreator(res.data.rows))
            let tp: number = getPageCount(res.data.count, limit)
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
        setSortBy,
        sortBy,
        setSelect,
        select
    }
}

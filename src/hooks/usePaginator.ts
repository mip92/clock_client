import React, {useState} from "react";
import {getPageCount, getPagesArray} from "../utils/pages";

export const usePaginator = (func) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [offset, setOffset] = useState<number>(0)
    const [limit, setLimit] = useState<number>(3)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [objects, setObjects] = useState<any>([{}])
    const [pagesArray, setPagesArray] = useState<Array<number>>([])
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(event.target.value) === 0) setLimit(10)
        else setLimit(Number(event.target.value));
    };
    const changePage = (page: number) => {
        setOffset(page * limit - limit)
        setCurrentPage(page)
    }
    const deLObject = (id: number) => {
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
            let tp: number = getPageCount(res.data.count, limit)
            let pa: Array<number> = getPagesArray(tp)
            setPagesArray(pa)
        })
        p.catch(e => {
                //console.log(e)
                if (e.response.data.message) setError(e.response.data.message);
                else setError(e.message);
            }
        )
    }

    return [offset, limit, handleChange, changePage, currentPage, objects, isLoading, error, pagesArray, fetching, deLObject, updateObject]

}

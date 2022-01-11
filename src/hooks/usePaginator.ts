import React, {useState} from "react";
import {getPageCount, getPagesArray} from "../utils/pages";


export const usePaginator = (callback:any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [offset, setOffset]=useState(0)
    const [limit, setLimit]=useState(3)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(Number(event.target.value)===0) setLimit(10)
        else setLimit(Number(event.target.value));
    };
    const [currentPage, setCurrentPage]=useState(1)
    const [objects, setObjects]=useState<any>([{}])
    const [pagesArray, setPagesArray]=useState<Array<number>>([])
    const changePage=(page:number)=>{
        setOffset(page*limit-limit)
        setCurrentPage(page)
    }
    const deLObject=(id:number)=>{
        let result = objects.filter(function (item: any){
            return item.id !==id
        })
        setObjects(result)
    }
    const updateObject=({...arg})=>{
        let obj=objects.map(function (item: any){
            if(item.id === arg.id){
                return {...item, ...arg}
            }
            else {
                return item}
        })
        setObjects(obj)
    }
    const fetching = async (...args: any[]): Promise<void> => {
        try {
            setIsLoading(true)
            const res =await callback(args)
            setIsLoading(false)
            setObjects(res.data.rows)
            let tp:number=getPageCount(res.data.count,limit)
            let pa:Array<number>=getPagesArray(tp)
            setPagesArray(pa)
        } catch (e) {
            if (e.response.data.message )setError(e.response.data.message);
            else setError(e.message);
            setTimeout(async () => {
                setError('')
            }, 2000)
        } finally {
            setIsLoading(false)
        }
    }

    return [offset, limit, handleChange, changePage, currentPage, objects, isLoading, error, pagesArray, fetching, deLObject, updateObject]
}

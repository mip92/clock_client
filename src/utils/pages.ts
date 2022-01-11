export const getPageCount = (totalCount:number, limit:number): number => {
    return Math.ceil(totalCount / limit)
}
export const getPagesArray= (totalPages: number):Array<number> => {
    let pagesArray:Array<number>=[]
    for (let i:number=0;i<totalPages;i++){
        pagesArray.push(i+1)
    }
    return pagesArray
}
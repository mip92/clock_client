export const currentTotal = (total: number, currentLimit:number, currentPage: number) => {
    if (currentLimit*currentPage < total){
        return currentPage*currentLimit
    }else if (total-(currentPage-1)*currentLimit>=1){
        return total-(currentPage-1)*currentLimit
    }else return total-(currentPage-1)*currentLimit
}
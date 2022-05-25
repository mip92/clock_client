export const getPageCount = (totalCount: number, limit: number): number => {
    return Math.ceil(totalCount / limit)
}
export const getPagesArray = (totalPages: number): Array<number> => {
    return Array.from({length: totalPages}, (v, k) => k + 1)
}
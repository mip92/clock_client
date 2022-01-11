
export interface ICity {
    city_name: string,
    createdAt: string,
    id: number,
    updatedAt: string,
}
export interface ICities{
    id: number,
    city_name: string
}
export interface ITime {
    id: number,
    time: string,
}
export interface IDay {
    id: number,
    day_name: string,
}
export interface IClock{
    small:boolean,
    middle: boolean,
    big: boolean,
}
import {useState} from "react";

export const useInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue)
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => { //React.ChangeEvent<HTMLInputElement>
        setValue(e.target.value)
    }
    const change = (e: string) => {
        setValue(e)
    }

    return {value, onChange, change}
}
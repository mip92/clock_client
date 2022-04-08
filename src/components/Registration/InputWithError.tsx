import React, {useEffect, useState} from 'react';
import {TextField} from "@material-ui/core";

interface InputWithErrorProps {
    placeholder: string,
    error: string,
    reg: any,
    cn: string,
    type: string,
    label?: string,
    defaultValue?: string | number,
}

const InputWithError: React.FC<InputWithErrorProps> = ({placeholder, label,defaultValue, error, reg, cn, type}) => {
    const[isError, setError]=useState<boolean>(false)
    useEffect(()=>{
        if (error) setError(true)
        else setError(false)
    },[error])

    return(
        <TextField
            label={label}
            type={type}
            className={cn}
            error={isError}
            defaultValue={defaultValue}
            id={placeholder}
            placeholder={placeholder}
            {...reg}
            helperText={error}
        />
    )
};

export default InputWithError;
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
    color?: string,
    onBlur?: Function
}

const InputWithError: React.FC<InputWithErrorProps> = ({
                                                           placeholder,
                                                           label,
                                                           defaultValue,
                                                           error,
                                                           reg,
                                                           cn,
                                                           type,
                                                           color,
                                                           onBlur
                                                       }) => {
    const [isError, setError] = useState<boolean>(false)
    useEffect(() => {
        if (error) setError(true)
        else setError(false)
    }, [error])

    return (
        <TextField
            color={color}
            label={label}
            type={type}
            className={cn}
            error={isError}
            defaultValue={defaultValue}
            id={placeholder}
            placeholder={placeholder}
            {...reg}
            helperText={error}
            onBlur={onBlur}
        />
    )
};

export default InputWithError;
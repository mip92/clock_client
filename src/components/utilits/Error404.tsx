import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {setStatus} from "../../actionCreators/adminActionCreators";

const Error404= () => {
    const {token,status} = useTypedSelector(state => state.admin)
    const history =useHistory()
    const dispatch =useDispatch()
    useEffect(()=>{
        if ((!token) && (status==401)){
            dispatch(setStatus(200))
            history.push('/login')
        }
        history.push('/')
    },[])
    return (
        <div>
            Путь не найден
        </div>
    );
};

export default Error404;
import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
<<<<<<< HEAD
import {setStatus} from "../../actionCreators/adminActionCreators";
=======
import {setStatus} from "../../actionCreators/authActionCreators";
>>>>>>> registration

const Error404= () => {
    const {token,status} = useTypedSelector(state => state.auth)
    const history =useHistory()
    const dispatch =useDispatch()
<<<<<<< HEAD
=======
    console.log(9999999999)
>>>>>>> registration
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
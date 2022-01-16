import React, {useState} from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CachedIcon from '@material-ui/icons/Cached';
import CheckIcon from '@material-ui/icons/Check';
import s from "../../style/Master.module.css"
import {Input} from "@material-ui/core";
import {useInput} from "../../hooks/useInput";
import axios from "axios";

export interface User {
    id: number,
    name: string,
    email: string,
    role: string,
}

interface UserProps {
    user: User,
    deleteUser: (id: number) => void,
    updateUser: ({id, email, name}: any) => void,
}

const OneUser: React.FC<UserProps> = ({user, deleteUser, updateUser}) => {
    const [isInputActivate, activateInput] = useState(false)
    const newNameOfUser = useInput(user.name)
    const newEmailOfUser = useInput(user.email)
    const constChangeUserName = () => {
        activateInput(true)
    }
    const cnangeUserEventListener = async () => {
        const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/users`, {
                id: user.id,
                newEmail: newEmailOfUser.value,
                newName: newNameOfUser.value,
            }
        )
        activateInput(false)
        updateUser({id: response.data.id, email: response.data.email, name: response.data.name})
    }
    if (!isInputActivate) {
        return (
            <div>
                <div className={s.wrapper}>
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                    <div>{user.role}</div>
                    <CachedIcon onClick={constChangeUserName} style={{cursor: "pointer"}}/>
                    <HighlightOffIcon style={{cursor: "pointer"}} onClick={() => deleteUser(user.id)}/>
                </div>
            </div>
        )
            ;
    } else
        return (
            <div className={s.wrapper}>
                <Input
                    value={newNameOfUser.value}
                    onChange={newNameOfUser.onChange}
                    placeholder="Новое имя пользователя"
                    color="primary"
                    inputProps={{'aria-label': 'description'}}
                    className={s.name}
                />
                <Input value={newEmailOfUser.value}
                       onChange={newEmailOfUser.onChange}
                       placeholder="Новая почта пользователя"
                       color="primary"
                       inputProps={{'aria-label': 'description'}}
                       className={s.name}
                />
                <div className={s.city}>
                    {user.role}
                </div>
                <CheckIcon onClick={cnangeUserEventListener} style={{cursor: "pointer"}}/>
                <HighlightOffIcon style={{cursor: "pointer"}} onClick={() => deleteUser(user.id)}/>
            </div>
        );
}
export default OneUser
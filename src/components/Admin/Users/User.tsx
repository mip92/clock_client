import React, {useState} from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CachedIcon from '@material-ui/icons/Cached';
import s from "../../../style/Master.module.css"
import ChangeUser from "./ChangeUser";
import {MyError} from "../../../types/mainInterfacesAndTypes";

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
    error: MyError | undefined
}

const OneUser: React.FC<UserProps> = ({user, error, deleteUser, updateUser}) => {
    const [isInputActivate, activateInput] = useState(false)

    const constChangeUserName = () => {
        activateInput(true)
    }

    if (!isInputActivate) {
        return (
            <div>
                <div className={s.wrapper}>
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                    <CachedIcon onClick={constChangeUserName} style={{cursor: "pointer"}}/>
                    <HighlightOffIcon style={{cursor: "pointer"}} onClick={() => deleteUser(user.id)}/>
                </div>
            </div>
        )
            ;
    } else
        return (
                <ChangeUser updateUser={updateUser}
                            deleteUser={deleteUser}
                            user={user}
                            activateInput={activateInput}
                            error={error}
                />
        );
}
export default OneUser
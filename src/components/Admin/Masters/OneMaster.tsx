import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {Master} from "../../../types/adminMasterTypes";
import CachedIcon from '@material-ui/icons/Cached';
import s from "../../../style/Master.module.css"
import {useInput} from "../../../hooks/useInput";
import {approveOneMaster, delOneMaster} from "../../../actionCreators/adminMasterActionCreators";
import MyAlert from "../../utilits/MyAlert";
import ChangeMaster from "./ChangeMaster";
import ApproveButton from "../../utilits/ApproveButton";

interface MasterProps {
    master: Master,
    currentPage: number
}

const OneMaster: React.FC<MasterProps> = ({master, currentPage}) => {
    const [current, setCurrent] = useState(1);
    const [isInputActivate, activateInput] = useState(false)

    const dispatch = useDispatch()
    const delMaster = () => {
        dispatch(delOneMaster(master.id))
    }
    const newNameOfMaster = useInput('')
    const newEmailOfMaster = useInput('')
    const constChangeMasterName = () => {
        newNameOfMaster.changeInput(master.name)
        newEmailOfMaster.changeInput(master.email)
        activateInput(true)
    }
    useEffect(() => {
        activateInput(false)
    }, [currentPage])
    if (!master.cities) {
        return <div>Загрузка</div>
    }
    const approveMaster = ()=>{
        dispatch(approveOneMaster(master.id))
    }
    if (!isInputActivate) {
        return (
            <div>
                <div className={s.wrapper}>
                    <div>{master.name}</div>
                    <div>{master.email}</div>
                    <div>{master.cities.map((c, key) => <div key={key}>{c.cityName}</div>)}</div>
                    <CachedIcon onClick={constChangeMasterName} style={{cursor: "pointer"}}/>
                    <MyAlert handler={delMaster}
                             text={`Вы точно хотите удалить ${master.name} из списка мастеров`}/>
                             <ApproveButton isApproved={master.isApproved} approveMaster={approveMaster}/>
                </div>
            </div>
        );
    } else return <ChangeMaster
        master={master}
        activateInput={activateInput}
        delMaster={delMaster}
        newEmailOfMaster={newEmailOfMaster}
        newNameOfMaster={newNameOfMaster}
    />
}
export default OneMaster
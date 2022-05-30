import React, {useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import $api from "../../http";
import {Button, Checkbox, FormControl, FormControlLabel} from "@material-ui/core";
import MyPicture from "./MyPicture";
import {StateOpenInterface} from "./OneMasterOrder";


interface PicturesProps {
    open: StateOpenInterface
    setOpen: Function
    pictures:any
}

interface IPicture {
    url: string
    createdAt: string
    id: number
    path: string
    updatedAt: string
}

interface OrderPicture {
    createdAt: string
    id: number
    orderId: number
    picture: IPicture
    url: string
}

export interface pictureData {
    path: string,
    url: string
    id: number
}

const Pictures: React.FC<PicturesProps> = ({open, setOpen, pictures}) => {
    const [urls, setPictures] = useState<pictureData[]>([])
    const [isNotFound, setIsNotFound] = useState<boolean>(false)

    const fetch = async () => {
        try {
            const response = await $api.get<OrderPicture[]>(`/picture/${open.id}`)
            response.data.map((orderPicture) => setPictures(prevState =>
                [...prevState, {
                    path: orderPicture.picture.path,
                    id: orderPicture.picture.id,
                    url: orderPicture.picture.url
                }]))
        } catch (e) {
            if (e.request.statuse === 404) setIsNotFound(true)
        }
    }
    const [state, setState] = useState({});
    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };


    const onDelete = async () => {
        try {
/*            const entries = Object.entries(state);
            entries.forEach((p)=>{
                if (p[1] === true) correctIds.push(p[0])
            })*/
            const correctIds = Object.entries(state).filter(([key, value]) => value).map(([key]) => key)
            await $api.delete(`/picture/${open.id}`, {
                data: {picturesId: correctIds}
            })
        } catch (e) {
        }
    }
    useEffect(() => {
        open.id && fetch()
    }, [])
    return (
        <div>
            <Dialog
                open={open.status}
                onClose={() => setOpen({status: false, id: null})}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Order photos"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <FormControl component="fieldset">
                            {urls && urls.map((u, key) =>
                                <div>
                                    <FormControlLabel
                                        key={key}
                                        value="top"
                                        checked={state[u.id] || !!''}
                                        onChange={handleChange}
                                        control={<Checkbox color="primary"/>}
                                        name={String(u.id)}
                                        label={''}
                                    />
                                    <MyPicture picture={u}/>
                                </div>
                            )}
                        </FormControl>
                        {isNotFound && <div>Pictures was not uploaded</div>}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onDelete} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default Pictures

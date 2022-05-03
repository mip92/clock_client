import React, {useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import $api from "../../http";
import {Button, Checkbox, FormControl, FormControlLabel} from "@material-ui/core";
import Picture from './MyPicture';
import MyPicture from "./MyPicture";
import {StateOpenInterface} from "./WorkplaceTable";

interface PicturesProps {
    open: StateOpenInterface
    setOpen: Function
}

interface Picture {
    url:string
    createdAt: string
    id: number
    path: string
    updatedAt: string
}

interface OrderPicture {
    createdAt: string
    id: number
    orderId: number
    picture: Picture
    url:string
}

export interface pictureData {
    path: string,
    url:string
    id: number
}

const Pictures: React.FC<PicturesProps> = ({open, setOpen}) => {
    const [urls, setPictures] = useState<pictureData[]>([] as pictureData[])
    const [isNotFound, setIsNotFound] = useState<boolean>(false)

    const fetch = async () => {
        try {
            const response = await $api.get<OrderPicture[]>(`/picture/${open.id}`)
            response.data.map((orderPicture) => setPictures(prevState =>
                [...prevState, {path: orderPicture.picture.path, id: orderPicture.picture.id, url: orderPicture.picture.url}]))
        } catch (e) {
            if (e.request.statuse = 404) setIsNotFound(true)
            console.log(e.request.responseText)
        }
    }
    const [state, setState] = React.useState({});
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const onDelete=async ()=>{
        try {
            let arr=[] as string[]
            for (var key in state) {
                if (state[key]==true) arr.push(key)
            }
            const response = await $api.delete(`/picture/${open.id}`,{
                data:{picturesId: arr}
            })
            console.log(response)
        } catch (e) {
            //if (e.request.statuse = 404) setIsNotFound(true)
            console.log(e.request.responseText)
        }
    }
    useEffect(() => {
        console.log(open.id)
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
                <DialogTitle id="alert-dialog-title">{"OneOrder photos"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <FormControl component="fieldset">
                        {urls && urls.map((u, key) =>
                            <FormControlLabel
                                key={key}
                                value="top"
                                checked={state[u.id] || !!''}
                                onChange={handleChange}
                                control={<Checkbox color="primary" />}
                                label={<MyPicture picture={u}/>}
                                name={String(u.id)}
                            />
                            )}
                        </FormControl>
                        {isNotFound && <div>Pictures is not found</div>}
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
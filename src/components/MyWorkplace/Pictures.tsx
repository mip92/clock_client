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
import {useDispatch} from "react-redux";
import {deletePictures} from "../../actionCreators/workplaseActionCreators";

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
    pictures:  OrderPicture[]
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
    const dispatch =useDispatch()
    const [state, setState] = useState({});
    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    const onDelete = async () => {
        try {
            const correctIds = Object.entries(state).filter(([key, value]) => value).map(([key]) => key)
            const response = await $api.delete(`/picture/${open.id}`, {data: {picturesId: correctIds}})
            if (open.id !==null) dispatch (deletePictures(open.id, response.data.picturesId))
            setOpen(false)
        } catch (e) {

            }
        }
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
                            {pictures && pictures.map((picture) =>
                                <div>
                                    <FormControlLabel
                                        key={picture.id}
                                        value="top"
                                        checked={state[picture.picture.id] || !!''}
                                        onChange={handleChange}
                                        control={<Checkbox color="primary"/>}
                                        name={String(picture.picture.id)}
                                        label={''}
                                    />
                                    <MyPicture picture={picture.picture}/>
                                </div>
                            )}
                        </FormControl>
                        {pictures.length === 0 && <div>Pictures was not uploaded</div>}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {pictures.length !== 0 &&
                    <div>
                        <Button onClick={onDelete} color="primary">
                            Delete
                        </Button>
                    </div>
                    }
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default Pictures

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
import {StateOpenInterface} from "./OneMasterOrder";
import {useDispatch} from "react-redux";
import {deletePictures} from "../../actionCreators/workplaseActionCreators";

interface PicturesProps {
    open: StateOpenInterface
    setOpen: Function
    pictures: any
}

interface Picture {
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
    picture: Picture
    url: string
}

export interface pictureData {
    path: string,
    url: string
    id: number
}

const Pictures: React.FC<PicturesProps> = ({open, setOpen, pictures}) => {
    const dispatch =useDispatch()
    const [state, setState] = useState({});
    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };
    const download = () => {
        const url = `/order/getZip/${open.id}`
        $api.get(url).then((response) => {
                window.location.href = response.data;
            }
        )
    }

    const onDelete = async () => {
        try {
            let arr: string[] = []
            const entries = Object.entries(state);
            entries.forEach((p) => {
                if (p[1] === true) arr.push(p[0])
            })
            const response = await $api.delete(`/picture/${open.id}`, {
                data: {picturesId: arr}
            })
            if (open.id !==null) dispatch (deletePictures(open.id, response.data.picturesId))
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
                            {pictures && pictures.map((picture, key) =>
                                <div>
                                    <FormControlLabel
                                        key={key}
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
                        <Button onClick={() => download()}>
                            Download zip
                        </Button>
                    </div>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default Pictures
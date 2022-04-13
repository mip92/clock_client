import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Card, List} from "@material-ui/core";
import FilesUpload from "./FileUploader";
import PhotoLibraryOutlinedIcon from "@material-ui/icons/PhotoLibraryOutlined";

export interface picture{
    name:string;
    size:number
}
const FileUploaderContainer = () => {
    const [tempFile, addTempFile]=useState<picture[]>([]as picture[])
    const [error, setError]=useState<boolean>(false)
    const sendForm =async (picture) => {
        let formData = new FormData;
        if (picture) {
            console.log(picture)
            for (let i = 0; i < picture.length; i++) {
                formData.append(`picture${i}`, picture[i]);
            }
        }
        const response = await axios.post(`http://localhost:5000/api/picture`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }
    useEffect(()=>{
        let err =false
        for (let i = 0; i < tempFile.length; i++) {
            if (tempFile[i].size>1048576) err=true
        }
        setError(err)
    },[tempFile])
    console.log(tempFile)
    return (
        <Card variant="outlined">
            <List>
                <FilesUpload accept="image/*" tempFile={tempFile} addTempFile={addTempFile}>
                    <Button variant="contained"
                            color="primary"><PhotoLibraryOutlinedIcon/> Выбрать фотографии</Button>
                </FilesUpload>
            </List>
            <Button disabled={error} onClick={()=>sendForm(tempFile)}>Загрузить фото</Button>
        </Card>
    );
};

export default FileUploaderContainer;
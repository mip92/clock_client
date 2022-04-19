import React, {useEffect} from 'react';
import {Button, Card, List} from "@material-ui/core";
import FilesUpload from "./FileUploader";
import PhotoLibraryOutlinedIcon from "@material-ui/icons/PhotoLibraryOutlined";


const FileUploaderContainer = ({tempFiles, addTempFiles, setError}) => {

    useEffect(() => {
        let err = false
        for (let i = 0; i < tempFiles.length; i++) {
            if (tempFiles[i].size > 1048576) err = true
        }
        setError(err)
    }, [tempFiles])

    return (
        <List>
            <FilesUpload accept="image/*" tempFiles={tempFiles} addTempFiles={addTempFiles}>
                <Button variant="contained"
                        color="primary"><PhotoLibraryOutlinedIcon/> Выбрать фотографии</Button>
            </FilesUpload>
        </List>
    );
};

export default FileUploaderContainer;
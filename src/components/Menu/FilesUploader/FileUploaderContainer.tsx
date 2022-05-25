import React, {useEffect} from 'react';
import {Button, List} from "@material-ui/core";
import FilesUpload from "./FileUploader";
import PhotoLibraryOutlinedIcon from "@material-ui/icons/PhotoLibraryOutlined";


const FileUploaderContainer = ({tempFiles, addTempFiles, setError}) => {

    useEffect(() => {
        let err = false
        tempFiles.forEach((tf)=>{
            if (tf.size > 1048576) err = true
        })
        if(tempFiles.length>5) err = true
/*        for (let i = 0; i < tempFiles.length; i++) {
            if (tempFiles[i].size > 1048576) err = true
        }*/
        setError(err)
    }, [tempFiles])

    return (
        <List>
            <FilesUpload accept="image/*" tempFiles={tempFiles} addTempFiles={addTempFiles}>
                <Button variant="contained"
                        color="primary"><PhotoLibraryOutlinedIcon/>Select photos</Button>
            </FilesUpload>
        </List>
    );
};

export default FileUploaderContainer;
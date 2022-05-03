import React, {useEffect} from 'react';
import {Button, Card, List} from "@material-ui/core";
import FilesUpload from "./FileUploader";
import PhotoLibraryOutlinedIcon from "@material-ui/icons/PhotoLibraryOutlined";

interface FileUploaderContainerProps{
    tempFiles :File[],
    addTempFiles :Function,
    setError: Function
}
const FileUploaderContainer:React.FC<FileUploaderContainerProps> = ({tempFiles, addTempFiles, setError}) => {

    useEffect(() => {
        let err = false
        tempFiles.forEach((picture)=>{ if(picture.size>1048576) err = true})
        setError(err)
    }, [tempFiles])

    return (
        <List>
            <FilesUpload accept="image/*" addTempFiles={addTempFiles}>
                <Button variant="contained"
                        color="primary"><PhotoLibraryOutlinedIcon/> Выбрать фотографии</Button>
            </FilesUpload>
        </List>
    );
};

export default FileUploaderContainer;
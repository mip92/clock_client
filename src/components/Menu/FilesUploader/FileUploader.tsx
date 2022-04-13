import React from 'react';
import Files from "./Files";
import {picture} from "./FileUploaderContainer";



interface IFileUploadProps {
    accept: string;
    addTempFile: Function;
    tempFile: picture[]
}

const FilesUpload: React.FC<IFileUploadProps> = ({ tempFile, addTempFile, accept, children}) => {
    const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Object.keys(e != null && e.target != null && e.target.files != null && e.target.files).map((i) => e != null && e.target != null && e.target.files != null && e.target.files[i]);
        addTempFile(files)
        e.target.value = '';
    }

    const onDelete = (name) => {
        const arr =tempFile.filter((item => item.name !== name))
        addTempFile(arr)
    }

    return (
        <div>
            <div onClick={() => ref?.current?.click()}>
                <input
                    type='file'
                    accept={accept}
                    style={{display: 'none'}}
                    ref={ref}
                    onChange={onChange}
                    multiple={true}
                />
                {children}
            </div>
            <Files imgs={tempFile}  onDelete={onDelete}/>
        </div>
    );
};

export default FilesUpload;
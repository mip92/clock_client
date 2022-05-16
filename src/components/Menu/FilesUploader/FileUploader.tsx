import React from 'react';
import {picture} from "../../../types/mainInterfacesAndTypes";

interface IFileUploadProps {
    accept: string;
    addTempFiles: Function;
    tempFiles: picture[]
}

const FilesUpload: React.FC<IFileUploadProps> = ({ tempFiles, addTempFiles, accept, children}) => {
    const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Object.keys(e != null && e.target != null && e.target.files != null && e.target.files).map((i) => e != null && e.target != null && e.target.files != null && e.target.files[i]);
        //const f =files.slice(0, 5)
        addTempFiles(files)
        e.target.value = '';
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
        </div>
    );
};

export default FilesUpload;
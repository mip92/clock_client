import MultilineTextFields from "./MultilineTextFields";
import React, {useEffect, useState} from "react";
import {Button, Card} from "@material-ui/core";
import s from "../../style/FirstStep.module.css"
import $api from "../../http";
import {useFetching} from "../../hooks/useFetching";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import RegistrationAlert from "../Registration/RegistrationAlert";
import {useDispatch} from "react-redux";
import {fetchCities, setOrder} from "../../actionCreators/orderActionCreators";
import InputWithError from "../Registration/InputWithError";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import ClockSize from "./ClockSize";
import {FormInputDate} from "./FormInputDate";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {Master} from "../../types/adminMasterTypes";
import FileUploaderContainer from "./FilesUploader/FileUploaderContainer";
import Files from "./FilesUploader/Files";
import ModalName from "../utilits/ModalName";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    name: Yup.string()
        .min(6, 'Name must be at least 6 characters')
        .required('Name is required').default('some string'),
    checkbox: Yup.string()
        .oneOf(["big", "small", "middle"], "You must accept the terms and conditions").nullable(),
    currentCity: Yup.string().required('Current city is required'),
    currentTime: Yup.string().required('Current time is required'),
    fieldName: Yup.string().required('Date time is required'),
});
const formOptions = {resolver: yupResolver(validationSchema)};

const FirstStep = ({setMasters, next, tempFiles, addTempFiles}) => {
    const {token, authName, authEmail} = useTypedSelector(state => state.auth)
    const {cities, time} = useTypedSelector(state => state.order)
    const dispatch = useDispatch()
    const [date, setDate] = useState<MaterialUiPickersDate>(null);
    const [openAlert, setOpenAlert] = useState(false);

    function getKeyByValue(checkbox: string, value: boolean) {
        if (checkbox === 'small') return 1
        else if (checkbox === 'middle') return 2
        else if (checkbox === 'big') return 3
    }

    const onDelete = (name) => {
        const arr = tempFiles.filter((item => item.name !== name))
        addTempFiles(arr)
    }

    const [isLoadingFindMaster, setIsLoading] = useState<boolean>(false);
    const [error, setFetchError] = useState<string>('');
    const [pictureError, setPictureError] = useState<string>('');
    const {register, getValues, setValue, handleSubmit, watch, formState: {errors}, setError} = useForm(formOptions);
    const [nameError, setNameError]=useState('')
    const onSubmit = handleSubmit(async data => {
            try {
                let clock = getKeyByValue(data.checkbox, true);
                let dateWithTime = new Date(data.fieldName)
                data.currentTime && dateWithTime.setHours(data.currentTime)
                dateWithTime.setMinutes(0)
                setIsLoading(true)
                const res = await $api.get(`/masters/getFreeMasters?cityId=${data.currentCity}&dateTime=${dateWithTime.toISOString()}&clockSize=${clock}&limit=${50}&offset=${0}`)
                dispatch(setOrder(data.currentCity, String(dateWithTime), clock, data.email, data.name, tempFiles))
                const masters: Master[] = res.data
                setMasters(masters)
                next()
            } catch (e) {
                if (e.response.data.message) setFetchError(e.response.data.message);
                else setFetchError(e.message);
            } finally {
                setIsLoading(false)
            }
        }
    );
    useEffect(() => {
        if (error) {
            setError('fieldName', {
                type: "server error",
                message: error
            });
        }
    }, [error])

    useEffect(() => {
        dispatch(fetchCities(0, 50))
    }, [])

    const [findUser, isLoading, errorfindUser] = useFetching(async () => {
        await findName()
        return await $api.get(`/users/findUser?email=${watch("email")}`)
    })
    const findName = async ()=>{
        if(watch("email") && watch("name")){
            try {
                await $api.get(`/users/findName?email=${watch("email")}&name=${watch("name")}`)
            }catch (e) {
                setNameError(e.response.data.message)
            }
        }

    }

    useEffect(() => {
        if (errorfindUser === 'User with this email is already registered' && !token) setOpenAlert(true)
        return () => setOpenAlert(false)
    }, [errorfindUser])


    useEffect(() => {
        authEmail && setValue("email", authEmail, {
            shouldValidate: true,
            shouldDirty: true
        })
        authName && setValue("name", authName, {
            shouldValidate: true,
            shouldDirty: true
        })
        setValue("currentCity", '1', {
            shouldValidate: true,
            shouldDirty: true
        })
    }, [cities])
    if (isLoadingFindMaster || isLoading) return <div>Loading...</div>

    return (
        <form onSubmit={onSubmit}>
            <Card className={s.wrapper}>
                <InputWithError
                    onBlur={findUser}
                    cn={s.email}
                    type="email"
                    placeholder="Email"
                    color="primary"
                    reg={register('email')}
                    error={errors.email?.message}/>
                <InputWithError
                    onBlur={findName}
                    cn={s.name}
                    type="text"
                    placeholder="Your name"
                    color="primary"
                    reg={register('name')}
                    error={errors.name?.message}/>
                <div className={s.size}>
                    <ClockSize register={register} error={errors.checkbox?.message}/>
                </div>
                {cities.length>0 ?
                    <div className={s.city}>
                        <MultilineTextFields register={register('currentCity')}
                                             label={"City"}
                                             objects={cities}
                                             error={errors.currentCity?.message}/>
                    </div>
                    :
                    <div>
                        Loading...
                    </div>
                }
                <div className={s.date}>
                    <FormInputDate register={register}
                                   getValues={getValues}
                                   setValue={setValue}
                                   date={date}
                                   setDate={setDate}
                                   error={errors.fieldName?.message}/>
                </div>
                <div className={s.time}>
                    <MultilineTextFields register={register('currentTime')}
                                         label={"Time"}
                                         objects={time}
                                         error={errors.currentTime?.message}/>
                </div>
                <div className={s.picturesBtn}>
                    <FileUploaderContainer tempFiles={tempFiles}
                                           addTempFiles={addTempFiles}
                                           setError={setPictureError}
                    />
                </div>
                <div className={s.pictures}>
                    <Files imgs={tempFiles} onDelete={onDelete}/>
                </div>
                <div className={s.buttons}>
                    <Button variant="contained"
                            color='primary'
                            disabled={true}>
                        Back</Button>
                    <div style={{color: 'red'}}>{pictureError}</div>
                    <Button variant="contained"
                            color='primary'
                            type='submit'
                            disabled={!!pictureError}
                    >
                        Next</Button>
                </div>
                <ModalName open={nameError} setNameError={setNameError} setValue={setValue}/>
                <RegistrationAlert open={openAlert}/>
            </Card>
        </form>
    )
}

export default FirstStep
import React, {useEffect} from 'react';
import s from "../../../style/City.module.css";
import {Button} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {changeCityName} from "../../../actionCreators/adminCityActionCreators";
import {useDispatch} from "react-redux";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import InputWithError from "../../Registration/InputWithError";
import {City} from "../../../types/mainInterfacesAndTypes";

interface ChangeCityProps {
    city: City,
    activateInput: React.Dispatch<React.SetStateAction<boolean>>,
    delCity: () => void,
    newNameOfCity: any,
}

const validationSchema = Yup.object().shape({
    cityName: Yup.string().min(3, 'City name must be longer than 3 characters')
        .required('City name is required'),
    price: Yup.number().required('Price of city is required').positive().integer(),
});
const formOptions = {resolver: yupResolver(validationSchema)};

const ChangeCity: React.FC<ChangeCityProps> = ({activateInput, city, delCity}) => {
    const {error} = useTypedSelector(state => state.adminCity)
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors}, setError} = useForm(formOptions);
    const onSubmit = handleSubmit(async data => {
            dispatch(await changeCityName(city.id, data.cityName, data.price, activateInput))
        }
    )
    useEffect(() => {
        if (error?.param) {
            setError(error.param, {
                type: "server error",
                message: error.msg
            });
        }
    }, [error])

    return (
        <form onSubmit={onSubmit} className={s.wrapper}>
            <InputWithError
                defaultValue={city.cityName}
                cn={s.name}
                type="text"
                placeholder="City name"
                reg={register("cityName")}
                error={errors.cityName?.message}/>
            <InputWithError
                cn={s.name}
                defaultValue={city.price}
                type="number"
                placeholder="Prise per hour"
                reg={register("price")}
                error={errors.price?.message}/>
            <Button type="submit" color='secondary' className={s.btn}><CheckIcon/></Button>
            <HighlightOffIcon style={{cursor: "pointer"}} onClick={delCity}/>
        </form>
    );
};

export default ChangeCity;
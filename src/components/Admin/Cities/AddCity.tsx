import React, {useEffect} from 'react';
import s from "../../../style/Cities.module.css";
import {Button} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import InputWithError from "../../Registration/InputWithError";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {addOneCity} from "../../../actionCreators/adminCityActionCreators";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

const AddCity:React.FC = () => {
    const {error} = useTypedSelector(state => state.adminCity)
    const dispatch=useDispatch()
    const validationSchema = Yup.object().shape({
        city: Yup.string().min(3, 'City name must be longer than 3 characters')
            .required('City name is required'),
        price: Yup.number()/*.required('Price of city is required').positive().integer(),*/
    });
    const formOptions = {resolver: yupResolver(validationSchema)};
    const {register, handleSubmit, watch, formState: {errors}, setError} = useForm(formOptions);
    const onSubmit = handleSubmit(async data => {
        dispatch(addOneCity(data.city, data.price))
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

    /*const addCity = (): void => {
        dispatch(addOneCity(newCity.value, price))
        newCity.changeInput('')
    }*/

    /*const handlerChangePrice = (e) => {
        if (e.target.value < 1) setPrice(1)
        else setPrice(e.target.value)
    }*/

    return (
        <div>
            <form onSubmit={onSubmit} className={s.wrapper}>
                <InputWithError
                    cn={s.name}
                    type="text"
                    placeholder="Название города"
                    reg={register("city")}
                    error={errors.city?.message}/>
                <InputWithError
                    cn={s.name}
                    type="number"
                    placeholder="Цена за час"
                    reg={register("price")}
                    error={errors.price?.message}/>
                <Button type="submit" color='secondary' className={s.btn}>
                    <AddCircleOutlineIcon style={{cursor: "pointer"}}/>
                </Button>
            </form>
        </div>
    );
};

export default AddCity;
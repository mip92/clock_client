import React, {useEffect, useState} from 'react';
import {ThemeProvider} from "@material-ui/core";
import {createTheme} from '@material-ui/core/styles'
import Steper from "./components/Menu/Steper";
import {Route, Switch} from "react-router-dom";
import Login from './components/Admin/Login'
import Menu from './components/Admin/Menu'
import {FormContext} from "./context/formContext";
import {useInput} from "./hooks/useInput";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Cities from "./components/City/Cities";
import Masters from "./components/Admin/Masters";
import {useFetching} from "./hooks/useFetching";
import axios from "axios";
import {ICities} from "./types/mainInterfaces";
import {MasterContext} from './context/masterContext';
import Navbar from "./components/Admin/Navbar";
import Users from "./components/Admin/Users";
import Orders from "./components/Admin/Orders";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#ffe0b2',
        },
        secondary: {
            main: '#f57c00',
        },

    },

});

interface IClock {
    small: boolean,
    middle: boolean,
    big: boolean,
}

const App: React.FC = () => {
    //const [selectedDate, handleDateChange] = React.useState<Date>(new Date());
    const [currencyCity, setCurrencyCity] = React.useState<number>(1);
    const [currencyTime, setCurrencyTime] = React.useState<number>(8);
    const [currencyDay, setCurrencyDay] = React.useState<number>(1);
    const [currentMaster, setCurrentMaster] = useState<number>(1)
    const [clockSize, setClockSize] = React.useState<IClock>({
        small: false,
        middle: false,
        big: false,
    });
    const email = useInput('')
    const name = useInput('')
    const [date, setDate] = useState<Date>(new Date());
    const [cities, setCities] = useState<Array<ICities>>([{
        city_name: '',
        id: 0,
    }])
    const [getCities, isFetch, error] = useFetching(async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/cities?offset=${0}&limit=${50}`)
        setCities(response.data.rows)
    })


    useEffect(() => {
        // @ts-ignore
        getCities()
        return () => {
            setCities([])
        };
    }, [])


    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <Switch>
                        <Route exact path="/" render={() =>
                            <FormContext.Provider value={{
                                currentMaster,
                                setCurrentMaster,
                                currencyCity,
                                setCurrencyCity,
                                currencyTime,
                                setCurrencyTime,
                                currencyDay,
                                setCurrencyDay,
                                clockSize,
                                setClockSize,
                                email,
                                name,
                                date,
                                setDate,
                            }}>
                                <Steper/>
                            </FormContext.Provider>
                        }/>
                        <Route path="/login" render={() => <Login/>}/>

                        <Route path="/menu/cities" render={() =>
                            <Navbar>
                                <Cities/>
                            </Navbar>
                        }/>
                        <Route path="/menu/masters" render={() =>
                            <MasterContext.Provider value={{
                                cities
                            }}>
                                <Navbar>
                                    {/*@ts-ignore*/}
                                    <Masters cities={cities} isFetch={isFetch}/>
                                </Navbar>
                            </MasterContext.Provider>
                        }/>
                        <Route path="/menu/users" render={() =>
                            <Navbar>
                                <Users/>
                            </Navbar>
                        }/>
                        <Route path="/menu/orders" render={() =>
                            <Navbar>
                                <Orders/>
                            </Navbar>
                        }/>
                        <Route path="/menu" render={() =>
                            <Navbar>
                                <Menu/>
                            </Navbar>
                        }/>
                        <Route path="*" render={() => 404}/>
                    </Switch>
                </div>
            </ThemeProvider>
        </MuiPickersUtilsProvider>
    );
}

export default App;

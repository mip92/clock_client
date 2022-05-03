import React, {useEffect, useState} from 'react';
import {ThemeProvider} from "@material-ui/core";
import {createTheme} from '@material-ui/core/styles'
import {Route, Switch} from "react-router-dom";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {useDispatch} from "react-redux";
import {setRole, setToken} from "./actionCreators/authActionCreators";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {createRoute} from "./utils/createRoutes";
import moment from 'moment'
import MomentUtils from "@date-io/moment";
import Navbar from "./components/utilits/Navbar";
import StepperContainer from "./components/Menu/StepperContainer";
import Blog from "./components/Blog/Blog";
import Login from "./components/Registration/Login";
import Registration from "./components/Registration/Registration";
import Cities from "./components/Admin/Cities/Cities";
import MastersContainer from "./components/Admin/Masters/MastersContainer";
import Users from "./components/Admin/Users/Users";
import Orders from "./components/Admin/Orders/Orders";
import MyOffice from "./components/MyOffice/MyOffice";
import ChangeEmail from "./components/MyWorkplace/ChangeEmail";
import MyWorkplace from "./components/MyWorkplace/MyWorkplace";
import Error404 from "./components/utilits/Error404";
import Button from "@material-ui/core/Button";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#ffe0b2',
        },
        secondary: {
            main: '#f57c00',
        },
    },
    typography: {}
});


export interface MyRoute {
    exact: boolean;
    path: string;
    component: JSX.Element
}

moment.updateLocale('en', {
    week: {
        dow: 1
    }
})

const App: React.FC = () => {
    const dispatch = useDispatch()
    const {token, role} = useTypedSelector(state => state.auth)

    useEffect(() => {
        dispatch(setToken())
    }, [])


    useEffect(() => {
        dispatch(setRole(token))
    }, [token])


    useEffect(() => {
        setRoutes(createRoute(role))
    }, [role])

    const initial:MyRoute[]=[
        {exact: true, path: "/", component: <StepperContainer/>},
        {exact: true, path: "/blog", component: <Blog/>},
        {exact: true, path: "/login", component: <Login/>},
        {exact: false, path: "/registration", component: <Registration/>},
        {exact: false, path: "/menu/cities", component: <Cities/>},
        {exact: false, path: "/menu/masters", component: <MastersContainer/>},
        {exact: false, path: "/menu/users", component: <Users/>},
        {exact: false, path: "/menu/orders", component: <Orders/>},
        {exact: false, path: "/menu", component: <Orders/>},
        {exact: true, path: "/myOffice/:userId", component: <MyOffice/>},
        {exact: true, path: "/changeEmail", component: <ChangeEmail/>},
        {exact: true, path: "/MyWorkplace/:masterId", component: <MyWorkplace/>},
        {exact: true, path: "/changeEmail", component: <ChangeEmail/>},
        {exact: false, path: "*", component: <Error404/>}
    ]
    const [routes, setRoutes] = useState<MyRoute[]>(initial)

     useEffect(() => {
         console.log(role)
         setRoutes(createRoute(role))
     }, [role])
    const payPalId: string = process.env.REACT_APP_CLIENT_PAYPAL_ID || ''
    const currency = "USD"

    return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <ThemeProvider theme={theme}>
                    <div className="App">
                        <Navbar/>
                        <Switch>
                            {routes.map((r, key) => <Route key={key}
                                                           path={r.path}
                                                           render={() => r.component}
                                                           exact={r.exact}/>
                            )}
                        </Switch>

                    </div>
                </ThemeProvider>
            </MuiPickersUtilsProvider>
    );
}

export default App;

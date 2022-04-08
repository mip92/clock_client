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
import Navbar from "./components/Admin/Navbar";


export const theme = createTheme({
    palette: {
        primary: {
            main: '#ffe0b2',
        },
        secondary: {
            main: '#f57c00',
        },
    },
    typography:{

    }
});


export interface MyRoute {
    exact: boolean;
    path: string;
    component: JSX.Element
}
moment.updateLocale('en',{
    week:{
        dow:1
    }
})

const App: React.FC = () => {
    const dispatch = useDispatch()
    const {token, role} = useTypedSelector(state => state.auth)

    useEffect(() => {
        dispatch(setToken())
    }, [])

    useEffect(()=>{
        dispatch(setRole(token))
    },[token])

    useEffect(()=>{
        setRoutes(createRoute(role))
    },[role])


    const [routes, setRoutes] = useState<MyRoute[]>(createRoute(role))
    /*useEffect(() => {
        setRoutes(createRoute(role))
    }, [token])*/

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

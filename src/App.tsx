import React, {useEffect, useState} from 'react';
import {ThemeProvider} from "@material-ui/core";
import {createTheme} from '@material-ui/core/styles'
import {Route, Switch} from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {useDispatch} from "react-redux";
import {logout, setToken} from "./actionCreators/adminActionCreators";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {createRoute} from "./utils/createRoutes";

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

export interface MyRoute {
    exact: boolean;
    path: string;
    component: JSX.Element
}

const App: React.FC = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setToken())
    }, [])
    const {token} = useTypedSelector(state => state.admin)
    const [routes, setRoutes] = useState<MyRoute[]>(createRoute(token))
    useEffect(() => {
        setRoutes(createRoute(token))
    }, [token])
/*    useEffect(()=>{
        if (!token) dispatch(logout())
    },[localStorage.getItem('token')])*/

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ThemeProvider theme={theme}>
                <div className="App">
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

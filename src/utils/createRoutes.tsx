import StepperContainer from "../components/Menu/StepperContainer";
import Login from "../components/Admin/Login";
import Cities from "../components/City/Cities";
import MastersContainer from "../components/Admin/MastersContainer";
import Users from "../components/Admin/Users";
import Orders from "../components/Admin/Orders";
import Error404 from "../components/utilits/Error404";
import {MyRoute} from "../App";

export const createRoute=(token)=>{
    const mainRouts:MyRoute[]=[
        {exact: true, path: "/", component: <StepperContainer/>},
        {exact: false, path: "/login", component: <Login/>}
    ]
    const adminRoutes:MyRoute[]=[
        {exact: false, path: "/menu/cities", component: <Cities/>},
        {exact: false, path: "/menu/masters", component: <MastersContainer/>},
        {exact: false, path: "/menu/users", component: <Users/>},
        {exact: false, path: "/menu/orders", component: <Orders/>},
        {exact: false, path: "/menu", component: <Orders />}
    ]
    const error={exact: false, path: "*", component: <Error404/>}
    if (!token) return [...mainRouts, error]
    return [...mainRouts, ...adminRoutes, error]
}
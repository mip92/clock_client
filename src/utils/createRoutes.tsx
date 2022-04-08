import StepperContainer from "../components/Menu/StepperContainer";
import Login from "../components/Registration/Login";
import Cities from "../components/City/Cities";
import MastersContainer from "../components/Admin/MastersContainer";
import Users from "../components/Admin/Users";
import Orders from "../components/Admin/Orders";
import Error404 from "../components/utilits/Error404";
import {MyRoute} from "../App";
import RegistrationWithReactHookForm from "../components/Registration/RegistrationWithReactHookForm";
import MyWorkplace from "../components/MyWorkplace/MyWorkplace";
import MyOffice from "../components/MyOffice/MyOffice";
import Blog from "../components/Blog/Blog";
import ChangeEmail from "../components/MyWorkplace/ChangeEmail";

export const createRoute = (role:string | null) => {
    const mainRouts: MyRoute[] = [
        {exact: true, path: "/", component: <StepperContainer/>},
        {exact: true, path: "/blog", component: <Blog/>},
        {exact: true, path: "/login", component: <Login/>},
        {exact: false, path: "/registration", component: <RegistrationWithReactHookForm/>},
    ]
    const adminRoutes: MyRoute[] = [
        {exact: false, path: "/menu/cities", component: <Cities/>},
        {exact: false, path: "/menu/masters", component: <MastersContainer/>},
        {exact: false, path: "/menu/users", component: <Users/>},
        {exact: false, path: "/menu/orders", component: <Orders/>},
        {exact: false, path: "/menu", component: <Orders/>},
    ]
    const userRoutes: MyRoute[] = [
        {exact: true, path: "/myOffice/:userId", component: <MyOffice/>},
        {exact: true, path: "/changeEmail", component: <ChangeEmail/>},
    ]
    const masterRoutes: MyRoute[]=[
        {exact: true, path: "/MyWorkplace/:masterId", component: <MyWorkplace/>},
        {exact: true, path: "/changeEmail", component: <ChangeEmail/>},
    ]
    const error = {exact: false, path: "*", component: <Error404/>}
    switch (role) {
        case 'ADMIN': return [...mainRouts, ...adminRoutes, error]
        case 'USER' : return [...mainRouts, ...userRoutes, error]
        case 'MASTER': return [...mainRouts, ...masterRoutes, error]
        default : return [...mainRouts, error]
    }
}
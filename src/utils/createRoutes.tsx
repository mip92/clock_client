import StepperContainer from "../components/Menu/StepperContainer";
import Login from "../components/Registration/Login";
import Cities from "../components/Admin/Cities/Cities";
import MastersContainer from "../components/Admin/Masters/MastersContainer";
import Users from "../components/Admin/Users/Users";
import Orders from "../components/Admin/Orders/Orders";
import Error404 from "../components/utilits/Error404";
import {MyRoute} from "../App";
import Registration from "../components/Registration/Registration";
<<<<<<< HEAD
=======
import MyWorkplace from "../components/MyWorkplace/MyWorkplace";
import MyOffice from "../components/MyOffice/MyOffice";
import Blog from "../components/Blog/Blog";
import ChangeEmail from "../components/MyWorkplace/ChangeEmail";
>>>>>>> registration

export const createRoute = (role:string | null) => {
    const mainRouts: MyRoute[] = [
        {exact: true, path: "/", component: <StepperContainer/>},
<<<<<<< HEAD
        {exact: false, path: "/login", component: <Login/>},
=======
        {exact: true, path: "/blog", component: <Blog/>},
        {exact: true, path: "/login", component: <Login/>},
>>>>>>> registration
        {exact: false, path: "/registration", component: <Registration/>},
    ]
    const adminRoutes: MyRoute[] = [
        {exact: false, path: "/menu/cities", component: <Cities/>},
        {exact: false, path: "/menu/masters", component: <MastersContainer/>},
        {exact: false, path: "/menu/users", component: <Users/>},
        {exact: false, path: "/menu/orders", component: <Orders/>},
<<<<<<< HEAD
        {exact: false, path: "/menu", component: <Orders />},

=======
        {exact: false, path: "/menu", component: <Orders/>},
>>>>>>> registration
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
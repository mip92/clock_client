import StepperContainer from "../components/Menu/StepperContainer";
import Login from "../components/Registration/Login";
import Cities from "../components/Admin/Cities/Cities";
import MastersContainer from "../components/Admin/Masters/MastersContainer";
import Users from "../components/Admin/Users/Users";
import Error404 from "../components/utilits/Error404";
import {MyRoute} from "../App";
import Registration from "../components/Registration/Registration";
import MyOffice from "../components/MyOffice/MyOffice";
import Blog from "../components/Blog/Blog";
import ChangeEmail from "../components/MyWorkplace/ChangeEmail";
import PayPalCompleted from "../components/Menu/PayPal/PayPalCompleted";
import OrdersContainer from "../components/Admin/Orders/OrdersContainer";
import MyWorkPlaceContainer from "../components/MyWorkplace/MyWorkPlaceContainer";
import {Role} from "../enums/Roles";
import NewComment from "../components/Comments/NewComment";
import MasterCalendar from "../components/MyWorkplace/Calendar/MasterCalendar";

export const createRoute = (role: Role | null) => {
    const mainRouts: MyRoute[] = [
        {exact: true, path: "/", component: <StepperContainer/>},
        {exact: true, path: "/blog", component: <Blog/>},
        {exact: true, path: "/login/", component: <Login/>},
        {exact: true, path: "/login/:key", component: <Login/>},
        {exact: false, path: "/registration", component: <Registration/>},
        {exact: false, path: "/completed", component: <PayPalCompleted/>},
        {exact: true, path: "/rating/:key", component: <NewComment/>}
    ]
    const adminRoutes: MyRoute[] = [
        {exact: false, path: "/menu/cities", component: <Cities/>},
        {exact: false, path: "/menu/masters", component: <MastersContainer/>},
        {exact: false, path: "/menu/users", component: <Users/>},
        {exact: false, path: "/menu/orders", component: <OrdersContainer/>},
        {exact: false, path: "/menu", component: <OrdersContainer/>},

    ]
    const userRoutes: MyRoute[] = [
        {exact: true, path: "/myOffice/:userId", component: <MyOffice/>},
        {exact: true, path: "/changeEmail", component: <ChangeEmail/>},

    ]
    const masterRoutes: MyRoute[] = [
        {exact: true, path: "/MyWorkplace/:masterId", component: <MyWorkPlaceContainer/>},
        {exact: true, path: "/changeEmail", component: <ChangeEmail/>},
        {exact: true, path: "/Calendar/:masterId", component: <MasterCalendar/>},
    ]
    const error = {exact: false, path: "*", component: <Error404/>}
    switch (role) {
        case Role.ADMIN:
            return [...mainRouts, ...adminRoutes, error]
        case Role.USER :
            return [...mainRouts, ...userRoutes, error]
        case Role.MASTER:
            return [...mainRouts, ...masterRoutes, error]
        default :
            return [...mainRouts, ...adminRoutes, ...userRoutes, ...masterRoutes, error]
    }
}
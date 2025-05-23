import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";
import Admin from './pages/Admin'
import Basket from './pages/Basket'
import Main from './pages/Main'
import Login from './pages/Login'
import Registration from './pages/Registration'


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },

]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    // {
    //     path: DEVICE_ROUTE + '/:id',
    //     Component: DevicePage
    // },
]

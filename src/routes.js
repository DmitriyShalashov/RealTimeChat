import { LOGIN_ROUTE,CHAT_ROUTE, HOME } from "./utils/consts";
import Login from './components/Login'
import Chat from './components/Chat'
import Main from "./components/Main";

export const publicRoutes=[
    {
        path:LOGIN_ROUTE,
        Component: <Login/>
    },
    {
        path:HOME,
        Component: <Main/>
    },
]
export const privateRoutes=[
    {
        path:CHAT_ROUTE,
        Component: <Chat/>
    },
]
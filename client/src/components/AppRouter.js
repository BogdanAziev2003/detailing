import {Route} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {

    let isAuth = false
    return (
        <>
            {isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
        </>
    );
});

export default AppRouter;

import * as React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import RouterList from './RouterList'

const RouterMap = () =>(
    <BrowserRouter>
        <Switch>
            {RouterList.Index.map(item=>(
                <Route
                key={item.path}
                exact={item.exact===undefined?false:item.exact}
                component={item.component}
                path={item.path}>
                </Route>
            ))}
        </Switch>
    </BrowserRouter>
)
export default RouterMap
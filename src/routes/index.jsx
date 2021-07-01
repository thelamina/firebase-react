import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from '../constants';
import { ProtectedRoute } from './ProtectedRoute';

const AppRouter = (props) => {
	return (
        <Switch>
            {ROUTES.map((route) => {
                return route.protected ? (
                    <ProtectedRoute
                        key={route.name}
                        {...route}
                        {...props}
                    />
                ) : (
                    <Route key={route.name} {...route} {...props} />
                )
            })}
        </Switch>
    )
};

export default AppRouter;

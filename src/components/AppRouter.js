import React, {useContext, useState} from 'react';
import {Routes, Route} from 'react-router-dom'
import { publicRoutes, privateRoutes } from '../routes';
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from '..';
function AppRouter() {


    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth)
    return ( 
       <Routes>
            {publicRoutes.map(({path, Component})=>
                <Route key={path} path={path} element={Component} exact></Route>
            )}
            
            
            {user?privateRoutes.map(({path, Component})=>
            <Route key={path} path={path} element={Component}></Route>
            )
            :''}
            
            
       </Routes>
     );
}

export default AppRouter;
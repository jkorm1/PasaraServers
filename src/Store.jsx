import { configureStore } from "@reduxjs/toolkit";
import gl_Var_Reducers from './Reducer'
//import webSocketMiddleware from "./webSocketMiddleware";


const store = configureStore({
    reducer:{
        gl_variables: gl_Var_Reducers,
    }
})

export default store;
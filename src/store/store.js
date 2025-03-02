import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../feature/authSlice";
const store= configureStore({
    reducer:{
        authSliceReducer
    
    }
})

export default store;
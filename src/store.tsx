import { configureStore } from "@reduxjs/toolkit";
import workSpacesReducer from "./slices/workSpaceSlice"


const store = configureStore({
    reducer: {
        workSpaces : workSpacesReducer,
    }
})

export default store
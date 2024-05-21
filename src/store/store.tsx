import { configureStore } from "@reduxjs/toolkit";

import workSpacesReducer from "./slices/workSpaceSlice";
import projectReducer from "./slices/projectSlice";
import modelReducer from "./slices/modelSlices";
import columnReducer from "./slices/columnSlice";

const store = configureStore({
  reducer: {
    workSpaces: workSpacesReducer,
    projectSlice: projectReducer,
    modelSlice: modelReducer,
    columnSlice: columnReducer,
  },
  devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

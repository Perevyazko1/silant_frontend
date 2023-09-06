import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {postApi} from "../../providers/Api/RtkService";
import authReducer from "../../providers/Api/models/slice/AuthSlice";
import carInfo from "../../providers/Api/models/slice/CarSlice";

const rootReducer = combineReducers({
    authReducer,
    carInfo,
    [postApi.reducerPath]: postApi.reducer
})

export const setupStore =() => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postApi.middleware)
    })
}
export type RootState = ReturnType<typeof  rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type  AppDispatch = AppStore["dispatch"]

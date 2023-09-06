import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Maintenance} from "../models/Maintenance";

export interface MaintenanceInfoState {
    maintenance:Maintenance;
}

const initialState: MaintenanceInfoState = {

    maintenance:{
        "id": null,
        "Вид ТО": null,
        "Дата заказ-наряда": null,
        "Дата проведения": null,
        "Машина": null,
        "Наработка, м/час": null,
        "№ заказ-наряда":null
}
}

export const maintenanceInfoSlice = createSlice({
    name: 'maintenanceInfo',
    initialState,
    reducers: {
        MaintenanceInfo(state, action: PayloadAction<Maintenance>){
            state.maintenance = action.payload
        },
    }
})

export default maintenanceInfoSlice.reducer;
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Maintenance} from "../models/Maintenance";

export interface MaintenanceInfoState {
    maintenance:Maintenance;
}

const initialState: MaintenanceInfoState = {

    maintenance:{
        "id": 0,
        "type_of_maintenance": "",
        "date_of_maintenance": "",
        "operating_time": "",
        "order_number": "",
        "order_date": "",
        "machine":"",
        "select_data":{
            "machine": {},
            "type_maintenance" : {}
        }
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
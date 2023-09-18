import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Maintenance} from "../models/Maintenance";

export interface MaintenanceInfoState {
    maintenance:Maintenance;
}

const initialState: MaintenanceInfoState = {

    maintenance:{
        "maintenance_data":[{
            "id": "",
            "type_of_maintenance__name": "",
            "date_of_maintenance": "",
            "operating_time": "",
            "order_number": "",
            "order_date": "",
            "machine_id__factory_number":""
        }]
        ,
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
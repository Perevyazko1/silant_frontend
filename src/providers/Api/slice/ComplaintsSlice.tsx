import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Complaints} from "../models/Complaints";

export interface ComplaintsInfoState {
    complaints:Complaints;
}

const initialState: ComplaintsInfoState = {

    complaints:{
        "complaints_data":[{
            "id": "",
            "date_of_refusal": "",
            "operating_time": "",
            "failure_node_id__name": "",
            "failure_description": "",
            "recovery_method_id__name": "",
            "parts_used": "",
            "date_of_restoration": "",
            "equipment_downtime": "",
            "machine_id__factory_number": "",
        }],
        'select_data': {
            'machine': {},
            'failure_node': {},
            'recovery_method': {}
        }

}
}

export const complaintsInfoSlice = createSlice({
    name: 'complaintsInfo',
    initialState,
    reducers: {
        ComplaintsInfo(state, action: PayloadAction<Complaints>){
            state.complaints = action.payload
        },
    }
})

export default complaintsInfoSlice.reducer;
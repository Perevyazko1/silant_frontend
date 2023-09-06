import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Complaints} from "../models/Complaints";

export interface ComplaintsInfoState {
    complaints:Complaints;
}

const initialState: ComplaintsInfoState = {

    complaints:{
        id: null,
        "Время простоя техники": null,
        "Дата восстановления": null,
        "Дата отказа": null,
        "Используемые запасные части": null,
        "Машина": null,
        "Наработка, м/час": null,
        "Описание отказа": null,
        "Способ восстановления": null,
        "Узел отказа": null,
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
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Car} from "../Car";

export interface CarInfoState {
    object:Car;
}

const initialState: CarInfoState = {

    object:{
  "Cервисная компания": null,
  "Адрес поставки (эксплуатации)": null,
  "Грузополучатель (конечный потребитель)": null,
  "Дата отгрузки с завода": null,
  "Договор поставки №, дата": null,
  "Зав. № ведущего моста": null,
  "Зав. № двигателя": null,
  "Зав. № машины": null,
  "Зав. № трансмиссии": null,
  "Зав. № управляемого моста": null,
  "Клиент": null,
  "Комплектация (доп. опции)": null,
  "Модель ведущего моста": null,
  "Модель двигателя": null,
  "Модель машины": null,
  "Модель трансмиссии": null,
  "Модель управляемого моста": null,
}
}

export const carInfoSlice = createSlice({
    name: 'carInfo',
    initialState,
    reducers: {
        infoCar(state, action: PayloadAction<Car>){
            state.object = action.payload
        },
    }
})

export default carInfoSlice.reducer;
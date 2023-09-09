import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Car} from "../models/Car";

export interface CarInfoState {
    car:Car;
    isloading:boolean
    numberCar: string
}

const initialState: CarInfoState = {

    car:{
  "Cервисная компания": "",
  "Адрес поставки (эксплуатации)": "",
  "Грузополучатель (конечный потребитель)": "",
  "Дата отгрузки с завода": "",
  "Договор поставки №, дата": "",
  "Зав. № ведущего моста": "",
  "Зав. № двигателя": "",
  "Зав. № машины": "",
  "Зав. № трансмиссии": "",
  "Зав. № управляемого моста": "",
  "Клиент": "",
  "Комплектация (доп. опции)": "",
  "Модель ведущего моста": "",
  "Модель двигателя": "",
  "Модель машины": "",
  "Модель трансмиссии": "",
  "Модель управляемого моста": "",
},
    isloading:false,
    numberCar: ""
}

export const carInfoSlice = createSlice({
    name: 'carInfo',
    initialState,
    reducers: {
        infoCar(state, action: PayloadAction<Car>){
            state.car = action.payload
        },
        numberCars(state, action: PayloadAction<string>){
            state.numberCar = action.payload
        },

        isLoadingCar(state, action: PayloadAction<boolean>){
            state.isloading = action.payload
        },

    }
})

export default carInfoSlice.reducer;
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Car} from "../models/Car";

export interface CarInfoState {
    car:Car;
    isloading:boolean
    numberCar: string
}

const initialState: CarInfoState = {

    car:{
  "service_company": "",
  "delivery_address": "",
  "consignee": "",
  "date_of_shipment": "",
  "delivery_contract": "",
  "driving_bridge_number": "",
  "engine_number": "",
  "factory_number": "",
  "transmission_number": "",
  "controlled_bridge_number": "",
  "client": "",
  "complete_set": "",
  "driving_bridge_model": "",
  "engine_model": "",
  "machine_model": "",
  "transmission_model": "",
  "controlled_bridge_model": "",
},
    isloading:false,
    numberCar: ""
}

export const carInfoSlice = createSlice({
    name: 'infoCar',
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
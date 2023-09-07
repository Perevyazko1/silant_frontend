import {memo, ReactNode, useEffect, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import { Form, Button, Container } from 'react-bootstrap';
import cls from "./Form.module.scss"
import {postApi} from "../../providers/Api/RtkService";
import {skipToken} from "@reduxjs/toolkit/query";
import MainAPI from "../../providers/Api/axios";
import {User} from "../../providers/Api/models/User";
import {useAppdispatch, useAppSelector} from "../../shared/hooks/redux";
import {carInfoSlice} from "../../providers/Api/slice/CarSlice";
import {maintenanceInfoSlice} from "../../providers/Api/slice/MaintenanceSlice";
import {complaintsInfoSlice} from "../../providers/Api/slice/ComplaintsSlice";

interface FormProps {
    className?: string
    children?: ReactNode
}


export const FormSearch = memo((props: FormProps) => {

    const dispatch = useAppdispatch()
    const {infoCar} = carInfoSlice.actions
    const {isLoadingCar} = carInfoSlice.actions
    const {MaintenanceInfo} = maintenanceInfoSlice.actions
    const {ComplaintsInfo} = complaintsInfoSlice.actions



    const [number_car,setNumber_car]=useState("")
    const [reqwest,setReqwest]=useState(false)

    console.log(`загрузка ${reqwest}`)



        const get_info = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try {
            let machine = await MainAPI.get_data(`service/api/machine/?factory_number=${number_car}`)
            let maintenance = await MainAPI.get_data(`service/api/maintenance/?factory_number=${number_car}`)
            let complaints = await MainAPI.get_data(`service/api/complaints/?factory_number=${number_car}`)

            dispatch(infoCar(machine))
            dispatch(MaintenanceInfo(maintenance))
            dispatch(ComplaintsInfo(complaints))
            dispatch((isLoadingCar(true)))
            if (!machine){
                alert("Такого номера не существует")
            }

        }
         catch (error) {
            console.log(`Ошибка ${error}`)
        }}




    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    return (
        <div
            className={classNames(cls.FormSearch, mods, [className])}
            {...otherProps}
        >
            <h2>Проверьте комплектацию и технические характеристики техники Силант</h2>
              <Form>
                <Form.Group controlId="formSerialNumber">
                  <Form.Label>Заводской номер</Form.Label>
                  <Form.Control onChange={(event) => setNumber_car(event.target.value)} type="text" placeholder="Введите заводской номер" />
                </Form.Group>
                <Button onClick={get_info} className={cls.Button} variant="warning" >
                  Найти
                </Button>
              </Form>
            {children}
        </div>
    );
});
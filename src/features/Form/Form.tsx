import {memo, ReactNode, useEffect, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {Button, Form} from 'react-bootstrap';
import cls from "./Form.module.scss"
import MainAPI from "../../providers/Api/axios";
import {useAppdispatch, useAppSelector} from "../../shared/hooks/Redux/redux";
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
    const {resetCar} = carInfoSlice.actions
    const {numberCar} = useAppSelector(state => state.carInfo)
    const {isLoadingCar} = carInfoSlice.actions
    const {MaintenanceInfo} = maintenanceInfoSlice.actions
    const {ComplaintsInfo} = complaintsInfoSlice.actions
    const {numberCars} =carInfoSlice.actions
    const {ComplaintIsDDownload} = complaintsInfoSlice.actions
    const {MaintenanceIsDDownload} = maintenanceInfoSlice.actions
    const {unit_complaint} = useAppSelector(state=>state.complaintsInfo)
    const {is_download_complaint} = useAppSelector(state => state.complaintsInfo)
    const {is_download_maintenance} =useAppSelector(state => state.maintenanceInfo)


    const [number_car,setNumber_car]=useState<string>()



        const get_info = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try {
            dispatch(resetCar())
            let machine = await MainAPI.get_data(`service/api/machine/?factory_number=${numberCar}`)
            dispatch(infoCar(machine))
            // console.log(machine)
            // dispatch(MaintenanceInfo(maintenance))
            // dispatch(ComplaintsInfo(complaints))
            dispatch((isLoadingCar(true)))
            if (!machine){
                alert("Такого номера не существует или данная машина вам не доступна")
            }

        }
         catch (error) {
            console.log(`Ошибка ${error}`)
        }}


        // useEffect(()=>{
        //     setNumber_car(numberCar)
        //     dispatch()
        // },[numberCar])

        useEffect(() => {
        const event = {
            preventDefault: () => {},
        };
            {numberCar  &&
            get_info(event);
        }

    }, []);

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
                  <Form.Control onChange={(event) => dispatch(numberCars(event.target.value))} type="text" placeholder="Введите заводской номер" />
                </Form.Group>
                <Button onClick={get_info} className={cls.Button} variant="warning" >
                  Найти
                </Button>
              </Form>
            {children}
        </div>
    );
});
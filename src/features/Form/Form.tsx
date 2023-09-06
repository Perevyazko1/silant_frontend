import {memo, ReactNode, useEffect, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import { Form, Button, Container } from 'react-bootstrap';
import cls from "./Form.module.scss"
import {postApi} from "../../providers/Api/RtkService";
import {skipToken} from "@reduxjs/toolkit/query";
import MainAPI from "../../providers/Api/axios";
import {User} from "../../providers/Api/models/User";
import {useAppdispatch, useAppSelector} from "../../shared/hooks/redux";
import {carInfoSlice} from "../../providers/Api/models/slice/CarSlice";

interface FormProps {
    className?: string
    children?: ReactNode
}


export const FormSearch = memo((props: FormProps) => {

    const dispatch = useAppdispatch()
    const {infoCar} = carInfoSlice.actions
    const {object} = useAppSelector(state=>state.carInfo)


    const [source,setSource]=useState("machine")
    const [number_car,setNumber_car]=useState("")
    const [reqwest,setReqwest]=useState(false)

    console.log(`загрузка ${reqwest}`)

    // const [data,setData] = useState("")
    // const [isLoading, setIsloading] = useState("")
    // const [error, setError] = useState("")

      const { data, isLoading, error } = postApi.useGetDataQuery({
        source: source,
        number_car: number_car,
        accessToken: "14ecfc3d6eef17475d7d8ee8526cc8f8fcfa39dd"
      },{skip:!reqwest});
      // setData(JSON.stringify(data));
      // setError(JSON.stringify(error));
      // setIsloading(JSON.stringify(isLoading));


        const get_info = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try {
            let result = await MainAPI.get_data(`service/api/${source}/?factory_number=${number_car}`)
            console.log(result)
            dispatch(infoCar(result))
            if (!result){
                alert("Такого номера не существует")
            }

        }


         catch (error) {
            console.log(`Ошибка ${error}`)
        }}



    // useEffect(()=>{
    //     console.log(result)
    //     console.log(isLoading)
    //     console.log(error)
    // },[result])



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
import {memo, ReactNode, useEffect, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {Button, Table, Form, InputGroup} from 'react-bootstrap';
import cls from "./Table.module.scss"
import {useAppdispatch, useAppSelector} from "../../shared/hooks/Redux/redux";
import MainAPI from "../../providers/Api/axios";
import {listMachineSlice} from "../../providers/Api/slice/ListMachineSlice";
import {carInfoSlice} from "../../providers/Api/slice/CarSlice";
import {InputSelect} from "../../shared/ui/InputSelect/InputSelect";
import {InputArea} from "../../shared/ui/InputArea/InputArea";
import {authPageSlice} from "../../providers/Api/slice/AuthSlice";
import maintenanceInfo from "../../providers/Api/slice/MaintenanceSlice";

interface TableProps {
    className?: string
    children?: ReactNode
}


export const TableSearch = memo((props: TableProps) => {
    const {complaints} = useAppSelector(state=>state.complaintsInfo)
    const {maintenance} = useAppSelector(state=>state.maintenanceInfo)


    const dispatch = useAppdispatch()
    const {infoCar} = carInfoSlice.actions
    const {resetCar} = carInfoSlice.actions
    const {car} = useAppSelector(state => state.carInfo)
    const {ListMachineSlice} = listMachineSlice.actions
    const {isRole} = authPageSlice.actions
    const {listMachine} =useAppSelector(state => state.listMachine)


    const {username} = useAppSelector(state=>state.authReducer)
    const {role} = useAppSelector(state=>state.authReducer)


    const [isCar,setIsCar]=useState<boolean>(true)
    const [isComplaints, setIsComplaints]=useState<boolean>()
    const [isMaintenance,setIsMaintenance]=useState<boolean>()
    const [updateRole, setUpdateRole] = useState("client")
    const [inputCar, setInputCar] =useState<string>(car.factory_number)

        async function save_machine() {
        let result = await MainAPI.post_data(`service/api/update_machine/`, car)
            console.log(result)
            alert(result.result)

    }



            const get_input_fields = async (event: { preventDefault: () => void; }) => {
                event.preventDefault();

                try {
                    let input_fields = await MainAPI.get_data(`service/api/machine_list/?`+
                            "factory_number=" +
                            "&machine_model=Все модели"+
                            "&engine_model=Все модели"+
                            "&transmission_model=Все модели"+
                            "&driving_bridge_model=Все модели"+
                            "&controlled_bridge_model=Все модели")
                    dispatch(ListMachineSlice(input_fields))
                        }

                 catch (error) {
                    console.log(`Ошибка ${error}`)
        }}
        useEffect(() => {
            const roleUser = localStorage.getItem("role_user");
            if (roleUser !== null && roleUser !== "anonymous" && roleUser !== "") { dispatch(isRole(roleUser));
            } }, []);
        useEffect(() => {
        const event = {
            preventDefault: () => {},
        }
            get_input_fields(event);
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
            className={classNames(cls.TableSearch, mods, [className])}
            {...otherProps}
        >
          <h4 className={cls.Header}>Информация о комплектации и технических характеристиках вашей техники</h4>
          <div className={cls.ContainerButton}>
            <Button onClick={()=>{setIsCar(true); setIsMaintenance(false); setIsComplaints(false)}} className={cls.Button} variant="warning">Общая инфо</Button>
              {role!=="anonymous" &&
                    <Button onClick={()=>{setIsCar(false); setIsMaintenance(true); setIsComplaints(false)}} className={cls.Button} variant="warning">ТО</Button>
              }
              {role!=="anonymous" &&
                    <Button onClick={()=>{setIsCar(false); setIsMaintenance(false); setIsComplaints(true)}} className={cls.Button} variant="warning">Рекламации</Button>
              }
          </div>

                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>Характеристика</th>
                        <th>Значение</th>
                    </tr>
                    </thead>
                    {isCar &&
                        <tbody>
                        <InputArea header={"Зав. № машины"} valueDispatch={"factory_number"} role={updateRole} valueInput={car.factory_number}/>
                        <InputSelect valueDispatch={"machine_model"} keyInput={"name"} role={role} listMachine={listMachine.filter_data.machine_models} valueInput={car.machine_model} header={"Модель машины"}/>
                        <InputSelect valueDispatch={"engine_model"} keyInput={"name"} role={role} listMachine={listMachine.filter_data.engine_models} valueInput={car.engine_model} header={"Модель двигателя"}/>
                        <InputArea role={role} valueInput={car.engine_number} valueDispatch={"engine_number"} header={"Зав. № двигателя"}/>
                        <InputSelect valueDispatch={"transmission_model"} keyInput={"name"} role={role} listMachine={listMachine.filter_data.transmission_models} valueInput={car.transmission_model} header={"Модель трансмиссии"}/>
                        <InputArea header={"Зав. № трансмиссии"} valueDispatch={"transmission_number"} role={role} valueInput={car.transmission_number}/>
                        <InputSelect valueDispatch={"driving_bridge_model"} keyInput={"name"} role={role} listMachine={listMachine.filter_data.driving_bridge_models} valueInput={car.driving_bridge_model} header={"Модель ведущего моста"}/>
                        <InputArea role={role} valueInput={car.driving_bridge_number} valueDispatch={"driving_bridge_number"} header={"Зав. № ведущего моста"}/>
                        <InputSelect valueDispatch={"controlled_bridge_model"} keyInput={"name"} role={role} listMachine={listMachine.filter_data.controlled_bridge_models} valueInput={car.controlled_bridge_model} header={"Модель управляемого моста"}/>
                        <InputArea role={role} valueInput={car.controlled_bridge_number} valueDispatch={"controlled_bridge_number"} header={"Зав. № управляемого моста"}/>
                        <InputArea role={role} valueInput={car.delivery_contract} valueDispatch={"delivery_contract"} header={"Договор поставки №, дата"} type={"date"}/>
                        <InputArea role={role} valueInput={car.date_of_shipment} valueDispatch={"date_of_shipment"} header={"Дата отгрузки с завода"} type={"date"}/>
                        <InputArea role={role} valueInput={car.consignee} valueDispatch={"consignee"} header={"Грузополучатель (конечный потребитель)"}/>
                        <InputArea role={role} valueInput={car.delivery_address} valueDispatch={"delivery_address"} header={"Адрес поставки (эксплуатации)"}/>
                        <InputArea role={role} valueInput={car.complete_set} valueDispatch={"complete_set"} header={"Комплектация (доп. опции)"}/>
                        <InputSelect valueDispatch={"client"} keyInput={"first_name"} role={role} listMachine={listMachine.users_data} valueInput={car.client} header={"Клиент"}/>
                        <InputSelect valueDispatch={"service_company"} keyInput={"first_name"} role={role} listMachine={listMachine.services_data} valueInput={car.service_company} header={"Cервисная компания"}/>
                        </tbody>
                    }
                    {isComplaints &&
                        <tbody>
                            <InputArea role={role} valueInput={complaints.date_of_refusal} valueDispatch={"date_of_refusal"} header={'Дата отказа'}/>
                            <InputArea role={role} valueInput={complaints.operating_time} valueDispatch={"operating_time"} header={'Наработка, м/час'}/>
                            <InputSelect role={role} listMachine={complaints.select_data.failure_node} valueInput={complaints.failure_node} header={'Узел отказа'} keyInput={'name'} valueDispatch={"failure_node"}/>
                            <InputArea role={role} valueInput={complaints.failure_description} valueDispatch={"failure_description"} header={'Описание отказа'}/>
                            <InputSelect role={role} listMachine={complaints.select_data.recovery_method} valueInput={complaints.recovery_method} header={'Способ восстановления'} keyInput={'name'} valueDispatch={"recovery_method"}/>
                            <InputArea role={role} valueInput={complaints.parts_used} valueDispatch={"parts_used"} header={'Используемые запасные части'}/>
                            <InputArea role={role} valueInput={complaints.date_of_restoration} valueDispatch={"date_of_restoration"} header={'Дата восстановления'}/>
                            <InputArea role={role} valueInput={complaints.get_equipment_downtimeget_equipment_downtime} valueDispatch={"get_equipment_downtimeget_equipment_downtime"} header={'Время простоя техники'}/>
                            <InputSelect role={role} listMachine={complaints.select_data.machine} valueInput={complaints.machine} header={'Машина'} keyInput={'factory_number'} valueDispatch={"machinecomplaints.select_data."}/>
                        {/*{complaints && Object.entries(complaints).map((key, value) =>*/}
                        {/*    <tr key={key[0]}>*/}
                        {/*        <td width='35%'>{key[0]}</td>*/}
                        {/*        <td>*/}
                        {/*            <Form.Control*/}
                        {/*                as="textarea"*/}
                        {/*                rows={1}*/}
                        {/*                value={key[1]}*/}
                        {/*                disabled={role !== 'manager'}*/}
                        {/*                // onChange={*/}
                        {/*                //     (e) => dispatch({*/}
                        {/*                //         type: "UPDATE_MACHINE_INFO",*/}
                        {/*                //         key: key[0],*/}
                        {/*                //         value: e.target.value*/}
                        {/*                //     })*/}
                        {/*                // }*/}
                        {/*            />*/}
                        {/*        </td>*/}
                        {/*    </tr>*/}
                        {/*)}*/}
                        </tbody>

                    }
                    {isMaintenance &&
                        <tbody>
                            <InputSelect role={role} listMachine={maintenance.select_data.type_maintenance} valueInput={maintenance.type_of_maintenance} header={"Вид ТО"} keyInput={"name"} valueDispatch={"type_of_maintenance"}/>
                            <InputArea role={role} valueInput={maintenance.operating_time} valueDispatch={"operating_time"} header={"Наработка, м/час"}/>
                            <InputArea role={role} valueInput={maintenance.date_of_maintenance} valueDispatch={"date_of_maintenance"} header={"Дата проведения"}/>
                            <InputArea role={role} valueInput={maintenance.order_number} valueDispatch={"order_number"} header={"№ заказ-наряда"}/>
                            <InputArea role={role} valueInput={maintenance.order_date} valueDispatch={"order_date"} header={"Дата заказ-наряда"}/>
                            <InputSelect role={role} listMachine={maintenance.select_data.machine} valueInput={maintenance.machine} header={"Машина"} keyInput={"factory_number"} valueDispatch={"machine"}/>
                        </tbody>

                    }

                </Table>
            {isCar &&
                <div>
                    {role == "manager" &&
                        <Button className={"m-2"} onClick={save_machine}>Сохранить</Button>
                    }
                    {role == "manager" &&
                        <Button className={"m-2"} onClick={() => {
                            dispatch(resetCar())
                            setUpdateRole(role)
                        }}>Создать новую машину</Button>
                    }
                </div>
            }
            {isMaintenance &&
                <div>
                    {role == "manager" &&
                        <Button className={"m-2"} onClick={save_machine}>Сохранить</Button>
                    }
                    {role == "manager" &&
                        <Button className={"m-2"} onClick={() => {
                            dispatch(resetCar())
                            setUpdateRole(role)
                        }}>Добавать ТО</Button>
                    }
                </div>
            }
            {isComplaints &&
                <div>
                    {role == "manager" &&
                        <Button className={"m-2"} onClick={save_machine}>Сохранить</Button>
                    }
                    {role == "manager" &&
                        <Button className={"m-2"} onClick={() => {
                            dispatch(resetCar())
                            setUpdateRole(role)
                        }}>Добавать Рекламацию</Button>
                    }
                    {children}
                </div>
            }
        </div>
    );
});
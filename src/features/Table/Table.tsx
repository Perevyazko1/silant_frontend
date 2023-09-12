import {memo, ReactNode, useEffect, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {Button, Table,Form} from 'react-bootstrap';
import cls from "./Table.module.scss"
import {useAppdispatch, useAppSelector} from "../../shared/hooks/Redux/redux";
import MainAPI from "../../providers/Api/axios";
import {listMachineSlice} from "../../providers/Api/slice/ListMachineSlice";
import {carInfoSlice} from "../../providers/Api/slice/CarSlice";
import {InputSelect} from "../../shared/ui/InputSelect/InputSelect";

interface TableProps {
    className?: string
    children?: ReactNode
}


export const TableSearch = memo((props: TableProps) => {
    const {complaints} = useAppSelector(state=>state.complaintsInfo)
    const {maintenance} = useAppSelector(state=>state.maintenanceInfo)


    const dispatch = useAppdispatch()
    const {infoCar} = carInfoSlice.actions
    const {car} = useAppSelector(state => state.carInfo)
    const {ListMachineSlice} = listMachineSlice.actions
    const {listMachine} =useAppSelector(state => state.listMachine)


    const {username} = useAppSelector(state=>state.authReducer)
    const {role} = useAppSelector(state=>state.authReducer)


    const [isCar,setIsCar]=useState<boolean>(true)
    const [isComplaints, setIsComplaints]=useState<boolean>()
    const [isMaintenance,setIsMaintenance]=useState<boolean>()
    const [inputCar, setInputCar] =useState<string>(car.factory_number)


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
        const event = {
            preventDefault: () => {},
        }
            get_input_fields(event);
        }, []);

        useEffect(()=>{
            console.log(listMachine)
        },[car])


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
            <Button onClick={()=>{setIsCar(false); setIsMaintenance(true); setIsComplaints(false)}} className={cls.Button} variant="warning">ТО</Button>
            <Button onClick={()=>{setIsCar(false); setIsMaintenance(false); setIsComplaints(true)}} className={cls.Button} variant="warning">Рекламации</Button>
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
                        <tr>
                            <td>Зав. № машины</td>
                            <td>
                                <Form.Control
                                    as="textarea"
                                    rows={1}
                                    value={inputCar}
                                    disabled={role !== 'manager'}
                                    onChange={event =>{
                                        dispatch(infoCar({ ...car, factory_number: inputCar }));
                                        setInputCar(event.target.value)}
                                }
                                />
                            </td>
                        </tr>
                        {/*<tr>*/}
                        {/*    <td>Модель машины</td>*/}
                        {/*    <td>*/}
                        {/*        <Form.Control disabled={role !== 'manager'} as="select">*/}
                        {/*            {*/}
                        {/*              Object.values(listMachine.filter_data.machine_models).map((model) => (*/}
                        {/*                <option  value={car.machine_model} key={model['name']}>{model['name']}</option>*/}
                        {/*            ))}*/}
                        {/*        </Form.Control>*/}
                        {/*    </td>*/}
                        {/*</tr>*/}
                        <InputSelect  role={role} listMachine={listMachine.filter_data.machine_models} car={car.machine_model} name={"Модель машины"}/>
                        <tr>
                            <td>Модель двигателя</td>
                            <td>
                                <Form.Control disabled={role !== 'manager'} as="select">
                                    {
                                      Object.values(listMachine.filter_data.engine_models).map((model) => (
                                        <option  value={car.engine_model} key={model['name']}>{model['name']}</option>
                                    ))}
                                </Form.Control>
                            </td>
                        </tr>
                        <tr>
                            <td>Зав. № двигателя</td>
                            <td>
                                <Form.Control
                                    as="textarea"
                                    rows={1}
                                    value={car.engine_number}
                                    disabled={role !== 'manager'}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Модель трансмиссии</td>
                            <td>
                                <Form.Control disabled={role !== 'manager'} as="select">
                                    {
                                      Object.values(listMachine.filter_data.transmission_models).map((model) => (
                                        <option  value={car.transmission_model} key={model['name']}>{model['name']}</option>
                                    ))}
                                </Form.Control>
                            </td>
                        </tr>
                        <tr>
                            <td>Зав. № трансмиссии</td>
                            <td>
                                <Form.Control
                                    as="textarea"
                                    rows={1}
                                    value={car.transmission_number}
                                    disabled={role !== 'manager'}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Модель ведущего моста</td>
                            <td>
                                <Form.Control disabled={role !== 'manager'} as="select">
                                    {
                                      Object.values(listMachine.filter_data.driving_bridge_models).map((model) => (
                                        <option  value={car.driving_bridge_model} key={model['name']}>{model['name']}</option>
                                    ))}
                                </Form.Control>
                            </td>
                        </tr>
                        <tr>
                            <td>Зав. № ведущего моста</td>
                            <td>
                                <Form.Control
                                    as="textarea"
                                    rows={1}
                                    value={car.driving_bridge_number}
                                    disabled={role !== 'manager'}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Модель управляемого моста</td>
                            <td>
                                <Form.Control disabled={role !== 'manager'} as="select">
                                    {
                                      Object.values(listMachine.filter_data.controlled_bridge_models).map((model) => (
                                        <option  value={car.controlled_bridge_model} key={model['name']}>{model['name']}</option>
                                    ))}
                                </Form.Control>


                            </td>
                        </tr>
                        <tr>
                            <td>Зав. № управляемого моста</td>
                            <td>
                                <Form.Control
                                    as="textarea"
                                    rows={1}
                                    value={car.controlled_bridge_number}
                                    disabled={role !== 'manager'}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Договор поставки №, дата</td>
                            <td>
                                {car.delivery_contract}
                                <Form.Control
                                    as="textarea"
                                    rows={1}
                                    value={car.delivery_contract}
                                    disabled={role !== 'manager'}
                                />

                            </td>
                        </tr>
                        <tr>
                            <td>Дата отгрузки с завода</td>
                            <td>
                                <Form.Control
                                    as="textarea"
                                    rows={1}
                                    value={car.date_of_shipmentdate_of_shipment}
                                    disabled={role !== 'manager'}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Грузополучатель (конечный потребитель)</td>
                            <td>
                                <Form.Control
                                    as="textarea"
                                    rows={1}
                                    value={car.consignee}
                                    disabled={role !== 'manager'}
                                />

                            </td>
                        </tr>
                        <tr>
                            <td>Адрес поставки (эксплуатации)</td>
                            <td>
                                <Form.Control
                                    as="textarea"
                                    rows={1}
                                    value={car.delivery_addressdelivery_address}
                                    disabled={role !== 'manager'}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Комплектация (доп. опции)</td>
                            <td>
                                {car.complete_set}
                                <Form.Control
                                    as="textarea"
                                    rows={1}
                                    value={car.delivery_addressdelivery_address}
                                    disabled={role !== 'manager'}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Клиент</td>
                            <td>
                                <Form.Control disabled={role !== 'manager'} as="select">
                                    {
                                      Object.values(listMachine.users_data).map((model) => (
                                        <option  value={car.client} key={model['first_name']}>{model['first_name']}</option>
                                    ))}
                                </Form.Control>
                            </td>
                        </tr>
                        <tr>
                            <td>Cервисная компания</td>
                            <td>
                                <Form.Control disabled={role !== 'manager'} as="select">
                                    {
                                      Object.values(listMachine.services_data).map((model) => (
                                        <option  value={car.service_company} key={model['first_name']}>{model['first_name']}</option>
                                    ))}
                                </Form.Control>

                            </td>
                        </tr>


                        {/*{car && Object.entries(car).map((key, value) =>*/}
                        {/*    <tr key={key[0]}>*/}
                        {/*        <td width='35%'>{key[0]}</td>*/}
                        {/*        <td>*/}
                        {/*            <Form.Control*/}
                        {/*                as="textarea"*/}
                        {/*                rows={1}*/}
                        {/*                value={car.client}*/}
                        {/*                disabled={role !== 'manager'}*/}
                        {/*            />*/}
                        {/*        </td>*/}
                        {/*    </tr>*/}
                        {/*)}*/}
                        </tbody>
                    }
                    {isComplaints &&
                        <tbody>
                        {complaints && Object.entries(complaints).map((key, value) =>
                            <tr key={key[0]}>
                                <td width='35%'>{key[0]}</td>
                                <td>
                                    <Form.Control
                                        as="textarea"
                                        rows={1}
                                        value={key[1]}
                                        disabled={role !== 'manager'}
                                        // onChange={
                                        //     (e) => dispatch({
                                        //         type: "UPDATE_MACHINE_INFO",
                                        //         key: key[0],
                                        //         value: e.target.value
                                        //     })
                                        // }
                                    />
                                </td>
                            </tr>
                        )}
                        </tbody>

                    }
                    {isMaintenance &&
                        <tbody>
                        {maintenance && Object.entries(maintenance).map((key, value) =>
                            <tr key={key[0]}>
                                <td width='35%'>{key[0]}</td>
                                <td>
                                    <Form.Control
                                        as="textarea"
                                        rows={1}
                                        value={key[1]}
                                        disabled={role !== 'manager'}
                                        // onChange={
                                        //     (e) => dispatch({
                                        //         type: "UPDATE_MACHINE_INFO",
                                        //         key: key[0],
                                        //         value: e.target.value
                                        //     })
                                        // }
                                    />
                                </td>
                            </tr>
                        )}
                        </tbody>

                    }

                </Table>

            {children}
        </div>
    );
});
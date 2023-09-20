import {memo, ReactNode, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./TableListCar.module.scss"
import {Table} from "react-bootstrap";
import {useAppdispatch, useAppSelector} from "../../shared/hooks/Redux/redux";
import {carInfoSlice} from "../../providers/Api/slice/CarSlice";
import {useNavigate} from "react-router-dom";

interface TableListCarProps {
    className?: string
    children?: ReactNode
}


export const TableListCar = memo((props: TableListCarProps) => {
    const dispatch = useAppdispatch()
    const {numberCars} = carInfoSlice.actions
    const {numberCar} = useAppSelector(state => state.carInfo)
    const {role} = useAppSelector(state=>state.authReducer)
    const {listMachine} =useAppSelector(state => state.listMachine)
    const navigate = useNavigate()
    // const [listMachine, setListMachine] = useState()
    const [showModal, setShowModal] = useState(false);


  const closeModal = () => {
    setShowModal(false);
  };





    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    return (
        <div
            className={classNames(cls.TableListCar, mods, [className])}
            {...otherProps}
        >
          <h4 className={cls.Header}>Список машин</h4>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Модель техники</th>
                            <th>Заводской номер</th>
                            <th>Модель двигателя</th>
                            <th>Зав. № двигателя</th>
                            <th>Модель трансмиссии</th>
                            <th>Зав. № трансмиссии</th>
                            <th>Модель ведущего моста</th>
                            <th>Зав. № ведущего моста</th>
                            <th>Модель управляемого моста</th>
                            <th>Зав. № управляемого моста</th>
                        </tr>
                    </thead>
                        <tbody>
                        {listMachine &&
                            Array.isArray(listMachine.machine_list_data) &&
                            listMachine.machine_list_data.map((machine) => (
                                <tr key={machine.id}
                                        onClick={() => {dispatch(numberCars(machine.factory_number))
                                                            navigate("/")
                                        }}
                                >
                                    <td>{machine.machine_model__name}</td>
                                    <td>{machine.factory_number}</td>
                                    <td>{machine.engine_model__name}</td>
                                     <td>{machine.engine_number}</td>
                                    <td>{machine.transmission_model__name}</td>
                                     <td>{machine.transmission_number}</td>
                                    <td>{machine.driving_bridge_model__name}</td>
                                     <td>{machine.driving_bridge_number}</td>
                                    <td>{machine.controlled_bridge_model__name}</td>
                                     <td>{machine.controlled_bridge_number}</td>
                                </tr>
                            ))}

                        </tbody>
                </Table>

            {children}
        </div>
    );
});
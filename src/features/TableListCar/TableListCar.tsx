import {memo, ReactNode, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./TableListCar.module.scss"
import {Button, Form, Table} from "react-bootstrap";
import {useAppSelector} from "../../shared/hooks/redux";
import MainAPI from "../../providers/Api/axios";

interface TableListCarProps {
    className?: string
    children?: ReactNode
}


export const TableListCar = memo((props: TableListCarProps) => {
    const {role} = useAppSelector(state=>state.authReducer)
    const {listMachine} =useAppSelector(state => state.listMachine)
    // const [listMachine, setListMachine] = useState()





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
                            <th>Машина</th>
                            <th>Заводской номер</th>
                            <th>Модель двигателя</th>
                            <th>Модель трансмиссии</th>
                            <th>Модель ведущего моста</th>
                            <th>Модель управляемого моста</th>
                        </tr>
                    </thead>
                        <tbody>
                        {listMachine &&
                            Array.isArray(listMachine.machine_list_data) &&
                            listMachine.machine_list_data.map((machine) => (
                                <tr key={machine.id}
                                    // onClick={() => get_info(machine.factory_number)}
                                >
                                    <td>{machine.machine_model__name}</td>
                                    <td>{machine.factory_number}</td>
                                    <td>{machine.engine_model__name}</td>
                                    <td>{machine.transmission_model__name}</td>
                                    <td>{machine.driving_bridge_model__name}</td>
                                    <td>{machine.controlled_bridge_model__name}</td>
                                </tr>
                            ))}

                        </tbody>
                </Table>

            {children}
        </div>
    );
});
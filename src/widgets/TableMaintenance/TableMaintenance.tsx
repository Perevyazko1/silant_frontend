import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./TableMaintenance.module.scss"
import {Form, Table} from "react-bootstrap";
import {useAppdispatch, useAppSelector} from "../../shared/hooks/Redux/redux";
import {maintenanceInfoSlice} from "../../providers/Api/slice/MaintenanceSlice";

interface TableMaintenanceProps {
    className?: string
    children?: ReactNode
}


export const TableMaintenance = memo((props: TableMaintenanceProps) => {
        const dispatch = useAppdispatch()
        const {maintenance} = useAppSelector(state=>state.maintenanceInfo)
        const {MaintenanceInfo} = maintenanceInfoSlice.actions



    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    return (
        <div
            className={classNames(cls.TableMaintenance, mods, [className])}
            {...otherProps}
        >
                        <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Дата проведения ТО</th>
                  <th>Вид технического обслуживания</th>
                  <th>Наработка, м/час</th>
                  <th>№ заказ-наряда</th>
                  <th>Дата заказ-наряда</th>
                  <th>Машина</th>
                </tr>
              </thead>
              <tbody>
                    <td><Form.Control
                        className={cls.TextSize} rows={1} as="textarea" value={maintenance.order_date}
                        onChange={event =>{
                        dispatch(MaintenanceInfo({...maintenance, order_date: event.target.value}));
                        }}

                    /></td>
                    <td>
                      <Form.Control
                          className={cls.TextSize}
                          as="select"
                          value={maintenance.type_of_maintenance}
                          onChange={event => {
                            dispatch(MaintenanceInfo({...maintenance, type_of_maintenance: event.target.value}));
                          }}
                      >
                            {
                              Object.values(maintenance.select_data.type_maintenance).map((model) => (
                                <option key={model['name']}>{model['name']}</option>
                            ))}
                            <option disabled={true}>Данные доступны для владельцев техники</option>
                      </Form.Control>
                    </td>
                    <td><Form.Control
                        className={cls.TextSize} rows={1} as="textarea" value={maintenance.operating_time}
                        onChange={event =>{
                        dispatch(MaintenanceInfo({...maintenance, operating_time: event.target.value}));
                        }}

                    /></td>
                    <td><Form.Control
                        className={cls.TextSize} rows={1} as="textarea" value={maintenance.order_number}
                        onChange={event =>{
                        dispatch(MaintenanceInfo({...maintenance, order_number: event.target.value}));
                        }}

                    /></td>
                    <td><Form.Control
                        className={cls.TextSize} rows={1} as="textarea" value={maintenance.date_of_maintenance}
                        onChange={event =>{
                        dispatch(MaintenanceInfo({...maintenance, date_of_maintenance: event.target.value}));
                        }}

                    /></td>
                    <td>
                      <Form.Control className={cls.TextSize} as="select"
                          value={maintenance.machine}
                          onChange={event => {
                            dispatch(MaintenanceInfo({...maintenance, machine: event.target.value}));
                          }}
                      >
                            {
                              Object.values(maintenance.select_data.machine).map((model) => (
                                <option key={model['factory_number']}>{model['factory_number']}</option>
                            ))}
                            <option disabled={true}>Данные доступны для владельцев техники</option>
                      </Form.Control>
                    </td>
              </tbody>
            </Table>

        </div>
    );
});
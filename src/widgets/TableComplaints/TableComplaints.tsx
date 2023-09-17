import {memo, ReactNode, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {Form, Table} from 'react-bootstrap';
import {useAppdispatch, useAppSelector} from "../../shared/hooks/Redux/redux";
import cls from "./TableComplaints.module.scss"
import {complaintsInfoSlice} from "../../providers/Api/slice/ComplaintsSlice";

interface TableComplaintsProps {
    className?: string
    children?: ReactNode
}


export const TableComplaints = memo((props: TableComplaintsProps) => {
    const {complaints} = useAppSelector(state=>state.complaintsInfo)
    const {car} = useAppSelector(state => state.carInfo)
    const {role} = useAppSelector(state=>state.authReducer)
    const [user_name, setUser_name] = useState(localStorage.getItem("first_name_user"))
    const dispatch = useAppdispatch()
    const {ComplaintsInfo} = complaintsInfoSlice.actions





    const {
        className,
        children,
        ...otherProps
    } = props
    
    const mods: Mods = {
        
    };
    
    return (
        <div
            className={classNames(cls.TableComplaints, mods, [className])}
            {...otherProps}
        >
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Дата Отказа</th>
                  <th>Дата Восстановления</th>
                  <th>Простой Техники ч.</th>
                  <th>Описание Отказа</th>
                  <th>Узел Отказа</th>
                  <th>Машина</th>
                  <th>Наработка, м/час</th>
                  <th>Используемые Запасные Части</th>
                  <th>Способ Восстановления</th>
                </tr>
              </thead>
              <tbody>
                {complaints.failure_node &&
                    <div>
                        <td><Form.Control
                            className={cls.TextSize} rows={1} as="textarea" value={complaints.date_of_refusal}
                            onChange={event =>{
                            dispatch(ComplaintsInfo({...complaints, date_of_refusal: event.target.value}));
                            }}

                        /></td>
                        <td><Form.Control
                            className={cls.TextSize} rows={1} as="textarea" value={complaints.date_of_restoration}
                            onChange={event =>{
                            dispatch(ComplaintsInfo({...complaints, date_of_restoration: event.target.value}));
                            }}

                        /></td>
                        <td><Form.Control
                            className={cls.TextSize} rows={1} as="textarea" value={String(complaints.equipment_downtime)}
                            onChange={event =>{
                            dispatch(ComplaintsInfo({...complaints, equipment_downtime: event.target.value}));
                            }}

                        /></td>
                        <td><Form.Control
                            className={cls.TextSize} rows={1} as="textarea" value={complaints.failure_description}
                            onChange={event =>{
                            dispatch(ComplaintsInfo({...complaints, failure_description: event.target.value}));
                            }}

                        /></td>
                        <td>
                          <Form.Control
                              className={cls.TextSize}
                              as="select"
                              value={complaints.failure_node}
                              onChange={event => {
                                dispatch(ComplaintsInfo({...complaints, failure_node: event.target.value}));
                              }}
                          >
                                {
                                  Object.values(complaints.select_data.failure_node).map((model) => (
                                    <option key={model['name']}>{model['name']}</option>
                                ))}
                                <option disabled={true}>Данные Вам недоступны</option>
                          </Form.Control>
                        </td>
                        <td>
                          <Form.Control className={cls.TextSize} as="select"
                              value={complaints.machine}
                              onChange={event => {
                                dispatch(ComplaintsInfo({...complaints, machine: event.target.value}));
                              }}
                          >
                                {
                                  Object.values(complaints.select_data.machine).map((model) => (
                                    <option key={model['factory_number']}>{model['factory_number']}</option>
                                ))}
                                <option disabled={true}>Данные Вам недоступны</option>
                          </Form.Control>
                        </td>
                        <td><Form.Control
                            className={cls.TextSize} rows={1} as="textarea" value={String(complaints.operating_time)}
                            onChange={event =>{
                            dispatch(ComplaintsInfo({...complaints, operating_time: event.target.value}));
                            }}

                        /></td>
                        <td><Form.Control
                            className={cls.TextSize} rows={1} as="textarea" value={complaints.parts_used}
                            onChange={event =>{
                            dispatch(ComplaintsInfo({...complaints, parts_used: event.target.value}));
                            }}

                        /></td>
                        <td>
                          <Form.Control className={cls.TextSize} as="select"
                              value={complaints.recovery_method}
                              onChange={event => {
                                dispatch(ComplaintsInfo({...complaints, recovery_method: event.target.value}));
                              }}
                          >
                                {
                                  Object.values(complaints.select_data.recovery_method).map((model) => (
                                    <option disabled={role !== "manager" || car.client !== user_name || car.service_company !== user_name} key={model['name']}>{model['name']}</option>
                                ))}
                                <option disabled={true}>Данные Вам недоступны</option>
                          </Form.Control>
                        </td>
                    </div>
                }
              </tbody>
            </Table>
        </div>
    );
});
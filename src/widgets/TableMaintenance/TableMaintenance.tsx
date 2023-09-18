import {memo, ReactNode, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./TableMaintenance.module.scss"
import {Button, Form, Modal, Table} from "react-bootstrap";
import {useAppdispatch, useAppSelector} from "../../shared/hooks/Redux/redux";
import {maintenanceInfoSlice} from "../../providers/Api/slice/MaintenanceSlice";
import {Maintenance} from "../../providers/Api/models/Maintenance";
import moment from 'moment'

interface TableMaintenanceProps {
    className?: string
    children?: ReactNode
}


export const TableMaintenance = memo((props: TableMaintenanceProps) => {
        const dispatch = useAppdispatch()
        const {unit_maintenance} =useAppSelector(state=>state.maintenanceInfo)
        const {maintenance} = useAppSelector(state=>state.maintenanceInfo)
        const {MaintenanceInfo} = maintenanceInfoSlice.actions
        const {MaintenanceUnit} = maintenanceInfoSlice.actions
        const {role} = useAppSelector(state=>state.authReducer)
        const {car} = useAppSelector(state => state.carInfo)
        const [user_name, setUser_name] = useState(localStorage.getItem("first_name_user"))
        const [show, setShow] = useState(false);
        const [idM, setIdm] = useState<string>()
        console.log(maintenance.select_data)


          const handleClose = () => setShow(false);
      const handleShow = () => {
          setShow(true);
      }


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
              {maintenance.maintenance_data.map((item)=>(
                  <tr key={item.id} onClick={()=>{handleShow();setIdm(item.id)}}>
                      <td>{moment(item.date_of_maintenance).format("DD.MM.YYYY")}</td>
                      <td>{item.type_of_maintenance__name}</td>
                      <td>{item.operating_time}</td>
                      <td>{item.order_number}</td>
                      <td>{moment(item.order_date).format("DD.MM.YYYY")}</td>
                      <td>{item.machine_id__factory_number}</td>
                  </tr>
              ))}
              </tbody>
            </Table>
                        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Редактирование ТО</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <td>
                        <tr>
                            <td>Вид технического обслуживания</td>
                                <td>
                                    <Form.Control
                                        disabled={role !== 'manager'}
                                        as="select"
                                        // value={valueInput}
                                onChange={event =>{
                                dispatch(MaintenanceUnit({...unit_maintenance, type_of_maintenance: event.target.value}));
                                }}
                                    >
                                        {
                                          Object.values(maintenance.select_data.type_maintenance).map((model) => (
                                            <option key={model['name']}>{model['name']}</option>
                                        ))}
                                    </Form.Control>
                                </td>

                        </tr>
                        <tr>
                        <td>Машина</td>
                            <td>
                                <Form.Control
                                    disabled={role !== 'manager'}
                                    as="select"
                                    // value={valueInput}
                                onChange={event =>{
                                dispatch(MaintenanceUnit({...unit_maintenance, machine: event.target.value}));
                                }}

                                >
                                    {
                                      Object.values(maintenance.select_data.machine).map((model) => (
                                        <option key={model['factory_number']}>{model['factory_number']}</option>
                                    ))}
                                </Form.Control>
                            </td>
                        </tr>
                        <tr>
                            <td>Дата проведения ТО</td>
                           <td>
                                <Form.Control
                                 rows={1} as="textarea"
                                onChange={event =>{
                                dispatch(MaintenanceUnit({...unit_maintenance, date_of_maintenance: event.target.value}));
                                }}
                            /></td>
                        </tr>
                        <tr>
                           <td>Наработка, м/час</td>
                           <td>
                                <Form.Control
                                 rows={1} as="textarea"
                                onChange={event =>{
                                dispatch(MaintenanceUnit({...unit_maintenance, operating_time: event.target.value}));
                                }}
                            /></td>
                        </tr>
                        <tr>
                           <td>№ заказ-наряда</td>
                           <td>
                                <Form.Control
                                 rows={1} as="textarea"
                                onChange={event =>{
                                dispatch(MaintenanceUnit({...unit_maintenance, order_number: event.target.value}));
                                }}
                            /></td>
                        </tr>
                        <tr>
                           <td>Дата заказ-наряда</td>
                           <td>
                                <Form.Control
                                 rows={1} as="textarea"
                                onChange={event =>{
                                dispatch(MaintenanceUnit({...unit_maintenance, order_date: event.target.value}));
                                }}
                            /></td>
                        </tr>
                    </td>
                    <Button onClick={()=> console.log(unit_maintenance)}>Сохранить</Button>
                </Modal.Body>
          </Modal>


        </div>
    );
});
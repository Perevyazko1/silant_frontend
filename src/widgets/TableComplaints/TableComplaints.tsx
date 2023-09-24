import {memo, ReactNode, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {Button, Form, Modal, Table} from 'react-bootstrap';
import {useAppdispatch, useAppSelector} from "../../shared/hooks/Redux/redux";
import cls from "./TableComplaints.module.scss"
import {complaintsInfoSlice} from "../../providers/Api/slice/ComplaintsSlice";
import moment from 'moment'
import MainAPI from "../../providers/Api/axios";

interface TableComplaintsProps {
    className?: string
    children?: ReactNode
}


export const TableComplaints = memo((props: TableComplaintsProps) => {
    const {complaints} = useAppSelector(state=>state.complaintsInfo)
    const {unit_complaint} = useAppSelector(state=>state.complaintsInfo)
    const {car} = useAppSelector(state => state.carInfo)
    const {role} = useAppSelector(state=>state.authReducer)
    const [user_name, setUser_name] = useState(localStorage.getItem("first_name_user"))
    const dispatch = useAppdispatch()
    const {ComplaintsInfo} = complaintsInfoSlice.actions
    const {ComplaintsUnit} = complaintsInfoSlice.actions
    const {ComplaintIsDDownload} = complaintsInfoSlice.actions
    const {ResetComplaint} = complaintsInfoSlice.actions
    const [show, setShow] = useState(false)
    const {is_download_complaint} = useAppSelector(state => state.complaintsInfo)
    const [updateRole, setUpdateRole] = useState("client")


    const handleClose = () => setShow(false);
      const handleShow = () => {
          setShow(true);
      }
      async function save_complaint() {
        let result = await MainAPI.post_data(`service/api/update_complaints/`, unit_complaint)
          dispatch(ComplaintIsDDownload(true))
            // dispatch(ComplaintsInfo({...complaints, complaints_data: result}));
            console.log(unit_complaint)

            alert(result.result)

    }


      const get_complaint_unit = async (event: { preventDefault: () => void; },id:string) => {
        event.preventDefault();

        try {
            let complaint_unit = await MainAPI.get_data(`service/api/complaints_unit/?complaint_id=${id}`)
            dispatch(ComplaintsUnit(complaint_unit))

            if (!complaint_unit){
                alert("Такой рекламации не существует")
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
            className={classNames(cls.TableComplaints, mods, [className])}
            {...otherProps}
        >
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Дата Отказа</th>
                  <th>Дата Восстановления</th>
                  <th>Простой Техники ч.</th>
                  <th>Узел Отказа</th>
                  <th>Описание Отказа</th>
                  <th>Машина</th>
                  <th>Наработка, м/час</th>
                  <th>Используемые Запасные Части</th>
                  <th>Способ Восстановления</th>
                </tr>
              </thead>
              <tbody>
              {complaints.complaints_data.map((item)=>(
                  <tr key={item.id} onClick={(event)=>{dispatch(ComplaintIsDDownload(false));handleShow(); setUpdateRole("client");get_complaint_unit(event,item.id)}}>
                      <td>{moment(item.date_of_refusal).format("DD.MM.YYYY")}</td>
                      <td>{moment(item.date_of_restoration).format("DD.MM.YYYY")}</td>
                      <td>{item.operating_time}</td>
                      <td>{item.failure_node_id__name}</td>
                      <td>{item.failure_description}</td>
                      <td>{item.machine_id__factory_number}</td>
                      <td>{item.equipment_downtime}</td>
                      <td>{item.parts_used}</td>
                      <td>{item.recovery_method_id__name}</td>
                  </tr>
              ))}
                        {/*<td><Form.Control*/}
                        {/*    className={cls.TextSize} rows={1} as="textarea" value={complaints.date_of_refusal}*/}
                        {/*    disabled={role !== "manager" || car.client !== user_name || car.service_company !== user_name}*/}
                        {/*    onChange={event =>{*/}
                        {/*    dispatch(ComplaintsInfo({...complaints, date_of_refusal: event.target.value}));*/}
                        {/*    }}*/}

                        {/*/></td>*/}
                        {/*<td><Form.Control*/}
                        {/*    className={cls.TextSize} rows={1} as="textarea" value={complaints.date_of_restoration}*/}
                        {/*    disabled={role !== "manager" || car.client !== user_name || car.service_company !== user_name}*/}
                        {/*    onChange={event =>{*/}
                        {/*    dispatch(ComplaintsInfo({...complaints, date_of_restoration: event.target.value}));*/}
                        {/*    }}*/}

                        {/*/></td>*/}
                        {/*<td><Form.Control*/}
                        {/*    className={cls.TextSize} rows={1} as="textarea" value={String(complaints.equipment_downtime)}*/}
                        {/*    disabled={role !== "manager" || car.client !== user_name || car.service_company !== user_name}*/}
                        {/*    onChange={event =>{*/}
                        {/*    dispatch(ComplaintsInfo({...complaints, equipment_downtime: event.target.value}));*/}
                        {/*    }}*/}

                        {/*/></td>*/}
                        {/*<td><Form.Control*/}
                        {/*    className={cls.TextSize} rows={1} as="textarea" value={complaints.failure_description}*/}
                        {/*    disabled={role !== "manager" || car.client !== user_name || car.service_company !== user_name}*/}
                        {/*    onChange={event =>{*/}
                        {/*    dispatch(ComplaintsInfo({...complaints, failure_description: event.target.value}));*/}
                        {/*    }}*/}

                        {/*/></td>*/}
                        {/*<td>*/}
                        {/*  <Form.Control*/}
                        {/*      className={cls.TextSize}*/}
                        {/*      as="select"*/}
                        {/*      value={complaints.failure_node}*/}
                        {/*      disabled={role !== "manager" || car.client !== user_name || car.service_company !== user_name}*/}
                        {/*      onChange={event => {*/}
                        {/*        dispatch(ComplaintsInfo({...complaints, failure_node: event.target.value}));*/}
                        {/*      }}*/}
                        {/*  >*/}
                        {/*        {*/}
                        {/*          Object.values(complaints.select_data.failure_node).map((model) => (*/}
                        {/*            <option key={model['name']}>{model['name']}</option>*/}
                        {/*        ))}*/}
                        {/*        <option disabled={true}>Данные Вам недоступны</option>*/}
                        {/*  </Form.Control>*/}
                        {/*</td>*/}
                        {/*<td>*/}
                        {/*  <Form.Control className={cls.TextSize} as="select"*/}
                        {/*      value={complaints.machine}*/}
                        {/*      onChange={event => {*/}
                        {/*        dispatch(ComplaintsInfo({...complaints, machine: event.target.value}));*/}
                        {/*      }}*/}
                        {/*  >*/}
                        {/*        {*/}
                        {/*          Object.values(complaints.select_data.machine).map((model) => (*/}
                        {/*            <option disabled={role !== "manager" || car.client !== user_name || car.service_company !== user_name}*/}
                        {/*                    key={model['factory_number']}>{model['factory_number']}</option>*/}
                        {/*        ))}*/}
                        {/*        <option disabled={true}>Данные Вам недоступны</option>*/}
                        {/*  </Form.Control>*/}
                        {/*</td>*/}
                        {/*<td><Form.Control*/}
                        {/*    className={cls.TextSize} rows={1} as="textarea" value={String(complaints.operating_time)}*/}
                        {/*    disabled={role !== "manager" || car.client !== user_name || car.service_company !== user_name}*/}
                        {/*    onChange={event =>{*/}
                        {/*    dispatch(ComplaintsInfo({...complaints, operating_time: event.target.value}));*/}
                        {/*    }}*/}

                        {/*/></td>*/}
                        {/*<td><Form.Control*/}
                        {/*    className={cls.TextSize} rows={1} as="textarea" value={complaints.parts_used}*/}
                        {/*    disabled={role !== "manager" || car.client !== user_name || car.service_company !== user_name}*/}
                        {/*    onChange={event =>{*/}
                        {/*    dispatch(ComplaintsInfo({...complaints, parts_used: event.target.value}));*/}
                        {/*    }}*/}

                        {/*/></td>*/}
                        {/*<td>*/}
                        {/*  <Form.Control className={cls.TextSize} as="select"*/}
                        {/*      value={complaints.recovery_method}*/}
                        {/*      onChange={event => {*/}
                        {/*        dispatch(ComplaintsInfo({...complaints, recovery_method: event.target.value}));*/}
                        {/*      }}*/}
                        {/*  >*/}
                        {/*        {*/}
                        {/*          Object.values(complaints.select_data.recovery_method).map((model) => (*/}
                        {/*            <option disabled={role !== "manager" || car.client !== user_name || car.service_company !== user_name} key={model['name']}>{model['name']}</option>*/}
                        {/*        ))}*/}
                        {/*        <option disabled={true}>Данные Вам недоступны</option>*/}
                        {/*  </Form.Control>*/}
                        {/*</td>*/}
              </tbody>
            </Table>
                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Редактирование Рекламации</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <td>
                        <tr>
                            <td>Узел отказа</td>
                                <td>
                                    <Form.Control
                                        as="select"
                                        value={unit_complaint.failure_node}
                                onChange={event =>{
                                dispatch(ComplaintsUnit({...unit_complaint, failure_node: event.target.value}));
                                }}
                                    >
                                        {
                                          Object.values(complaints.select_data.failure_node).map((model) => (
                                            <option key={model['name']}>{model['name']}</option>
                                        ))}
                                    </Form.Control>
                                </td>

                        </tr>
                        <tr>
                        <td>Способ восстановления</td>
                            <td>
                                <Form.Control
                                    as="select"
                                    value={unit_complaint.recovery_method}
                                onChange={event =>{
                                dispatch(ComplaintsUnit({...unit_complaint, recovery_method: event.target.value}));
                                }}

                                >
                                    {
                                      Object.values(complaints.select_data.recovery_method).map((model) => (
                                        <option key={model['name']}>{model['name']}</option>
                                    ))}
                                </Form.Control>
                            </td>
                        </tr>
                        <tr>
                        <td>Машина</td>
                            <td>
                                <Form.Control
                                    disabled={updateRole !== 'manager'}
                                    as="select"
                                    value={unit_complaint.machine}
                                onChange={event =>{
                                dispatch(ComplaintsUnit({...unit_complaint, machine: event.target.value}));
                                }}

                                >
                                    {
                                      Object.values(complaints.select_data.machine).map((model) => (
                                        <option  key={model['factory_number']}>{model['factory_number']}</option>
                                    ))}
                                </Form.Control>
                            </td>
                        </tr>
                        <tr>
                            <td>Дата Отказа</td>
                           <td>
                                <Form.Control
                                disabled={role=='client'}
                                 rows={1} as="textarea"
                                 value={unit_complaint.date_of_refusal}
                                onChange={event =>{
                                dispatch(ComplaintsUnit({...unit_complaint, date_of_refusal: event.target.value}));
                                }}
                            /></td>
                        </tr>
                        <tr>
                           <td>Дата Восстановления</td>
                           <td>
                                <Form.Control
                                disabled={role=='client'}
                                 rows={1} as="textarea"
                                 value={unit_complaint.date_of_restoration}
                                onChange={event =>{
                                dispatch(ComplaintsUnit({...unit_complaint, date_of_restoration: event.target.value}));
                                }}
                            /></td>
                        </tr>
                        <tr>
                           <td>Простой Техники ч.</td>
                           <td>
                                <Form.Control
                                disabled={role=='client'}
                                 rows={1} as="textarea"
                                 value={unit_complaint.equipment_downtime}
                                onChange={event =>{
                                dispatch(ComplaintsUnit({...unit_complaint, equipment_downtime: event.target.value}));
                                }}
                            /></td>
                        </tr>
                        <tr>
                           <td>Описание Отказа</td>
                           <td>
                                <Form.Control
                                disabled={role=='client'}
                                required
                                 rows={1} as="textarea"
                                 value={unit_complaint.failure_description}
                                onChange={event =>{
                                dispatch(ComplaintsUnit({...unit_complaint, failure_description: event.target.value}));
                                }}
                            /></td>
                        </tr>
                        <tr>
                           <td>Наработка, м/час</td>
                           <td>
                                <Form.Control
                                disabled={role=='client'}
                                 rows={1} as="textarea"
                                 value={unit_complaint.operating_time}
                                onChange={event =>{
                                dispatch(ComplaintsUnit({...unit_complaint, operating_time: event.target.value}));
                                }}
                            /></td>
                        </tr>
                        <tr>
                           <td>Используемые Запасные Части</td>
                           <td>
                                <Form.Control
                                disabled={role=='client'}
                                 rows={1} as="textarea"
                                 value={unit_complaint.parts_used}
                                onChange={event =>{
                                dispatch(ComplaintsUnit({...unit_complaint, parts_used: event.target.value}));
                                }}
                            /></td>
                        </tr>


                    </td>
                    {role!=="client" &&
                        <div>
                            <Button className={"m-2"} onClick={()=>{save_complaint();setShow(false)}} >Сохранить</Button>
                            <Button className={"m-2"} onClick={()=>{dispatch(ResetComplaint()); setUpdateRole("manager")}}>Создать новую Рекламацию</Button>
                        </div>
                    }
                </Modal.Body>
          </Modal>

        </div>
    );
});
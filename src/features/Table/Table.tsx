import {memo, ReactNode, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {Button, Table,Form} from 'react-bootstrap';
import cls from "./Table.module.scss"
import {useAppSelector} from "../../shared/hooks/Redux/redux";

interface TableProps {
    className?: string
    children?: ReactNode
}


export const TableSearch = memo((props: TableProps) => {
    const {car} = useAppSelector(state=>state.carInfo)
    const {complaints} = useAppSelector(state=>state.complaintsInfo)
    const {maintenance} = useAppSelector(state=>state.maintenanceInfo)

    const [isCar,setIsCar]=useState<boolean>(true)
    const [isComplaints, setIsComplaints]=useState<boolean>()
    const [isMaintenance,setIsMaintenance]=useState<boolean>()

    const {username} = useAppSelector(state=>state.authReducer)
    const {role} = useAppSelector(state=>state.authReducer)
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
            {username!=="не авторизирован" &&<h2 className={cls.Header}>{username}</h2>}
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
                        {car && Object.entries(car).map((key, value) =>
                            <tr key={key[0]}>
                                <td width='35%'>{key[0]}</td>
                                <td>
                                    <Form.Control
                                        as="textarea"
                                        rows={1}
                                        value={key[1]}
                                        disabled={role !== 'manager'}
                                    />
                                </td>
                            </tr>
                        )}
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
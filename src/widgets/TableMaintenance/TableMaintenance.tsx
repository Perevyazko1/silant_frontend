import {memo, ReactNode, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./TableMaintenance.module.scss"
import {Table} from "react-bootstrap";
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
        const {maintenance} = useAppSelector(state=>state.maintenanceInfo)
        const {MaintenanceInfo} = maintenanceInfoSlice.actions
        const {role} = useAppSelector(state=>state.authReducer)
        const {car} = useAppSelector(state => state.carInfo)
        const [user_name, setUser_name] = useState(localStorage.getItem("first_name_user"))
        const maintenances: Maintenance[] = [maintenance]
        console.log(maintenance)

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
                  <tr key={item.id}>
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

        </div>
    );
});
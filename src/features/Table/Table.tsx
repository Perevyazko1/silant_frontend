import {memo, ReactNode, useEffect, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {Button} from 'react-bootstrap';
import cls from "./Table.module.scss"
import {useAppdispatch, useAppSelector} from "../../shared/hooks/Redux/redux";
import MainAPI from "../../providers/Api/axios";
import {listMachineSlice} from "../../providers/Api/slice/ListMachineSlice";
import {carInfoSlice} from "../../providers/Api/slice/CarSlice";
import {authPageSlice} from "../../providers/Api/slice/AuthSlice";
import {TableComplaints} from "../../widgets/TableComplaints/TableComplaints";
import {TableCar} from "../../widgets/TableCar/TableCar";
import {TableMaintenance} from "../../widgets/TableMaintenance/TableMaintenance";

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
    const {first_name} = useAppSelector(state=>state.authReducer)
    const {role} = useAppSelector(state=>state.authReducer)
    console.log(first_name)
    // console.log(car.service_company)



    const [isCar,setIsCar]=useState<boolean>(true)
    const [isComplaints, setIsComplaints]=useState<boolean>()
    const [isMaintenance,setIsMaintenance]=useState<boolean>()
    const [updateRole, setUpdateRole] = useState("client")
    const [inputCar, setInputCar] =useState<string>(car.factory_number)
    const [user_name, setUser_name] = useState(localStorage.getItem("first_name_user"))
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
              {role!=="anonymous" && car.service_company === localStorage.getItem("first_name_user") &&
                    <Button onClick={()=>{setIsCar(false); setIsMaintenance(true); setIsComplaints(false)}} className={cls.Button} variant="warning">ТО</Button>
              }
              {role!=="anonymous" && car.service_company === localStorage.getItem("first_name_user") &&
                    <Button onClick={()=>{setIsCar(false); setIsMaintenance(false); setIsComplaints(true)}} className={cls.Button} variant="warning">Рекламации</Button>
              }
          </div>
            {isCar &&
                <TableCar/>
            }
            {isComplaints &&
                <TableComplaints/>
            }
            {isMaintenance &&
                <TableMaintenance/>
            }
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
                    {role == "manager" || car.client == user_name || car.service_company == user_name &&
                        <Button className={"m-2"} >Сохранить</Button>
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
                    {role == "manager" || car.client == user_name || car.service_company == user_name &&
                        <Button className={"m-2"} >Сохранить</Button>
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
import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import { Form, Button } from 'react-bootstrap';
import cls from "./Filter.module.scss"
import MainAPI from "../../providers/Api/axios";
import {useAppdispatch, useAppSelector} from "../../shared/hooks/redux";
import {listMachineSlice} from "../../providers/Api/slice/ListMachineSlice";

interface FilterProps {
    className?: string
    children?: ReactNode
}


export const Filter = memo((props: FilterProps) => {


            const dispatch = useAppdispatch()
            const {ListMachineSlice} = listMachineSlice.actions
            const {listMachine} =useAppSelector(state => state.listMachine)
            const get_list_machine = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try {
            let list_machine = await MainAPI.get_data(`service/api/machine_list/?factory_number=&machine_model=Все модели&engine_model=Все модели&transmission_model=Все модели&driving_bridge_model=Все модели&controlled_bridge_model=Все модели`)
                dispatch(ListMachineSlice(list_machine))
            if (!list_machine){
                alert("Такого номера не существует")
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
            className={classNames(cls.Filter, mods, [className])}
            {...otherProps}
        >
            <Form className={cls.Form}>
              <Form.Group className={cls.Input} controlId="formSerialNumber">
                <Form.Label>Заводской номер машины</Form.Label>
                <Form.Control  type="text" placeholder="Введите заводской номер" />
              </Form.Group>

              <Form.Group className={cls.Input} controlId="formModel">
                <Form.Label>Модель техники</Form.Label>
                <Form.Control as="select">
                  <option>Все модели</option>
                  {listMachine &&
                      Object.values(listMachine.filter_data.controlled_bridge_models).map((model) => (
                        <option key={model['name']}>{model['name']}</option>
                    ))}
                </Form.Control>
              </Form.Group>

              <Form.Group className={cls.Input} controlId="formEngineModel">
                <Form.Label>Модель двигателя</Form.Label>
                <Form.Control as="select">
                  <option>Все модели</option>
                    {listMachine &&
                      Object.values(listMachine.filter_data.driving_bridge_models).map((model) => (
                        <option key={model['name']}>{model['name']}</option>
                    ))}

                </Form.Control>
              </Form.Group>

              <Form.Group className={cls.Input} controlId="formTransmissionModel">
                <Form.Label>Модель трансмиссии</Form.Label>
                <Form.Control as="select">
                  <option>Все модели</option>
                    {listMachine &&
                      Object.values(listMachine.filter_data.engine_models).map((model) => (
                        <option key={model['name']}>{model['name']}</option>
                    ))}

                </Form.Control>
              </Form.Group>

              <Form.Group className={cls.Input} controlId="formAxleModel">
                <Form.Label>Модель ведущего моста</Form.Label>
                <Form.Control as="select">
                  <option>Все модели</option>
                    {listMachine &&
                      Object.values(listMachine.filter_data.machine_models).map((model) => (
                        <option key={model['name']}>{model['name']}</option>
                    ))}

                </Form.Control>
              </Form.Group>

              <Form.Group className={cls.Input} controlId="formSteeringModel">
                <Form.Label>Модель управляемого моста</Form.Label>
                <Form.Control as="select">
                  <option>Все модели</option>
                    {listMachine &&
                      Object.values(listMachine.filter_data.transmission_models).map((model) => (
                        <option key={model['name']}>{model['name']}</option>
                    ))}

                </Form.Control>
              </Form.Group>
                <div className={cls.Button}>
                  <Button onClick={get_list_machine} className="m-3" variant="warning" type="submit">
                        Найти
                  </Button>
                </div>

            </Form>
            {children}
        </div>
    );
});
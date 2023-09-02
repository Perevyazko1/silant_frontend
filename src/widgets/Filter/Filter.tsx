import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import { Form, Button } from 'react-bootstrap';
import cls from "./Filter.module.scss"

interface FilterProps {
    className?: string
    children?: ReactNode
}


export const Filter = memo((props: FilterProps) => {
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
                  <option>Выберите модель техники</option>
                  <option>Модель 1</option>
                  <option>Модель 2</option>
                  <option>Модель 3</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className={cls.Input} controlId="formEngineModel">
                <Form.Label>Модель двигателя</Form.Label>
                <Form.Control as="select">
                  <option>Выберите модель двигателя</option>
                  <option>Модель 1</option>
                  <option>Модель 2</option>
                  <option>Модель 3</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className={cls.Input} controlId="formTransmissionModel">
                <Form.Label>Модель трансмиссии</Form.Label>
                <Form.Control as="select">
                  <option>Выберите модель трансмиссии</option>
                  <option>Модель 1</option>
                  <option>Модель 2</option>
                  <option>Модель 3</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className={cls.Input} controlId="formAxleModel">
                <Form.Label>Модель ведущего моста</Form.Label>
                <Form.Control as="select">
                  <option>Выберите модель ведущего моста</option>
                  <option>Модель 1</option>
                  <option>Модель 2</option>
                  <option>Модель 3</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className={cls.Input} controlId="formSteeringModel">
                <Form.Label>Модель управляемого моста</Form.Label>
                <Form.Control as="select">
                  <option>Выберите модель управляемого моста</option>
                  <option>Модель 1</option>
                  <option>Модель 2</option>
                  <option>Модель 3</option>
                </Form.Control>
              </Form.Group>
                <div className={cls.Button}>
                  <Button className="m-3" variant="warning" type="submit">
                        Найти
                  </Button>
                </div>

            </Form>
            {children}
        </div>
    );
});
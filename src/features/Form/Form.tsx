import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import { Form, Button, Container } from 'react-bootstrap';
import cls from "./Form.module.scss"

interface FormProps {
    className?: string
    children?: ReactNode
}


export const FormSearch = memo((props: FormProps) => {
    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    return (
        <div
            className={classNames(cls.FormSearch, mods, [className])}
            {...otherProps}
        >
            <h2>Проверьте комплектацию и технические характеристики техники Силант</h2>
              <Form>
                <Form.Group controlId="formSerialNumber">
                  <Form.Label>Заводской номер</Form.Label>
                  <Form.Control type="text" placeholder="Введите заводской номер" />
                </Form.Group>
                <Button className={cls.Button} variant="warning" type="submit">
                  Найти
                </Button>
              </Form>
            {children}
        </div>
    );
});
import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {Button, Table} from 'react-bootstrap';
import cls from "./Table.module.scss"

interface TableProps {
    className?: string
    children?: ReactNode
}


export const TableSearch = memo((props: TableProps) => {
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
            <h2 className={cls.Header}>Клиент/Сервисная компания</h2>
          <h4 className={cls.Header}>Информация о комплектации и технических характеристиках вашей техники</h4>
          <div className={cls.ContainerButton}>
            <Button className={cls.Button} variant="warning">Общая инфо</Button>
            <Button className={cls.Button} variant="warning">ТО</Button>
            <Button className={cls.Button} variant="warning">Рекламации</Button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Номер авто</th>
                <th>Номер двс</th>
                <th>Номер шасси</th>
              </tr>
            </thead>
            <tbody>
              {/* Вставьте здесь реальные данные */}
              <tr>
                <td>А123BC</td>
                <td>D123456</td>
                <td>123456789</td>
              </tr>
              <tr>
                <td>В456DE</td>
                <td>D654321</td>
                <td>987654321</td>
              </tr>
              {/* ... и т.д. */}
            </tbody>
          </Table>
            {children}
        </div>
    );
});
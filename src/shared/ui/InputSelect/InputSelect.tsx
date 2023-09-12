import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {Form} from "react-bootstrap";

interface InputSelectProps {
    className?: string
    children?: ReactNode
    role: string
    listMachine: object
    car: string
    name: string
}


export const InputSelect = memo((props: InputSelectProps) => {
    const {
        className,
        children,
        role,
        listMachine,
        car,
        name,
        ...otherProps

    } = props
    
    const mods: Mods = {
        
    };
    
    return (
        <tr
            className={classNames('', mods, [className])}
            {...otherProps}
        >
                    <td>{name}</td>
                    <td>
                        <Form.Control disabled={role !== 'manager'} as="select">
                            {
                              Object.values(listMachine).map((model) => (
                                <option  value={car} key={model['name']}>{model['name']}</option>
                            ))}
                        </Form.Control>
                    </td>
        </tr>
    );
});
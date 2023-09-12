import {memo, ReactNode, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {Form} from "react-bootstrap";
import {useAppdispatch, useAppSelector} from "../../hooks/Redux/redux";
import {carInfoSlice} from "../../../providers/Api/slice/CarSlice";

interface InputAreaProps {
    className?: string
    children?: ReactNode
    // onChange: () => event
    role: string
    valueInput: string
    valueDispatch: string
    header: string
}


export const InputArea = memo((props: InputAreaProps) => {



    const {
        className,
        children,
        // onChange,
        role,
        valueDispatch,
        valueInput,
        header,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    const dispatch = useAppdispatch()
    const {infoCar} = carInfoSlice.actions
    const {car} = useAppSelector(state => state.carInfo)
    const [inputCar, setInputCar] =useState<string>(valueInput)


    return (
        <tr
            className={classNames('', mods, [className])}
            {...otherProps}
        >
            <td>{header}</td>
            <td>
                <Form.Control
                    as="textarea"
                    rows={1}
                    value={valueInput}
                    disabled={role !== 'manager'}
                    onChange={event =>{
                        dispatch(infoCar({ ...car, [valueDispatch]: event.target.value }));
                    }
                }
                />
            </td>
        </tr>
    );
});
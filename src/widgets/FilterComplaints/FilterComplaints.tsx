import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./FilterComplaints.module.scss"

interface FilterComplaintsProps {
    className?: string
    children?: ReactNode
}


export const FilterComplaints = memo((props: FilterComplaintsProps) => {
    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    return (
        <div
            className={classNames(cls.FilterComplaints, mods, [className])}
            {...otherProps}
        >
            {children}
        </div>
    );
});
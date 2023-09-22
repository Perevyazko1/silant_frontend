import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./FilterMaintenance.module.scss"

interface FilterMaintenanceProps {
    className?: string
    children?: ReactNode
}


export const FilterMaintenance = memo((props: FilterMaintenanceProps) => {
    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    return (
        <div
            className={classNames(cls.FilterMaintenance, mods, [className])}
            {...otherProps}
        >
            {children}
        </div>
    );
});
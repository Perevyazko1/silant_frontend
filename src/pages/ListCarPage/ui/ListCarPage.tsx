import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./ListCarPage.module.scss"

interface ListCarPageProps {
    className?: string
    children?: ReactNode
}


 const ListCarPage = memo((props: ListCarPageProps) => {
    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    return (
        <div
            className={classNames(cls.ListCarPage, mods, [className])}
            {...otherProps}
        >
            {children}
        </div>
    );
});
export default ListCarPage
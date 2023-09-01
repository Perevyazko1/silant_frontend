import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./MainPage.module.scss"
import {Form} from "react-bootstrap";
import {FormSearch} from "../../../features/Form/Form";
import {PageWrapper} from "../../../shared/ui/PageWrapper/PageWrapper";
import {TableSearch} from "../../../features/Table/Table";

interface MainPageProps {
    className?: string
    children?: ReactNode
}


const MainPage = memo((props: MainPageProps) => {
    const {
        className,
        children,
        ...otherProps
    } = props




    const mods: Mods = {
        
    };
    
    return (
        <PageWrapper>
            <div
                className={classNames(cls.MainPage, mods, [className])}
                {...otherProps}
            >
                <FormSearch/>
                <TableSearch/>
            </div>
        </PageWrapper>
    );
});
export default MainPage
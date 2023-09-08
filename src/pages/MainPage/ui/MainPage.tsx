import {memo, ReactNode, useEffect, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./MainPage.module.scss"
import {Form} from "react-bootstrap";
import {FormSearch} from "../../../features/Form/Form";
import {PageWrapper} from "../../../shared/ui/PageWrapper/PageWrapper";
import {TableSearch} from "../../../features/Table/Table";
import {postApi} from "../../../providers/Api/RtkService";
import {User} from "../../../providers/Api/models/User";
import {useAppSelector} from "../../../shared/hooks/Redux/redux";

interface MainPageProps {
    className?: string
    children?: ReactNode
}


const MainPage = memo((props: MainPageProps) => {

    const {isloading}=useAppSelector(state=>state.carInfo)
    console.log(`проверка${isloading}`)
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
                {isloading && <TableSearch/>}
            </div>
        </PageWrapper>
    );
});
export default MainPage
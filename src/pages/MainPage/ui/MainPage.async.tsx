import {FC, lazy,Suspense} from "react";
import ListCarPage from "../../ListCarPage/ui/ListCarPage";

export const MainPageAsync = lazy<FC>(() => import('./MainPage'));

export const DetailsListCarPage = () => (
  <Suspense>
    <MainPageAsync />
  </Suspense>
)
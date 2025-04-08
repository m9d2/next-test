'use client'
import Icon from "@/app/components/Icon";
import useSWR from "swr";
import {getFetcher} from "@/app/utils/fetcher";

const useMenu = () => {
    console.log('useMenu')
    const {data, error, isLoading} = useSWR('/menu/tree', getFetcher)
    console.log(data, error, isLoading)
    const menus = (data?.data || []).map((item: any) => ({
        path: item.url,
        name: item.name,
        icon: <Icon name={item.icon}/>,
        routes: item.children?.map((child: any) => ({
            path: child.url,
            name: child.name,
            icon: <Icon name={item.icon}/>,
        }))
    }));

    return {
        menus,
        error,
        isLoading
    }
}

export default useMenu;

'use client'
import useFetch from "@/app/hooks/useFetch";
import Icon from "@/app/components/Icon";

const useMenu = () => {
    const {data, error, isLoading} = useFetch<any>(['/menu/tree'], {url: '/menu/tree'})
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

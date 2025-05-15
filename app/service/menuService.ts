import axiosFetch from "@/app/utils/axiosFetch";

export async function getMenus() {
    const res: any = await axiosFetch({url: '/menu/tree', method: 'GET'})
    return res.data
}

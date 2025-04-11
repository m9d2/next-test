import axiosFetch from "@/app/utils/axiosFetch";

export async function getUsers(params: any) {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const res: any = await axiosFetch({url: '/user', method: 'GET', params: params})
    return res.data
}

export async function updateUser(data: any) {
    const res: any = await axiosFetch({url: '/user', method: 'PUT', data})
    return res.data
}

export async function deleteUser(id: number) {
    const res: any = await axiosFetch({url: '/user', method: 'DELETE', params: {id}})
    console.log('删除成功-', id)
    return res.data
}


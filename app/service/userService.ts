import axiosFetch from "@/app/utils/axiosFetch";

export async function getUsers(params: any) {
    if (params.page && params.page > 0) {
        params.page = params.page - 1
    }
    const res: any = await axiosFetch({url: '/user/page', method: 'POST', data: params})
    return res.data
}

export async function updateUser(data: any) {
    const res: any = await axiosFetch({url: '/user/update?id=' + data.id, method: 'POST', data})
    return res.data
}

export async function saveUser(data: any) {
    const res: any = await axiosFetch({url: '/user/save', method: 'POST', data})
    return res.data
}

export async function deleteUser(id: number) {
    const res: any = await axiosFetch({url: '/user/delete', method: 'GET', params: {id}})
    return res.data
}


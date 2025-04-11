export const dynamic = 'force-static';
export const revalidate = 60;
import {NextResponse} from "next/server";

const data = {
    "code": 200,
    "msg": "操作成功",
    "data": {
        "content": [
            {
                "id": 1,
                "createdDate": "2025-04-04 19:28:42",
                "lastModifiedDate": "2025-04-04 19:28:45",
                "name": "高阳1",
                "username": "gy1",
                "phone": "13008590101",
                "gender": "1",
                "avatar": null,
                "email": "user1@example.com",
                "status": 1,
                "statusDesc": "禁用",
                "remark": null,
                "roleId": null,
                "roleName": null
            },
            {
                "id": 2,
                "createdDate": "2025-04-04 19:28:42",
                "lastModifiedDate": "2025-04-04 19:28:45",
                "name": "高阳2",
                "username": "gy2",
                "phone": "13008590102",
                "gender": "2",
                "avatar": null,
                "email": "user2@example.com",
                "status": 0,
                "statusDesc": "正常",
                "remark": null,
                "roleId": null,
                "roleName": null
            },
            {
                "id": 3,
                "createdDate": "2025-04-04 19:28:42",
                "lastModifiedDate": "2025-04-04 19:28:45",
                "name": "高阳3",
                "username": "gy3",
                "phone": "13008590103",
                "gender": "1",
                "avatar": null,
                "email": "user3@example.com",
                "status": 1,
                "statusDesc": "禁用",
                "remark": null,
                "roleId": null,
                "roleName": null
            },
            {
                "id": 4,
                "createdDate": "2025-04-04 19:28:42",
                "lastModifiedDate": "2025-04-04 19:28:45",
                "name": "高阳4",
                "username": "gy4",
                "phone": "13008590104",
                "gender": "2",
                "avatar": null,
                "email": "user4@example.com",
                "status": 0,
                "statusDesc": "正常",
                "remark": null,
                "roleId": null,
                "roleName": null
            },
            {
                "id": 5,
                "createdDate": "2025-04-04 19:28:42",
                "lastModifiedDate": "2025-04-04 19:28:45",
                "name": "高阳5",
                "username": "gy5",
                "phone": "13008590105",
                "gender": "1",
                "avatar": null,
                "email": "user5@example.com",
                "status": 1,
                "statusDesc": "禁用",
                "remark": null,
                "roleId": null,
                "roleName": null
            },
            {
                "id": 6,
                "createdDate": "2025-04-04 19:28:42",
                "lastModifiedDate": "2025-04-04 19:28:45",
                "name": "高阳6",
                "username": "gy6",
                "phone": "13008590106",
                "gender": "2",
                "avatar": null,
                "email": "user6@example.com",
                "status": 0,
                "statusDesc": "正常",
                "remark": null,
                "roleId": null,
                "roleName": null
            },
            {
                "id": 7,
                "createdDate": "2025-04-04 19:28:42",
                "lastModifiedDate": "2025-04-04 19:28:45",
                "name": "高阳7",
                "username": "gy7",
                "phone": "13008590107",
                "gender": "1",
                "avatar": null,
                "email": "user7@example.com",
                "status": 1,
                "statusDesc": "禁用",
                "remark": null,
                "roleId": null,
                "roleName": null
            },
            {
                "id": 8,
                "createdDate": "2025-04-04 19:28:42",
                "lastModifiedDate": "2025-04-04 19:28:45",
                "name": "高阳8",
                "username": "gy8",
                "phone": "13008590108",
                "gender": "2",
                "avatar": null,
                "email": "user8@example.com",
                "status": 1,
                "statusDesc": "禁用",
                "remark": null,
                "roleId": null,
                "roleName": null
            },
            {
                "id": 9,
                "createdDate": "2025-04-04 19:28:42",
                "lastModifiedDate": "2025-04-04 19:28:45",
                "name": "高阳9",
                "username": "gy9",
                "phone": "13008590109",
                "gender": "1",
                "avatar": null,
                "email": "user9@example.com",
                "status": 1,
                "statusDesc": "禁用",
                "remark": null,
                "roleId": null,
                "roleName": null
            },
            {
                "id": 10,
                "createdDate": "2025-04-04 19:28:42",
                "lastModifiedDate": "2025-04-04 19:28:45",
                "name": "高阳10",
                "username": "gy10",
                "phone": "13008590110",
                "gender": "2",
                "avatar": null,
                "email": "user10@example.com",
                "status": 1,
                "statusDesc": "禁用",
                "remark": null,
                "roleId": null,
                "roleName": null
            }
        ],
        "pageable": {
            "sort": {
                "empty": true,
                "unsorted": true,
                "sorted": false
            },
            "offset": 0,
            "pageNumber": 0,
            "pageSize": 10,
            "unpaged": false,
            "paged": true
        },
        "totalPages": 2,
        "totalElements": 11,
        "last": false,
        "sort": {
            "empty": true,
            "unsorted": true,
            "sorted": false
        },
        "size": 10,
        "number": 0,
        "numberOfElements": 10,
        "first": true,
        "empty": false
    },
    "timestamp": 1744075247936,
    "success": true
}

export async function POST() {
    return NextResponse.json(data)
}

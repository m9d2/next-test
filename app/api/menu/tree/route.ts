export const dynamic = 'force-static';
export const revalidate = 60;
import {NextResponse} from 'next/server';

const data = {
    "code": 200,
    "msg": "操作成功",
    "data": [
        {
            "children": null,
            "id": 3,
            "name": "首页",
            "url": "/",
            "type": null,
            "icon": "HomeOutlined",
            "sort": 1
        },
        {
            "children": [
                {
                    "children": null,
                    "id": 2,
                    "name": "用户管理",
                    "url": "/sys/user",
                    "type": null,
                    "icon": null,
                    "sort": 3
                },
                {
                    "children": null,
                    "id": 4,
                    "name": "菜单管理",
                    "url": "/sys/menu",
                    "type": null,
                    "icon": null,
                    "sort": 4
                }
            ],
            "id": 1,
            "name": "系统设置",
            "url": "/sys",
            "type": null,
            "icon": "SettingOutlined",
            "sort": 2
        }
    ],
    "timestamp": 1744075030121,
    "success": true
}

export async function GET() {
    return NextResponse.json(data);
}

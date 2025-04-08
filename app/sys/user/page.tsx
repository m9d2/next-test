'use client'
import {ColumnType} from "@/app/components/Table";
import {Button, Tag} from "antd";
import {TableDropdown} from "@ant-design/pro-table";
import React from "react";
import EditableTable from "@/app/components/EditableTable";
import {EditColumnType} from "@/app/components/EditModal";
import useSWRMutation from "swr/mutation";
import {postFetcher, putFetcher} from "@/app/utils/fetcher";

const columns: ColumnType[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            search: false,
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            search: false,
            render: (text: any) => (
                <span>{text === '1' ? '男' : '女'}</span>
            ),
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text: any) => (
                <Tag color={text === 0 ? 'blue' : 'orange'}>
                    {text === 0 ? '正常' : '禁用'}
                </Tag>
            ),
            valueType: 'select',
            valueEnum: {
                0: {
                    text: '启用',
                },
                1: {
                    text: '禁用',
                },
            },
        },

        {
            title: '创建时间',
            dataIndex: 'createdDate',
            key: 'createdDate',
        },
        {
            title: '操作',
            key: 'action',
            width: 180,
            search: false,
            render: () => [
                <a key="link">链路</a>,
                <a key="link2">报警</a>,
                <a key="link3">监控</a>,
                <TableDropdown
                    key="actionGroup"
                    menus={[
                        {key: 'copy', name: '复制'},
                        {key: 'delete', name: '删除'},
                    ]}
                />,
            ],
        },
    ]
;

const editColumns: EditColumnType[] = [
    {
        key: 'group1',
        group: [
            {
                key: 'name',
                name: 'name',
                label: '签约客户名称',
                placeholder: '请输入名称',
                type: 'text'
            },
            {
                key: 'company',
                name: 'company',
                label: '我方公司名称',
                placeholder: '请输入名称',
                type: 'text'
            },
            {
                key: 'gender',
                name: 'gender',
                label: '性别',
                type: 'select',
                options: [
                    {
                        label: '男',
                        value: '1'
                    },
                    {
                        label: '女',
                        value: '2'
                    }
                ]
            }
        ]
    },
    {
        key: 'project',
        name: 'project',
        label: '项目',
        placeholder: '请输入名称',
        type: 'text'
    }, {
        key: 'mangerName',
        name: 'mangerName',
        label: '负责人',
        placeholder: '请输入名称',
        type: 'text'
    }

]

export default function Page() {
    const [modalVisible, setModalVisible] = React.useState(false);
    const {trigger} = useSWRMutation({url: '/user'}, putFetcher)
    const toolbar = {
        actions: [
            <Button
                key="primary"
                type="primary"
                onClick={() => {
                    setModalVisible(true)
                }}
            >
                添加
            </Button>,
        ],
    }

    const onFinish = async (values: any) => {
        await trigger(values)
        setModalVisible(false)
        return true
    }
    return (
        <>
            <EditableTable
                tableProps={{
                    url: '/user/page',
                    headerTitle: '用户列表',
                    columns: columns,
                    rowKey: (record: any) => record.id,
                    toolbar: toolbar,
                    method: 'POST'
                }}
                editProps={{
                    open: modalVisible,
                    title: '添加用户',
                    onSubmit: async (values: any) => {
                        return onFinish(values)
                    },
                    onCancel: () => {
                        setModalVisible(false)
                    },
                    columns: editColumns
                }}
            />
        </>
    )
}

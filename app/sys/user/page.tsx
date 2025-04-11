'use client'
import {ColumnType} from "@/app/components/Table";
import {Button, Tag} from "antd";
import React, {useState} from "react";
import TableForm from "@/app/components/TableForm";
import {deleteFetcher} from "@/app/utils/fetcher";
import {Enum} from "@/app/utils/enum";
import {EditColumnType} from "@/app/components/Form";
import {userService} from "@/app/service";

const editColumns: EditColumnType = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        colProps: {
            xs: 24,
            md: 12,
        },
    },
    {
        key: 'phone',
        dataIndex: 'phone',
        title: '手机号',
        colProps: {
            xs: 24,
            md: 12,
        },
    },
    {
        key: 'status',
        dataIndex: 'status',
        title: '状态',
        valueType: 'text'
    },
    {
        title: '分组',
        valueType: 'group',
        columns: [
            {
                title: '状态',
                dataIndex: 'groupState',
                valueType: 'select',
                width: 'xs',
                colProps: {
                    xs: 12,
                },
            },
            {
                title: '标题',
                width: 'md',
                dataIndex: 'groupTitle',
                colProps: {
                    xs: 12,
                },
                formItemProps: {
                    rules: [
                        {
                            required: true,
                            message: '此项为必填项',
                        },
                    ],
                },
            },
        ],
    },
]

export default function Page() {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [initialValues, setInitialValues] = useState()

    const columns: ColumnType[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            search: false,
            hideInForm: true,
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
            valueEnum: Enum.GenderEnum,
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
            render: (text) => (
                <Tag color={text === 1 ? 'blue' : 'red'}>
                    {text === 1 ? '启用' : '禁用'}
                </Tag>
            ),
        },
        {
            title: '创建时间',
            dataIndex: 'createdDate',
            key: 'createdDate',
        },
        {
            title: '操作',
            key: 'action',
            valueType: 'option',
            render: (text, record, _, action) => [
                <a key="edit" onClick={() => {
                    setInitialValues(record)
                    setModalVisible(true)
                }}>编辑</a>,
                <a key="delete" onClick={async () => {
                    await deleteFetcher({url: '/user?id=' + record.id})
                }}>删除</a>,
            ],
        },
    ];

    const toolbar = {
        actions: [
            <Button
                key="primary"
                type="primary"
                onClick={() => {
                    setInitialValues(undefined)
                    setModalVisible(true)
                }}
            >
                添加
            </Button>,
        ],
    }

    const onFinish = async (values: any) => {
        await userService.updateUser(values)
        setModalVisible(false)
        return true
    }
    return (
        <>
            <TableForm
                tableProps={{
                    url: '/user',
                    headerTitle: '用户列表',
                    columns: columns,
                    rowKey: (record: any) => record.id,
                    toolbar: toolbar,
                    method: 'POST',
                    fetcher: userService.getUsers
                }}
                editProps={{
                    open: modalVisible,
                    title: '添加用户',
                    layoutType: 'ModalForm',
                    onSubmit: async (values: any) => {
                        return onFinish(values)
                    },
                    onCancel: () => {
                        setModalVisible(false)
                    },
                    columns: editColumns,
                    initialValues: initialValues
                }}
            />
        </>
    )
}

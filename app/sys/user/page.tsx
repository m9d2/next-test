'use client'
import {ColumnType} from "@/app/components/Table";
import {Button, Tag} from "antd";
import React, {useState} from "react";
import EditableTable from "@/app/components/EditableTable";
import useSWRMutation from "swr/mutation";
import {putFetcher} from "@/app/utils/fetcher";
import {Enum} from "@/app/utils/enum";

const editColumns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        key: 'phone',
        name: 'phone',
        title: '手机号',
    },
    {
        key: 'status',
        name: 'status',
        title: '状态',
    }
]

export default function Page() {
    const [modalVisible, setModalVisible] = React.useState(false);
    const {trigger} = useSWRMutation({url: '/user'}, putFetcher)
    const [initialValues, setInitialValues] = useState()

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
                <a key="delete">删除</a>,
            ],
        },
    ];

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

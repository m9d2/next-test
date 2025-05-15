'use client'
import {Button, Form, message, Popconfirm, Tag} from "antd";
import React, {useRef, useState} from "react";
import {Enum} from "@/app/utils/enum";
import {
    ActionType,
    ModalForm,
    ProForm,
    ProFormSelect,
    ProFormSwitch,
    ProFormText,
    ProTable
} from "@ant-design/pro-components";
import axios from "@/app/utils/axios";
import {userService} from "@/app/service";

export default function Page() {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [initialValues, setInitialValues] = useState()
    const [messageApi, contextHolder] = message.useMessage();
    const [pageSize, setPageSize] = useState(10);
    const ref = useRef<ActionType>(null);
    const [form] = Form.useForm()
    const columns: any[] = [
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
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text: any) => (
                <Tag color={text === 1 ? 'blue' : 'red'}>
                    {text === 1 ? '启用' : '禁用'}
                </Tag>
            ),
        },
        {
            title: '创建时间',
            dataIndex: 'createdDate',
            key: 'createdDate',
            sorter: true,
        },
        {
            title: '操作',
            key: 'action',
            valueType: 'option',
            render: (text: any, record: any, _: any, action: any) => [
                <a key="edit" onClick={() => {
                    void form.validateFields()
                    form.setFieldsValue(record)
                    setModalVisible(true)
                }}>
                    编辑
                </a>,
                <Popconfirm
                    key='delete'
                    title="删除用户"
                    description="是否确认删除？"
                    onConfirm={async () => {
                        await axios.get('/user/delete?id=' + record.id)
                        messageApi.success('删除成功')
                        action?.reload()
                    }}
                    okText="确认"
                    cancelText="取消"
                >
                    <a>删除</a>
                </Popconfirm>
            ],
        },
    ];

    const toolbar = {
        actions: [
            <Button
                key="primary"
                type="primary"
                onClick={() => {
                    form.resetFields()
                    setModalVisible(true)
                }}
            >
                添加
            </Button>,
        ],
    }

    return (
        <>
            {contextHolder}
            <ProTable
                cardBordered
                headerTitle={'用户列表'}
                actionRef={ref}
                columns={columns}
                request={async (params, sort, filter) => {
                    params = {...params, orders: [{property: 'createdDate', direction: 'DESC'}]}
                    const data: any = await axios.post('/user/page', params)
                    const pageData = data.data.content
                    return new Promise((resolve) => {
                        resolve({
                            total: data.data.totalElements,
                            data: pageData,
                            success: true,
                        });
                    });
                }}
                toolbar={toolbar}
                rowKey={(record) => record.id}
                pagination={{
                    showSizeChanger: true,
                    pageSize: pageSize,
                    onShowSizeChange: (current, size) => {
                        setPageSize(size)
                    },
                }}
            />
            <ModalForm
                initialValues={initialValues}
                title="新建表单"
                open={modalVisible}
                autoComplete='off'
                form={form}
                onFinish={async (values) => {
                    values.status = values.status ? 1 : 0
                    if (values.id) {
                        await userService.updateUser(values)
                    } else {
                        await userService.saveUser(values)
                    }
                    messageApi.success('提交成功');
                    ref.current?.reload()
                    return true;
                }}
                onOpenChange={setModalVisible}
            >
                <ProForm.Group>
                    <ProFormText
                        width="md"
                        name="id"
                        label="ID"
                        tooltip="最长为 24 位"
                        placeholder="请输入名称"
                        hidden={true}
                    />
                    <ProFormText
                        width="md"
                        name="name"
                        label="姓名"
                        placeholder="请输入姓名"
                        required={true}
                    />
                    <ProFormText
                        width="md"
                        name="username"
                        label="用户名"
                        placeholder="请输入用户名"
                        required={true}
                    />
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormText
                        width="md"
                        name="phone"
                        label="手机号"
                        placeholder="请输入手机号"
                    />
                    <ProFormSelect
                        width="md"
                        name="gender"
                        label="性别"
                        placeholder="请选择性别"
                        initialValue={Enum.GenderEnum["1"]}
                        valueEnum={Enum.GenderEnum}
                        required={true}
                    />
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormText
                        width="md"
                        name="password"
                        label="密码"
                        placeholder="请输入密码"
                        required={true}
                    />
                    <ProFormSelect
                        width="md"
                        name="roleId"
                        label="角色"
                        placeholder="请选择角色"
                        options={[
                            {
                                value: 1,
                                label: '管理员',
                            },
                            {
                                value: 2,
                                label: '普通用户',
                            },
                        ]}
                    />
                </ProForm.Group>
                <ProFormSwitch
                    width="md"
                    name="status"
                    label="状态"
                    checkedChildren={'启用'}
                    unCheckedChildren={'禁用'}
                    initialValue={true}
                    required={true}
                />
                <ProFormText
                    width="md"
                    name="email"
                    label="邮箱"
                    placeholder="请输入邮箱"
                />
            </ModalForm>
        </>
    )
}

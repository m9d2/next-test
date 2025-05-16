'use client'
import {Button, Card, Form, Space, Table as AntTable, TableColumnType} from "antd";
import React, {useImperativeHandle, useState} from "react";
import useSWR from "swr";

export type TableProps = {
    action: (params: any) => Promise<any>;
    headerTitle?: string;
    columns: any[];
    params?: any;
    rowKey?: (record: any) => string | number;
    ref?: React.Ref<any> | undefined,
    toolbar?: React.ReactElement[]
};

export type ColumnType = TableColumnType & {
    renderFormItem?: React.ReactElement;
    search?: boolean | true;
};

export default function Table({
                                  columns,
                                  action,
                                  params,
                                  rowKey,
                                  ref,
                                  headerTitle,
                                  toolbar
                              }: TableProps) {
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [formParams, setFormParams] = useState({});
    const [form] = Form.useForm();
    const {data, isLoading, isValidating, mutate} = useSWR<any>(
        {
            size: pageSize,
            page: page,
            ...formParams,
            ...params
        }, action
    );

    const refresh = async () => {
        await mutate()
    }

    useImperativeHandle(ref, () => ({
        refresh,
    }));

    const ToolBar = () => {
        return (
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBlock: 16}}>
                <div style={{fontSize: 16, fontWeight: 500}}>
                    {headerTitle}
                </div>
                <Space size={8}>
                    {toolbar?.map((item) => {
                        return item
                    })}
                </Space>
            </div>
        )
    }

    const onReset = () => {
        form.resetFields()
        setFormParams({})
        void refresh()
    };

    const onFinish = async (values: any) => {
        setFormParams(values)
    }

    return (
        <>
            <Card style={{marginBottom: 16, padding: 9}}>
                <Form layout="inline"
                      autoComplete={'off'}
                      form={form}
                      onFinish={onFinish}>
                    {
                        columns.map((item) => {
                            if (item.search) {
                                return <Form.Item key={'form-' + item.dataIndex} name={item.dataIndex}
                                                  label={item.title}>
                                    {item.renderFormItem()}
                                </Form.Item>
                            }
                        })
                    }
                    <Form.Item>
                        <Space size={8}>
                            <Button type="primary" htmlType="submit" loading={isLoading || isValidating}>
                                查询
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                重置
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
            <Card>
                <ToolBar/>
                <AntTable
                    bordered={true}
                    ref={ref}
                    columns={columns}
                    dataSource={data?.content}
                    loading={isLoading || isValidating}
                    rowKey={rowKey}
                    pagination={{
                        size: 'small',
                        showSizeChanger: true,
                        pageSize: pageSize,
                        total: data?.totalElements,
                        onChange: (current, size) => {
                            setPageSize(size)
                            setPage(current)
                        },
                    }}
                />
            </Card>
        </>
    )
}

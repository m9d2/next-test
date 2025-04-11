"use client";
import useSWR from "swr";
import {useState} from "react";
import {ListToolBarProps, ProColumns, ProTable,} from "@ant-design/pro-components";

type Response = {
    code: number;
    data: any;
    msg: number;
    success: boolean;
};


export type ColumnType = ProColumns & {};

export type TableProps = {
    dataSource?: any[];
    method?: string;
    url: string;
    headerTitle?: string;
    columns: ColumnType[];
    params?: any;
    rowKey?: (record: any) => string | number;
    toolbar?: ListToolBarProps;
    fetcher: (params: any) => Promise<any>;
};

const Table = (props: TableProps) => {
    const [params, setParams] = useState({});
    const [pagination, setPagination] = useState({
        page: 1,
        size: 10,
    });
    const {data, isLoading, isValidating, mutate} = useSWR<any>(
        {url: props.url, arg: {...params, ...props.params, ...pagination, page: pagination.page - 1}},
        () => props.fetcher({})
    );
    const onSubmit = (params: any) => {
        setParams(params);
    };
    const onReset = async () => {
        setParams({});
        await mutate();
    };

    return (
        <>
            <ProTable
                loading={isLoading && isValidating}
                cardBordered
                headerTitle={props.headerTitle}
                dataSource={data ? data.content : []}
                columns={props.columns}
                rowKey={props.rowKey}
                params={params}
                onSubmit={onSubmit}
                onReset={onReset}
                onLoad={() => {
                    console.log("onLoad");
                }}
                toolbar={props.toolbar}
                pagination={{
                    showSizeChanger: true,
                    total: data?.data?.totalElements,
                    current: pagination.page,
                    pageSize: pagination.size,
                    onChange: (page, size) => {
                        setPagination({page, size});
                    },
                }}
            />
        </>
    );
};

export default Table;

"use client";
import {SWRConfig} from "swr";
import React from "react";
import fetchLogMiddleware from "@/app/middleware/fetchLogMiddleware";
import {message} from "antd";

export const SWRProvider = ({children}: { children: React.ReactNode }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const errorHandler = async (error: any) => {
        console.error(error);
        messageApi.error(error.message);
    };
    const successHandler = async (data: any) => {
        if (data && data.code !== 200) {
            messageApi.error(data.msg);
            throw new Error(data.msg);
        }
    };
    return (
        <>
            {contextHolder}
            <SWRConfig
                value={{
                    use: [fetchLogMiddleware],
                    keepPreviousData: true,
                    revalidateOnFocus: false,
                }}
            >
                {children}
            </SWRConfig>
        </>
    );
};

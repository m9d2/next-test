import {Form} from "antd";
import {DrawerForm, ModalForm, ProForm, ProFormSelect, ProFormText} from "@ant-design/pro-components";
import React from "react";

export type EditProps = {
    title?: string;
    formType?: 'modal' | 'drawer'
    open?: boolean;
    width?: number;
    onFinish?: (values: any) => Promise<boolean>;
    onCancel?: () => void;
    columns?: EditColumnType[];
};

export type EditColumnType = {
    width?: number | "md" | "sm" | "xl" | "xs" | "lg" | undefined;
    name?: string;
    label?: string;
    placeholder?: string;
    type?: 'text' | 'date' | 'select' | 'password' | 'range' | 'group';
    group?: EditColumnType[]
    options?: any[]
}

const convertToProForm = (column: EditColumnType) => {
    switch (column.type) {
        case 'text':
            return (
                <ProFormText
                    key={column.name}
                    name={column.name}
                    width={column.width}
                    label={column.label}
                />
            )
        case "select":
            return (
                <ProFormSelect
                    key={column.name}
                    name={column.name}
                    width={column.width}
                    label={column.label}
                    options={column.options}
                />
            )
    }
}

const EditModal = ({
                       title = '默认标题',
                       formType = 'modal',
                       open = false,
                       width = 800,
                       onFinish,
                       onCancel,
                       columns = []
                   }: EditProps) => {
    const [form] = Form.useForm<{ name: string; company: string }>();

    const FormContent = () => {
        return columns.map((column) => {
            if (column.group) {
                return (
                    <ProForm.Group key={column.name}>
                        {column.group.map((item) => {
                            return convertToProForm(item)
                        })}
                    </ProForm.Group>
                )
            } else {
                return convertToProForm(column)
            }
        })
    }

    if (formType === 'drawer') {
        return <DrawerForm<{
            name: string;
            company: string;
        }>
            title={title}
            width={width}
            open={open}
            form={form}
            autoFocusFirstInput
            drawerProps={{
                destroyOnClose: true,
                onClose: onCancel,
            }}
            submitTimeout={2000}
            onFinish={onFinish}
        >
            <FormContent/>
        </DrawerForm>
    }
    if (formType === 'modal') {
        return (
            <ModalForm<{
                name: string;
                company: string;
            }>
                title={title}
                open={open}
                width={width}
                form={form}
                autoFocusFirstInput
                modalProps={{
                    destroyOnClose: true,
                    onCancel: onCancel,
                }}
                submitTimeout={2000}
                onFinish={onFinish}
            >
                <FormContent/>
            </ModalForm>
        );
    }
    return null
};

export default EditModal;

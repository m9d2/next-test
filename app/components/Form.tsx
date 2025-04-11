import {Form as AntForm} from "antd";
import {BetaSchemaForm, ProFormColumnsType} from "@ant-design/pro-components";
import React from "react";

export type EditProps = {
    title?: string;
    layoutType?: 'DrawerForm' | 'ModalForm' | 'StepsForm'
    open?: boolean;
    width?: number;
    onSubmit?: (values: any) => Promise<boolean>;
    onCancel?: () => void;
    columns?: EditColumnType;
    initialValues?: any;
};

type DataItem = {
    name: string;
    state: string;
};


export type EditColumnType = ProFormColumnsType<DataItem>[] & {}

const Form = ({
                       title = '默认标题',
                       layoutType = 'ModalForm',
                       open = false,
                       width = 800,
                       onSubmit,
                       onCancel,
                       columns,
                       initialValues
                   }: EditProps) => {
    const [form] = AntForm.useForm<any>();
    const [loading, setLoading] = React.useState(false);

    console.log(initialValues)
    const onFinish = async (values: any) => {
        if (onSubmit) {
            setLoading(true)
            const result = await onSubmit(values);
            if (result) {
                form.resetFields();
            }
            setLoading(false)
            return result
        }
    }

    return <BetaSchemaForm<DataItem>
        shouldUpdate
        title={title}
        form={form}
        width={width}
        initialValues={initialValues}
        layoutType={layoutType}
        open={open}
        onFinish={async (values) => {
            console.log(values);
            return onFinish(values)
        }}
        modalProps={{
            onCancel: onCancel,
            className: 'form-modal',
        }}
        drawerProps={{
            onClose: onCancel,
            className: 'form-modal',
        }}
        columns={(layoutType === 'StepsForm' ? [columns] : columns) as any}
    />
};

export default Form;

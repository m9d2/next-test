import {Form} from "antd";
import {BetaSchemaForm, ProFormColumnsType} from "@ant-design/pro-components";
import React from "react";

export type EditProps = {
    title?: string;
    layoutType?: 'DrawerForm' | 'ModalForm'
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

const EditModal = ({
                       title = '默认标题',
                       layoutType = 'ModalForm',
                       open = false,
                       width = 800,
                       onSubmit,
                       onCancel,
                       columns = [],
                       initialValues
                   }: EditProps) => {
    const [form] = Form.useForm<any>();
    const [loading, setLoading] = React.useState(false);

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
        title={title}
        width={width}
        open={open}
        layoutType={layoutType}
        initialValues={initialValues}
        loading={loading}
        form={form}
        columns={columns}
        autoFocusFirstInput
        submitTimeout={2000}
        onFinish={async (values) => {
            await onFinish(values)
            return true
        }}
    >
    </BetaSchemaForm>
};

export default EditModal;

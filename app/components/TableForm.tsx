import Table, {TableProps} from "@/app/components/Table";
import Form, {EditProps} from "@/app/components/Form";

type PageProps = {
    tableProps: TableProps;
    editProps: EditProps;
}


const TableForm = (props: PageProps) => {
    return <>
        <Table {...props.tableProps}/>
        <Form {...props.editProps}/>
    </>
}

export default TableForm;

import Table, {TableProps} from "@/app/components/Table";
import EditModal, {EditProps} from "@/app/components/EditModal";

type PageProps = {
    tableProps: TableProps;
    editProps: EditProps;
}


const EditableTable = (props: PageProps) => {
    return <>
        <Table {...props.tableProps}/>
        <EditModal {...props.editProps}/>
    </>
}

export default EditableTable;

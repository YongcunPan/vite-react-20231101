import { Table } from "antd";
import type Summary from "rc-table/lib/Footer/Summary";
import { Container, TableContext } from "./Provide";
import ColumnSetting from "./ColumnSetting/index";
import type { ProTableProps, CustomRecordType } from "./data";
import { useContext } from "react";
import ResizableTable from "./ResizableTable";

const CustomTable = (props: ProTableProps<CustomRecordType>) => {
  const counter = useContext(TableContext);
  const { columns } = counter;
  console.log(counter);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px",
        }}>
        <div />
        <ColumnSetting columns={columns} />
      </div>
      <ResizableTable {...props} columns={columns} />
    </>
  );
};

const AntTable = (props: ProTableProps<CustomRecordType>) => {
  const { columns } = props;
  const col = columns as never;
  return (
    <Container columns={col}>
      <CustomTable {...props} />
    </Container>
  );
};

AntTable.Summary = Table.Summary as typeof Summary;

export default AntTable;

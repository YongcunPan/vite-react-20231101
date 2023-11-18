import { useState, useEffect } from "react";
import { Table } from "antd";
import { Resizable } from "react-resizable";
import "./ResizableTable.css";
// import useDeepEffect from "@/hooks/useDeepEffect";
import { CustomRecordType, ProTableProps } from "./data";

const ResizableTitle = (props: any) => {
  const { width, onResize, ...restProps } = props;
  if (!width) return <th {...restProps} />;
  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}>
      <th {...restProps} />
    </Resizable>
  );
};

const ResizableTable = (props: ProTableProps<CustomRecordType>) => {
  const components = { header: { cell: ResizableTitle } };
  const { columns = [], ...restProps } = props;
  const [cols, setCols] = useState(columns);
  const [resColumns, setResColumns] = useState<any[]>([]);

  useEffect(() => setCols(columns), [columns]);

  const handleResize =
    (index: number) =>
    (_: any, { size }: { size: any }) => {
      const nextCols = [...cols];
      nextCols[index] = {
        ...nextCols[index],
        width: size.width,
      };
      setCols(nextCols);
    };

  useEffect(() => {
    setResColumns(
      cols.map((col: any, index: number) => {
        return {
          ...col,
          onHeaderCell: (column: any) => ({
            width: column.width,
            onResize: handleResize(index),
          }),
        };
      })
    );
  }, [cols]);

  return <Table {...restProps} components={components} columns={resColumns} />;
};

export default ResizableTable;

import { useState, useEffect } from "react";
import { Table } from "antd";
import { Resizable } from "react-resizable";
import "./ResizableTable.css";

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

const ResizableTable = () => {
  const dataSource = () => {
    const data = [];
    for (let i = 0; i < 5; i++) {
      data.push({ key: i, name: `xxxx`, age: 32, address: "xxxxxxxxxxxxx" });
    }
    return data;
  };
  const [cols, setCols] = useState([
    { title: "姓名", dataIndex: "name", key: "name", width: 100 },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
      width: 100,
    },
    { title: "住址", dataIndex: "address", key: "address" },
  ]);
  const [columns, setColumns] = useState<any[]>([]);

  const components = { header: { cell: ResizableTitle } };

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
    setColumns(
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

  return (
    <Table
      components={components}
      columns={columns}
      size="small"
      dataSource={dataSource()}
    />
  );
};

export default ResizableTable;

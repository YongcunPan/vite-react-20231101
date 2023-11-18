import { useState, createContext, useContext, useEffect } from "react";
import { Button, Input, Modal, Space, message as antMessage } from "antd";
import { message, modal, notification } from "@/utils/antdFunctionUtil";
import Table from "@/components/Table";
import useElementSize from "@/hooks/useElementSize";
import { TableProps } from "antd/lib";

const Context = createContext("default");

const MyContent = () => useContext(Context);
const Wrapper = () => {
  const [messageApi, contextHolder] = antMessage.useMessage();
  // const result = useContext(Context);
  useEffect(() => {
    messageApi.success(<MyContent />);
  }, []);
  // console.log(result);

  return <>{contextHolder}</>;
  // return null;
};

const App = () => {
  const [open, setOpen] = useState<boolean>(false);
  const showMessage = () => {
    message.success("Success!");
  };

  const showMessage2 = () => {
    modal.error({ title: "Title", content: "Content" });
  };

  const showMessage3 = () => {
    notification.error({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
  };

  const cols: TableProps<any>["columns"] = [
    { dataIndex: "id", title: "ID", width: 100, key: "id" },
    { dataIndex: "name", title: "Name", width: 100, key: "name" },
    { dataIndex: "age", title: "Age", width: 100, key: "age" },
    {
      dataIndex: "address",
      title: "Address",
      width: 100,
      key: "address",
      fixed: "right",
    },
  ];

  // const [ref, h, w] = useElementSize();
  // console.log(h, w);

  return (
    <>
      <Space>
        <Button type="primary" onClick={showMessage}>
          Open message
        </Button>
        <Button type="primary" onClick={showMessage2}>
          Open modal
        </Button>
        <Button type="primary" onClick={showMessage3}>
          Open notification
        </Button>
        <Button type="primary" onClick={() => setOpen(true)}>
          Open Modal
        </Button>
        <Button type="primary">button test</Button>
        <Modal
          title="测试"
          open={open}
          onCancel={() => setOpen(false)}
          onOk={() => setOpen(false)}>
          <div>todo</div>
        </Modal>
      </Space>
      <Context.Provider value="Hello World!!!">
        <Wrapper />
      </Context.Provider>
      <hr />
      <div>可拖拽表格</div>
      <Table
        columns={cols}
        dataSource={[{ id: 1, age: 18, address: "xxx", name: "张三" }]}
        rowKey="id"
        scroll={{ x: 2000, y: 1700 }}
      />
      <hr />
      <div /* ref={ref as never} */>
        <Input.TextArea autoSize={{ minRows: 2 }} showCount />
      </div>
    </>
  );
};

export default App;

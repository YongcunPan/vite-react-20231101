import { useState, createContext, useContext, useEffect } from "react";
import { Button, Modal, Space, message as antMessage } from "antd";
import { message, modal, notification } from "@/utils/antdFunctionUtil";
import ResizableTable from "@/components/ResizableTable";

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
    void message.success("Success!");
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
      <ResizableTable />
    </>
  );
};

export default App;

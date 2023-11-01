import { useState } from "react";
import { Button, Modal, Space } from "antd";

import { message, modal, notification } from "../utils/antdFunctionUtil";

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
  );
};

export default App;

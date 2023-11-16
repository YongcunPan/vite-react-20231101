import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { Button, Drawer, Modal, Select, Space, Spin } from "antd";
import useInView from "../hooks/useInView";
import { getStudents, getStudent } from "./service";
import { AxiosError } from "axios";
import { notification } from "../utils/antdFunctionUtil";
import DemoOne from "@components/DemoOne";

function App() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.global);
  const { username } = useAppSelector((state) => state.auth);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const setUsername = () => {
    const username = `${Math.floor(Math.random() * 1000000000)}-张三`;
    dispatch({ type: "auth/setUsername", payload: username });
  };

  return (
    <Spin spinning={loading}>
      <DemoB />
      <div style={{ height: 200, overflowY: "auto" }}>
        <Space direction="vertical">
          <Demo />
          <Demo />
          <Demo />
          <Demo />
          <Demo />
          <DemoA />
          <Demo />
          <Demo />
          <Demo />
          <Demo />
          <Demo />
          <DemoA />
        </Space>
      </div>
      <div>{username}</div>
      <Space>
        <Button onClick={() => setDrawerOpen(true)}>Drawer</Button>
        <Button onClick={() => setModalOpen(true)}>Modal</Button>
        <Button onClick={() => setUsername()}>setUsername</Button>
        <Button type="primary">button test</Button>
      </Space>
      <div>
        <DemoOne str="1" />
        <DemoOne str="2" />
        <DemoOne str="3" />
        <DemoOne str="4" />
        <DemoOne str="5" />
        <DemoOne str="6" />
        <DemoOne str="7" />
      </div>
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => setModalOpen(false)}>
        <div>
          <DemoC />
        </div>
      </Modal>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        extra={<Button type="primary">submit</Button>}
        footer={
          <div>
            <Button type="primary">submit</Button>
          </div>
        }>
        <div>
          <DemoC />
        </div>
      </Drawer>
    </Spin>
  );
}

function Demo() {
  useEffect(() => {
    getStudents()
      .then(() => console.log("success"))
      .catch((e: AxiosError) => {
        console.log(e);
        notification.error({ message: e.code, description: e.message });
      });
  }, []);

  const [refDom, inView] = useInView();

  return (
    <div
      ref={refDom as never}
      style={{ height: 40, border: `1px solid ${inView ? "green" : "red"}` }}>
      demo
    </div>
  );
}

function DemoA() {
  useEffect(() => {
    getStudent(1)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }, []);
  return <div>demo</div>;
}

function DemoB() {
  return (
    <>
      <Select
        options={[
          { label: "测试1", value: 1 },
          { label: "测试2", value: 2 },
        ]}
        style={{ width: 300 }}
        defaultValue={null}
        onChange={(value) => console.log(value)}
        placeholder="请选择"
      />
    </>
  );
}

function DemoC() {
  const { username } = useAppSelector((state) => state.auth);
  return <div>name:{username}</div>;
}

export default App;

import ReactDOM from "react-dom/client";
import { App, ConfigProvider } from "antd";
import store, { persist } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppDemo from "./pages/App.tsx";
// import DndTest from "./pages/DndTest";
// import AntdTest from "./pages/AntdTest";
import AntdFunctionUtil from "./utils/antdFunctionUtil";
import zhCN from "antd/locale/zh_CN";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persist}>
      <ConfigProvider locale={zhCN} theme={{ token: { borderRadius: 20 } }}>
        <App>
          <AntdFunctionUtil />
          {/* <AntdTest /> */}
          <AppDemo />
          {/* <DndTest /> */}
        </App>
      </ConfigProvider>
    </PersistGate>
  </Provider>
);

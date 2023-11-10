import ReactDOM from "react-dom/client";
import { App as AntdApp, ConfigProvider } from "antd";
import store, { persist } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AntdFunctionUtil from "./utils/antdFunctionUtil";
import zhCN from "antd/locale/zh_CN";
import App from "./layout/index";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persist}>
      <ConfigProvider locale={zhCN} theme={{ token: { borderRadius: 20 } }}>
        <AntdApp>
          <AntdFunctionUtil />
          <App />
        </AntdApp>
      </ConfigProvider>
    </PersistGate>
  </Provider>
);

import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "antd";

export default () => {
  const [count, setCount] = useState(1);
  if (count < 0.5) return <Navigate to="/no_auth" replace />;
  return (
    <div>
      {count}
      <Button onClick={() => setCount(Math.random())}>随机数</Button>
    </div>
  );
};

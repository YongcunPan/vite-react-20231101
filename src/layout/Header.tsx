import { NavLink } from "react-router-dom";
import css from "./index.module.less";

export default () => {
  return (
    <div className={css.nav}>
      <NavLink to="/">home</NavLink>
      <NavLink to="/dnd">dnd</NavLink>
      <NavLink to="/antd">antd</NavLink>
      <NavLink to="/navigate">navigate</NavLink>
    </div>
  );
};

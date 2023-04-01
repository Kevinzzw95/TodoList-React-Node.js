import { Layout, theme } from "antd"
import "./styles.css";
import TodoMenu from "./menu.component";

const { Sider } = Layout;

interface SiderProps {
  onFilter: React.Dispatch<React.SetStateAction<string>>
}

function TodoSider({onFilter}: SiderProps) {

  const {
      token: { colorBgContainer },
  } = theme.useToken();
      
  return (
      <Sider className="sider" style={{ background: colorBgContainer, height: '93vh'}} width={300}>
          <div className="name" style={{ height: 32, margin: 16 }}>DailyKeeper</div>
          <TodoMenu onFilter={onFilter}/>
      </Sider>
  );
}

export default TodoSider;
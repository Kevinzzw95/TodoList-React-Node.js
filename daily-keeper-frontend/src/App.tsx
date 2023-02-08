
import { ConfigProvider, Layout, theme} from "antd";
import './App.css';
import CreateTodo from "./components/todos/createTodo.component";
import TodoFooter from "./components/layout/footer.component";
import React from 'react';
import TodoSider from "./components/layout/sider.component";
import TodoList from "./components/todos/todoList.component";
import { useState } from "react";


const { Header, Content} = Layout;


function App() {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [filterBy, setFilterBy] = useState<string>('None');

  return (
    <ConfigProvider>
      <Layout style={{ minHeight: '100vh' }} >
        <TodoSider onFilter={setFilterBy}/>
        <Layout className="site-layout">
          <Content style={{ margin: '30px 30px'}} >
            <div className="main" style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
              <CreateTodo />
              <TodoList filter={filterBy}/>
            </div>
          </Content>
          <TodoFooter />
        </Layout>  
      </Layout>
      
    </ConfigProvider>     
  );
}

export default App;

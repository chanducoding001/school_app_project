import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { getSessionStorageRole } from './sidebarItems';
const { Header, Content, Footer, Sider } = Layout;
// function getItem(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const role = getSessionStorageRole()?.role;
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem(<Link to='/'>Home</Link>,'1',<PieChartOutlined />),
    role===1 && getItem(<Link to='/principal'>Principal</Link>,'2',<PieChartOutlined />),
    role===1 && getItem(<Link to='/viewEmployees'>View Employees</Link>,'6',<PieChartOutlined />),
    role===1 && getItem(<Link to='/addEmployee'>Add Employee</Link>,'5',<PieChartOutlined />),
    role===2 && getItem(<Link to='/employee'>Employee</Link>,'3',<PieChartOutlined />),
    role===3 && getItem(<Link to='/parent'>Parent</Link>,'4',<PieChartOutlined />),
    ]
  return (
    <Layout
      style={{
        // minHeight: '100vh',
        maxHeight:'100vh'
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark"  mode="inline" items={items} />
        {/* <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} /> */}
      </Sider>
      <Layout>
        <Header
          style={{
            // padding: 0,
            margin:'16px',
            // background:'blue',
            background: colorBgContainer,
            borderRadius: borderRadiusLG
          }}
        />
        <Content
          style={{
            margin: '0 16px',
            overflow:'scroll',
            // background:'blue',
            
          }}
        >
          
          <div
            style={{
              padding: 24,
              minHeight: 470,
              //background:'blue',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Sidebar;
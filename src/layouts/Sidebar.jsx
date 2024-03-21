import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { getSessionStorageRole } from './sidebarItems';
import './root.css';
const { Header, Content, Footer, Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
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
    getItem(<Link to="/">Home</Link>, '1', <PieChartOutlined />),
    // role === 1 && getItem(<Link to="/principal">Principal</Link>, '2', <PieChartOutlined />),
    role === 1 && getItem(<Link to="/viewEmployees">View Employees</Link>, '6', <PieChartOutlined />),
    role === 1 && getItem(<Link to="/addEmployee">Add Employee</Link>, '5', <PieChartOutlined />),
    // role === 2 && getItem(<Link to="/employee">Employee</Link>, '3', <PieChartOutlined />),
    role === 2 && getItem(<Link to="/addStudent">Add Student</Link>, '7', <PieChartOutlined />),
    role === 2 && getItem(<Link to="/addParent">Add Parent</Link>, '8', <PieChartOutlined />),
    role === 2 && getItem(<Link to="/attendanceTable">Attendance</Link>, '9', <PieChartOutlined />),
    role === 3 && getItem(<Link to="/parent">Parent</Link>, '4', <PieChartOutlined />),
    role === 3 && getItem(<Link to="/childrenProfile">Children</Link>, '10', <PieChartOutlined />),
  ];
  const handleLogOut = ()=>{
    sessionStorage.removeItem('schoolData');
    navigate('/login',{replace:true});
    window.history.replaceState(null, null, window.location.pathname);
  }
  const changePassword = ()=>{

  }
  return (
    <div style={{ maxWidth: '100vw', overflow: 'hidden' }}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={240}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" items={items} />
        </Sider>
        <Layout>
          <Header
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height:'100px',
              margin:'16px'
            }}
          >
            <div className='sidebar-profile'>
              <img className='sidebar-profile-img' src='https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg'/>
              <div className='sidebar-profile-buttons'>
              {/* <button className='profile-buttons' onClick={changePassword}>Change Password</button> */}
              <button className='profile-buttons' onClick={handleLogOut}>Log out</button>
              </div>
            </div>
            </Header>
          <Content style={{ margin: '16px', overflow: 'auto' }}>
            <div
              style={{
                padding: 24,
                minHeight: 'calc(100vh - 64px - 16px)',
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Sidebar;

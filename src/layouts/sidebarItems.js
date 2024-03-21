import {DesktopOutlined,FileOutlined,PieChartOutlined,TeamOutlined,UserOutlined} from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const getSessionStorageRole = ()=>{
  const schoolData = sessionStorage.getItem('schoolData');
  if(!schoolData)return null;
  const decodeToken = jwtDecode(schoolData);
  const {email,role,username} = decodeToken
  return {email,role,username};
}
export const getToken = ()=>{
  return sessionStorage.getItem('schoolData');
}
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
const role = getSessionStorageRole()?.role;
export const items = [
getItem(<Link to='/'>Home</Link>,'1',<PieChartOutlined />),
role===1 && getItem(<Link to='/principal'>Principal</Link>,'2',<PieChartOutlined />),
role===1 && getItem(<Link to='/viewEmployees'>View Employees</Link>,'6',<PieChartOutlined />),
role===1 && getItem(<Link to='/addEmployee'>Add Employee</Link>,'5',<PieChartOutlined />),
role===2 && getItem(<Link to='/employee'>Employee</Link>,'3',<PieChartOutlined />),
role===3 && getItem(<Link to='/parent'>Parent</Link>,'4',<PieChartOutlined />),
]

export const convertStringRole = (stringRole)=>{
  const lowered = stringRole.toLowerCase();
  const roles = {
    employee:{
      title:'employee',
      role:2
    },
    parent:{
      title:'parent',
      role:3
    },
    principal:{
      title:'principal',
      role:'1'
    }
  }
  if(roles.hasOwnProperty(lowered)){
    return roles[lowered].role
  }
  return null;
}
export const roleDecider = (role)=>{

  const roles ={
    1:1,
    2:2,
    3:3
  }
  if(roles.hasOwnProperty(String(role)))return +role;
  return null;
}
export const roles = {
  employee:2,
  parent:3,
  principal:1
}
// export const items = [
// getItem(<NavLink className={({isActive})=>{return isActive?'active-link':'inactive-link'}} to='/'>Home</NavLink>,'1',<PieChartOutlined />),
// getItem(<NavLink className={({isActive})=>{return isActive?'active-link':'inactive-link'}} to='/principal'>Principal</NavLink>,'2',<PieChartOutlined />),
// getItem(<NavLink className={({isActive})=>{return isActive?'active-link':'inactive-link'}} to='/employee'>Employee</NavLink>,'3',<PieChartOutlined />),
// getItem(<NavLink className={({isActive})=>{return isActive?'active-link':'inactive-link'}} to='/parent'>Parent</NavLink>,'4',<PieChartOutlined />),
// ]

// const items = [
//   getItem('Option 1', '1', <PieChartOutlined />),
//   getItem('Option 2', '2', <DesktopOutlined />),
//   getItem('User', 'sub1', <UserOutlined />, [
//     getItem('Tom', '3'),
//     getItem('Bill', '4'),
//     getItem('Alex', '5'),
//   ]),
//   getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//   getItem('Files', '9', <FileOutlined />),
// ];
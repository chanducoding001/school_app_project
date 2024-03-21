import React from 'react'
import Sidebar from './layouts/Sidebar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import Register from './authorization/Register';
import Login from './authorization/Login';
import Employee from './components/Employee';
import Parent from './components/Parent';
import Principal from './components/Principal';
import './layouts/root.css'
import Protected from './protectedRoutes/Protected';
import Authenticate from './protectedRoutes/Authenticate';
import AddEmployee from './principalPages/AddEmployee';
import ViewEmployees from './principalPages/ViewEmployees';
import EditEmployee from './principalPages/EditEmployee';
import AddStudent from './employeePages/AddStudent';
import AddParent from './employeePages/AddParent';
import AttendanceTable from './employeePages/AttendanceTable';
import Childrens from './parent/Childrens';
const App = () => {
  // const schoolData = JSON.parse(sessionStorage.getItem('schoolData'));
  // const role = schoolData?.role;
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<Authenticate/>}>
      <Route path='/' element={<Sidebar/>}>
        <Route index element={<Home/>}/>
        <Route element={<Protected role='1'/>} >
        <Route path='/principal' element={<Principal/>}/>
        <Route path='/addEmployee' element={<AddEmployee/>}/>
        <Route path='/viewEmployees' element={<ViewEmployees/>}/>
        <Route path='/editEmployee/:id' element={<EditEmployee/>}/>
        </Route>
        <Route element={<Protected role='2'/>}>
        <Route path='/employee' element={<Employee/>}/>
        <Route path='/addStudent' element={<AddStudent/>}/>
        <Route path='/addParent' element={<AddParent/>}/>
        <Route path='/attendanceTable' element={<AttendanceTable/>}/>
        
        </Route>
        <Route element={<Protected role='3'/>}>
        <Route path='/parent' element={<Parent/>}/>
        <Route path='/childrenProfile' element={<Childrens/>}/>
        </Route>
      </Route>
      </Route>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
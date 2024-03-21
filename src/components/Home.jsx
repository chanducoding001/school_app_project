import React from 'react'
import { getSessionStorageRole } from '../layouts/sidebarItems';

const Home = () => {
  const token = getSessionStorageRole();
  console.log('home',token);
  const getRoleDetails = ()=>{
    let role;
    if(token?.role===1){
      role = 'Principal'
    }else if(token?.role===2){
      role = 'Employee'
    }else if(token?.role === 3){
      role = 'Parent'
    }
    return {name:token?.username,email:token?.email,role}
  }
  return (
    <>
    <h2>Home Section</h2>
    <h3>Welcome {getRoleDetails()?.name} you have logged in as {getRoleDetails()?.role}</h3>
<p>This is an application for a small school where users consist of Principal, Employee, and Parent.</p>
<p>This application is built using the MERN stack.</p>
<p>The CSS libraries used are Ant Design for layouts and Material UI for tables and icons.</p>
<p>React Select is utilized for selecting multiple options.</p>
<p>Formik and Yup libraries are employed for form validations.</p>
<p>For the demo, Redux Toolkit logic is utilized on a page for state management, but it could be extensively utilized for state management throughout the application.</p>
<p>Local storage is utilized to persist the login.</p>
<p>JWT tokens are issued and routes are protected both on the frontend and backend.</p>
<p>Password encryption is done using bcryptjs.</p>
<p>Images and documents are displayed and downloaded using multer library in backend.</p>
<p>In frontend to decode the token jwt-decode is used.</p>
<h4>Future scope of this project</h4>
<p>We could enhance state management to reduce the number of requests to the database.</p>
<p>If multiple franchises are added, we will need to handle more complex operations on the backend.</p>
<p>We could persist the login without using local storage by using Redux Toolkit, which is an advanced process.</p>

    </>
  )
}

export default Home;
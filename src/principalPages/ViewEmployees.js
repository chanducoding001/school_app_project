import React, { useEffect, useState } from 'react'
import ViewEmployeeTable from './ViewEmployeeTable';
import { columns } from './principalRough';
    const ViewEmployees = () => {
    const [employeeData,setEmployeeData] = useState([]);
    const getData = async ()=>{
        const response = await fetch('http://localhost:8000/employees/allEmployees');
        const data = await response.json();
        if(response.ok){
            setEmployeeData(data.data)
        }
    }
    useEffect(()=>{
        getData();
    },[])
  return (
    <>
    <div>ViewEmployees</div>
   <ViewEmployeeTable columns={columns} rows={employeeData}/>
    </>
  )
}

export default ViewEmployees;
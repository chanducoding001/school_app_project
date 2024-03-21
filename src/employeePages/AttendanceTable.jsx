import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from '@mui/material';
import { getToken } from '../layouts/sidebarItems';

const AttendanceTable = () => {
  const [attendance, setAttendance] = useState([]);
  const [date,setDate] = useState('');
  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await fetch('http://localhost:8000/students/allStudents',{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authorization":`Bearer ${getToken()}`
          },
        });
        if (!response.ok) {
          console.log('Students not fetched');
          return;
        }
        const data = await response.json();
        console.log('Data', data);
        setAttendance(data?.data?.map(student => ({ ...student, present: false })));
      } catch (error) {
        console.error('Error fetching students', error);
      }
    };
    getStudents();
  }, []);

  const handleToggleAttendance = (studentId) => {
    setAttendance(attendance.map(student => {
      if (student._id === studentId) {
        return { ...student, present: !student.present };
      }
      return student;
    }));
  };

  const handleToggleAllAttendance = (isChecked) => {
    setAttendance(attendance.map(student => ({ ...student, present: isChecked })));
  };

  const totalPresent = attendance.filter(student => student.present).length;
  const totalAbsent = attendance.length - totalPresent;

  const handleClear = ()=>{
    setDate('');
  }
  const handleSubmit = async () => {
    if(!date) return
    const attendanceData = attendance.map(({ _id, present }) => {
      return {studentId: _id,date,status: present ? 'present' : 'absent'}
    });

    const response = await fetch('http://localhost:8000/attendance/addAttendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization':`Bearer ${getToken()}`
      },
      body: JSON.stringify(attendanceData)
    });

    if (!response.ok) {
      console.log('Attendance response not OK');
      return;
    }
    const data = await response.json();
    console.log('Attendance', data);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <input type='date' onChange={(e)=>{setDate(e.target.value)}} value={date}/>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell>Present</TableCell>
            <TableCell>Absent</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendance.map(student => (
            <TableRow key={student._id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>
                <Checkbox
                  checked={student.present}
                  onChange={() => handleToggleAttendance(student._id)}
                  disabled={!student.present}
                />
              </TableCell>
              <TableCell>
                <Checkbox
                  checked={!student.present}
                  onChange={() => handleToggleAttendance(student._id)}
                  disabled={student.present}
                />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>{totalPresent}</TableCell>
            <TableCell>{totalAbsent}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div>
        <Checkbox
          checked={totalPresent === attendance.length}
          onChange={(e) => handleToggleAllAttendance(e.target.checked)}
          disabled={totalPresent === attendance.length}
        />
        <span>Select All Present</span>
        <Checkbox
          checked={totalAbsent === attendance.length}
          onChange={(e) => handleToggleAllAttendance(!e.target.checked)}
          disabled={totalAbsent === attendance.length}
        />
        <span>Select All Absent</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleClear}>Clear</button>
      </div>
    </TableContainer>
  );
};

export default AttendanceTable;

import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom';
import { convertStringRole } from '../layouts/sidebarItems';

const Register = () => {
    const navigate = useNavigate();
    const initalValues = {
        email:'',
        username:'',
        role:'',
        password:''
    }
    const validationSchema = Yup.object({
        email:Yup.string().email('enter valid email!').required('email is required!'),
        username:Yup.string().required('username is required!'),
        password:Yup.string().required('password is required!'),
        role:Yup.string().required('role is required!')
    })
    const handleSubmit = async (values,{resetForm})=>{
        values.role = convertStringRole(values.role)
        console.log(values);
        try{
            const response = await fetch('http://localhost:8000/api/auth/register',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(values)
        });
        if(!response.ok)return
        const data = await response.json(); 
        console.log('after response',data);
        navigate('/login',{replace:true});
        // window.replaceState('',null,'/')
        }catch(err){
            console.log(err);
        }
        
        resetForm();
    }
  return <>
    <Formik initialValues={initalValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
            <div>
            <Field type='email' placeholder='Enter email' name='email'/>
            <ErrorMessage name='email'/>
            </div>
            <div>
            <Field type='text' placeholder='Enter username' name='username'/>
            <ErrorMessage name='username'/>
            </div>
            <div>
            <Field type='password' placeholder='Enter password' name='password'/>
            <ErrorMessage name='password'/>
            </div>
            <div>
            <Field as='select' name='role'>
                <option defaultValue='select role'>Select Role</option>
                <option>Employee</option>
                <option>Parent</option>
                <option>Principal</option>
            </Field>
            <ErrorMessage name='role'/>
            </div>
            <div>
                <button type='submit'>Submit</button>
                <button type='reset'>Reset</button>
            </div>
        </Form>
    </Formik>
  </>
}

export default Register;
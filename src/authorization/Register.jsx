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
<Formik className='login-formik' initialValues={initalValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form className='login-form'>
            <h2>Register Form</h2>
            <div className='login-content'>
            <div className="login-field-divs">
            <Field type='string' placeholder='Enter user name' name='username' className="login-field"/>
            <div className="error-message-login"><ErrorMessage name='username'/></div>
            </div>
            <div className="login-field-divs">
            <Field type='email' placeholder='Enter email' name='email' className="login-field"/>
            <div className="error-message-login"><ErrorMessage name='email'/></div>
            </div>
            <div className="login-field-divs">
            <Field type='password' placeholder='Enter password' name='password' className="login-field"/>
            <div className="error-message-login"><ErrorMessage name='password'/></div>
            </div>
            <div className="login-field-divs">
            <Field as='select' name='role' className="login-field-select">
                <option defaultValue='select role'>Select Role</option>
                <option>Principal</option>
            </Field>
            <div className="error-message-login"><ErrorMessage name='role'/></div>
            </div>
            </div>
            {/* <div className="form-buttons-div"> */}
            <div className='login-buttons'>
                <button type='submit'>Submit</button>
                <button type='reset'>Reset</button>
                <button onClick={()=>{navigate('/login')}}>Go to Login Page</button>
            </div>
        </Form>
    </Formik>
  </>
}

export default Register;
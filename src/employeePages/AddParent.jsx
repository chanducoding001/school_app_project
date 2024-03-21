
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import * as Yup from 'yup';
import { getToken } from '../layouts/sidebarItems';

const AddParent = () => {
    const [students,setStudents] = useState([]);
    
    useEffect(()=>{
        const token = getToken()
        const getStudents = async ()=>{
            const response = await fetch('http://localhost:8000/students/allStudents',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${token}`
                }
            });
            if(!response.ok){
                console.log('studetnts data not fetched');
                return
            }
            const data = await response.json();
            console.log(data);
            setStudents([...data.data])
        }
        getStudents();
    },[])
    console.log('students',students);
    const options = students.length>0 ? students.map((e)=>{return {label:e.name,value:e["_id"]}}):[];
    console.log("options",options);
    //const options = [{ label: 'one', value: 'one' }, { label: 'two', value: 'two' }];
    const initialValues = {
        email: '',
        children: [],
        name:'',
        relation:'',
        mobile:'',
        currentAddress:'',
        password:'',
        role:'',
        profilePicture:'',
    };
    const validationSchema = Yup.object({
        email: Yup.string().required('Email is required'),
        children: Yup.array().min(1, 'Please select at least one child'),
        name: Yup.string().required('Name is required'),
        relation: Yup.string().required('Relation is required'),
        mobile: Yup.string().required('Mobile Number is required'),
        currentAddress: Yup.string().required('Current Address is required'),
        password:Yup.string().required('Password is required!'),
        role:Yup.number().required('Role is required!'),
        profilePicture:Yup.string().required('Profile Picture is required!')
    });
    const uploadImage = async (data)=>{
        const formData = new FormData();
        formData.append("file", data);
        const imgResponse = await fetch("http://localhost:8000/files", {
          method: "POST",
          body: formData,
        });
        if (!imgResponse.ok) return false;
        const imgData = await imgResponse.json();
        //console.log(imgData);
        return imgData;
      }
    const handleSubmit = async (values,{resetForm}) => {
        console.log(values);
        const imgData = await uploadImage(values.profilePicture);
        if(imgData === false) return;
        values.profilePicture = imgData.data["_id"];
        const response = await fetch('http://localhost:8000/parents/addParent',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                "authorization":`Bearer ${getToken()}`
            },
            body:JSON.stringify(values),
        });
        if(!response.ok){
            console.log('parent submission rejected');
            return;
        }
        const data = await response.json();
        console.log(data);
        resetForm()
    };
    return (
        <>
            <h4>Add Parent</h4>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ values, setFieldValue }) => {
                    return (
                        <Form className='form-wrapper'>
                            <div className="form">
                                <div className='field-div'>
                                    <Field className='field' name='email' placeholder='Enter email' />
                                    <div className='error-message'>
                                        <ErrorMessage name='email' />
                                    </div>
                                </div>
                                <div className='field-div'>
                                    <Select options={options}
                                    placeholder='Enter Childrens' 
                                    isMulti
                                    name='children'
                                    value={options.filter(option => values.children.includes(option.value))}
                                    onChange={(selectedOptions) => {
                                        setFieldValue('children', selectedOptions.map(option => option.value));
                                    }}
                                    />
                                    <div className='error-message'>
                                        <ErrorMessage name='children' />
                                    </div>
                                </div>
                                <div className='field-div'>
                                    <Field className='field' name='name' placeholder='enter name'/>
                                    <div className='error-message'>
                                        <ErrorMessage name='name' />
                                    </div>
                                </div>
                                <div className='field-div'>
                                    <Field as='select' className='field' name='relation' placeholder='Select Relation'>
                                        <option defaultValue='Select Relation'>Select Relation</option>
                                        <option>Father</option>
                                        <option>Mother</option>
                                        <option>Gaurdian</option>
                                    </Field>
                                    <div className='error-message'>
                                        <ErrorMessage name='relation' />
                                    </div>
                                </div>
                                <div className='field-div'>
                                    <Field className='field' name='mobile' placeholder='Mobile' />
                                    <div className='error-message'>
                                        <ErrorMessage name='mobile' />
                                    </div>
                                </div>
                                <div className='field-div'>
                                    <Field className='field' name='currentAddress' placeholder='Current Address' />
                                    <div className='error-message'>
                                        <ErrorMessage name='currentAddress' />
                                    </div>
                                </div>
                                <div className='field-div'>
                                    <Field className='field' name='password' placeholder='Password' />
                                    <div className='error-message'>
                                        <ErrorMessage name='password' />
                                    </div>
                                </div>
                                <div className='field-div'>
                                    <Field className='field' name='role' placeholder='Role' as='select'>
                                        <option defaultValue='Select role'>Select Role</option>
                                        <option>3</option>
                                    </Field>
                                    <div className='error-message'>
                                        <ErrorMessage name='role' />
                                    </div>
                                </div>
                                <div className="field-div">
                <label htmlFor="image" className="custom-file-upload">
                    Upload profile picture
                  <input
                    type="file"
                    id="image"
                    name="profilePicture"
                    //   accept='.pdf,.doc'
                    accept=".jpg,.jpeg,.png"
                    style={{ display: "none" }}
                    onChange={(event) => {
                      setFieldValue("profilePicture", event.target.files[0]);
                    }}
                  />
                  </label>
                  <div className="error-message">
                    <ErrorMessage name="profilePicture" />
                  </div>
                </div>

                            </div>
                            <div className="form-buttons-div">
                                <button type="reset">Clear</button>
                                <button type="submit">Submit</button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default AddParent;
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import * as Yup from 'yup';
import { calculateAge } from '../principalPages/principalRough';
import { getToken } from '../layouts/sidebarItems';

const AddStudent = () => {
    const initialValues = {
        name:'',
        dob:'',
        age:'',
        profilePicture:'',
        rollNumber:'',
        class:'',
        section:'',
        fatherName:'',
        motherName:'',
        parentMobile:'',
        parentEmail:'',
        currentAddress:''
    }
    const validationSchema = Yup.object({
        name:Yup.string().required('name is required!'),
        dob:Yup.date().required('date of birth is required!'),
        profilePicture:Yup.string(),
        rollNumber:Yup.string().required('roll number is required!'),
        class:Yup.string().required('class is required!'),
        section:Yup.string().required('section is required!'),
        fatherName:Yup.string().required('father name is required!'),
        motherName:Yup.string().required('mother name is required!'),
        parentMobile:Yup.string().required('parent mobile is required!'),
        parentEmail:Yup.string().email('enter valid email!').required('parent email is required!'),
        currentAddress:Yup.string().required('current address is required!')
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
    const handleSubmit = async (values,{resetForm})=>{
        const imgData = await uploadImage(values.profilePicture);
        if(imgData === false){
            console.log('image is not uploaded properly!');
            return;
        }
        values.profilePicture = imgData.data["_id"];
        try{
            const response = await fetch('http://localhost:8000/students/addStudent',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${getToken()}`
                },
                body:JSON.stringify(values)
            });
            if(!response.ok) return;
            const data = await response.json();
            console.log('posted student ',data);
            resetForm();
        }catch(err){
            console.log(err);
        }
    }
    
  return (
    <>
    <h4>Add Student</h4>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {
                    ({values,setFieldValue})=>{
                        return (
                            <Form className='form-wrapper'>
                <div className="form">
                    <div className='field-div'>
                        <Field className='field' name='name' placeholder='enter name'/>
                        <div className='error-message'>
                            <ErrorMessage name='name'/>
                        </div>
                    </div>
                    <div className='field-div'>
                        <Field type='date' className='field' 
                        onChange = {(e)=>{
                            setFieldValue('dob',e.target.value)
                            const age  = calculateAge(e.target.value);
                            setFieldValue('age',age)
                        }}
                        name='dob' placeholder='enter dob'/>
                        <div className='error-message'>
                            <ErrorMessage name='dob'/>
                        </div>
                    </div>
                    <div className='field-div'>
                        <Field className='field' name='age' readOnly placeholder='age'/>
                        <div className='error-message'>
                            <ErrorMessage name='age'/>
                        </div>
                    </div>
                    {/* <div className='field-div'>
                        <Field className='field' name='profilePicture' placeholder='enter profilePicture'/>
                        <div className='error-message'>
                            <ErrorMessage name='profilePicture'/>
                        </div>
                    </div> */}
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

                    <div className='field-div'>
                        <Field as='select' className='field' name='rollNumber' placeholder='enter roll number'>
                        <option defaultValue='Select Roll Number'>Select Roll Number</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        </Field>
                        <div className='error-message'>
                            <ErrorMessage name='rollNumber'/>
                        </div>
                    </div>
                    <div className='field-div'>
                        <Field as='select' className='field' name='class' placeholder='enter class'>
                        <option defaultValue='Select class'>Select Class</option>
                        <option>I</option>
                        {/* <option>II</option>
                        <option>III</option> */}
                        </Field>
                        <div className='error-message'>
                            <ErrorMessage name='class'/>
                        </div>
                    </div>
                    <div className='field-div'>
                        <Field as='select' className='field' name='section' placeholder='enter section'>
                        <option defaultValue='Select Section'>Select Section</option>
                        <option>A</option>
                        {/* <option>B</option>
                        <option>C</option> */}
                        </Field>
                        <div className='error-message'>
                            <ErrorMessage name='name'/>
                        </div>
                    </div>
                    <div className='field-div'>
                        <Field className='field' name='fatherName' placeholder='Father Name'/>
                        <div className='error-message'>
                            <ErrorMessage name='fatherName'/>
                        </div>
                    </div>
                    <div className='field-div'>
                        <Field className='field' name='motherName' placeholder='Mother Name'/>
                        <div className='error-message'>
                            <ErrorMessage name='motherName'/>
                        </div>
                    </div>
                    <div className='field-div'>
                        <Field className='field' name='parentEmail' placeholder='Parent Email'/>
                        <div className='error-message'>
                            <ErrorMessage name='parentEmail'/>
                        </div>
                    </div>
                    <div className='field-div'>
                        <Field className='field' name='parentMobile' placeholder='Parent mobile number'/>
                        <div className='error-message'>
                            <ErrorMessage name='parentMobile'/>
                        </div>
                    </div>
                    <div className='field-div'>
                        <Field className='field' name='currentAddress' placeholder='Current Address'/>
                        <div className='error-message'>
                            <ErrorMessage name='currentAddress'/>
                        </div>
                    </div>
                </div>
                <div className="form-buttons-div">
                <button type="reset"> Clear </button>
                <button type="submit"> Submit </button>
              </div>
                </Form>
                    )
                    }
                }
            </Formik>
    </>
  )
}

export default AddStudent;
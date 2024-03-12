import React, { useRef, useState } from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import './principal.css'
const MulterComponent = () => {
    const documentsRef = useRef(null);
    const [doc,setDoc] = useState([]);
    const [selectedFile,setSelectedFile] = useState({});
    const initialValues = {
        dateOfJoin:'',
        username:'',
        email:'',
        mobile:'',
        designation:'',
        documents:''
    }
    const validationSchema = Yup.object({
        dateOfJoin:Yup.date().required('date is required!'),
        username:Yup.string().required('username is required!'),
        email:Yup.string().email('enter valid email').required('Email is required!'),
        designation:Yup.string().required('Designation is required!'),
        mobile:Yup.number().required('mobile is required!'),
        documents:Yup.mixed().required('document is required!')
        // documents: Yup.mixed()
        // .required('Document is required!')
        // .test('.pdf', 'Unsupported file type', (value) => {
        //   // Check if the file type is supported (pdf)
        //   return value && value.type === 'application/pdf';
        // }),
    })
    const handleSubmit = (values,{resetForm})=>{
        console.log(values);
        resetForm();
    }
    const handleClear = ({resetForm,setFieldValue})=>{
    resetForm();
    setFieldValue('documents','')
    }
    // const displayImage = (documents)=>{
    //     const reader = new FileReader();
    //     reader.readAsDataURL(documents);
    //     reader.onload = ()=>{
    //        setPreview(reader.result)
    //     }
    // }
    const uploadDocument = async (e)=>{
        const formData = new FormData();
                        formData.append('file',e.target.files[0]);
                        const response = await fetch('http://localhost:8000/files',{
                            method:'POST',
                            body:formData
                            // headers:{'Content-Type':'application/json'},
                            // body:JSON.stringify(formData)
                        });
                        const data = await response.json();
                        console.log('image data',data);
    }
    // 65eb37fc95c067691481495e
    const getFile = async ()=>{
        const response = await fetch('http://localhost:8000/files');
        const data = await response.json();
        if(response.ok){
            console.log('get file data',data);
            setDoc(data)
        }else{
            console.log(data);
        }
    }
    const handleDownload = async (id, name) => {
        try {
          const response = await fetch(`http://localhost:8000/files/${id}`);
          const blob = await response.blob();
    
          // Display the image
          const imageUrl = URL.createObjectURL(blob);
          setSelectedFile({ name, imageUrl });
        } catch (error) {
          console.error('Error downloading file:', error);
        }
      };
      console.log('docs',doc);
  return (
    <>
    <div>Add employee</div>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {
            ({values,setFieldValue,resetForm,touched,errors})=>{
            return (
                <Form className='form-wrapper'>
            <div className='form'>
            <div className='field-div'>
                <Field min='2023-01-01' type='date' name='dateOfJoin' className='field'/>
                <div className='error-message'><ErrorMessage name='dateOfJoin'/></div>
            </div>
            <div className='field-div'>
                <Field placeholder='user name' name='username' className='field'/>
                <div className='error-message'><ErrorMessage name='username'/></div>
            </div>
            <div className='field-div'>
                <Field placeholder='email address' name='email' className='field'/>
                <div className='error-message'><ErrorMessage name='email'/></div>
            </div>
            <div className='field-div'>
                <Field placeholder='mobile number' name='mobile' className='field'/>
                <div className='error-message'><ErrorMessage name='mobile'/></div>
            </div>
            <div className='field-div'>
                <Field placeholder='designation' name='designation' className='field'/>
                <div className='error-message'>
                    <ErrorMessage name='designation'/>
                    {/* {touched.designation && errors.designation} */}
                    </div>
            </div>
            <div className='field-div'>
                {/* <Field placeholder='upload documents' type='file'  accept='.pdf' name='documents' className='field'/> */}
                <input type='file' ref={documentsRef} hidden name='documents' onChange={
                    (e)=>{
                        // const reader = new FileReader();
                        // reader.readAsDataURL(e.target.files[0]);
                        // reader.onload = ()=>{
                        //     // setFieldValue('documents',e.target.files[0])
                        //     setFieldValue('documents',reader.result);
                        // }
                        uploadDocument(e)
                    }
                }/>
                {
                    !values.documents?<button type='button' onClick={()=>{documentsRef.current.click()}}>Upload documents</button>:
                    <img src={values.documents}/>
                }
                <div className='error-message'>
                    <ErrorMessage name='documents'/>
                    {/* {touched.documents && errors.documents} */}
                </div>
            </div>
            </div>
            {/* {values.documents && displayImage(values.documents) } */}
            {/* <img src={preview}/> */}
            <div className='form-buttons-div'>
            <button type='button' onClick={()=>{resetForm();setFieldValue('documents','')}}>Clear</button>
            <button type='submit'>Submit</button>
            </div>
        </Form>
            )
            }
        }
    </Formik>
    <button onClick={getFile}>Get file</button>
    <div>
      <h2>Files</h2>
      
      <ul>
        {doc.map((file) => (
          <li key={file._id}>
            {file.name}{' '}
            <button onClick={() => handleDownload(file._id, file.name)}>View & Download</button>
          </li>
        ))}
      </ul>

      {selectedFile && (
        <div>
          <h3>Selected File: {selectedFile.name}</h3>
          <object data={selectedFile.imageUrl} type='application/pdf'/>
          {/* <img src={selectedFile.imageUrl} alt={selectedFile.name} /> */}
          <a href={selectedFile.imageUrl} download={selectedFile.name}>
            Download
          </a>
          <button onClick={() => setSelectedFile(null)}>Close</button>
        </div>
      )}
    </div>
      
    </>
  )
}

export default MulterComponent;

// const fileReader = new FileReader();
                    // fileReader.onloadend = async ()=>{
                    //     if(fileReader.readyState === 2){
                    //         console.log(fileReader.result);
                    //         setFieldValue('profilePicture',fileReader.result);
                        //     const response = await fetch('http://localhost:8000/files',{
                        //     method:'POST',
                        //     body:fileReader.result
                        //     // headers:{'Content-Type':'application/json'},
                        //     // body:JSON.stringify(formData)
                        // });
                        // const data = await response.json();
                        // console.log('image data',data);
                        //}
                    //}
                    //fileReader.readAsDataURL(event.currentTarget.files[0]);
                    
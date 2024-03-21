import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./principal.css";
import { useNavigate, useParams } from "react-router-dom";
import { getToken } from "../layouts/sidebarItems";


const EditEmployee = () => {
  
  const [editData,setEditData] = useState({});
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    let isMounted = true;
    async function getParticularEmployee(id){
        const response = await fetch(`http://localhost:8000/employees/getEmployee/${id}`,{
          method:'GET',
          headers:{
              'Content-Type':'application/json',
              'authorization':`Bearer ${getToken()}`
          },
      });
        if(!response.ok){
            return;
        }
        const data = await response.json();
        const refactored = (({createdAt,updatedAt,__v,...rest})=>{return rest})(data?.data);
        const dateObject = new Date(refactored?.dateOfJoin);
        const dateOfJoin = dateObject.toISOString().split('T')[0]; 
        refactored.dateOfJoin = dateOfJoin;
        refactored.age = calculateAge(dateOfJoin);
        const dobObject = new Date(refactored?.dob);
        const dob = dobObject.toISOString().split('T')[0];
        refactored.dob = dob;
        console.log('particular employee',refactored);
        if (isMounted) {
            setEditData(refactored);
          }
        }

    if(id){
         getParticularEmployee(id)
    }
    return ()=>isMounted = false;
  },[id])

  const validationSchema = Yup.object({
    dateOfJoin: Yup.date().required("date is required!"),
    username: Yup.string()
      .matches(
        /^[a-zA-Z.]+(?: [a-zA-Z]+)*$/,
        "username should not contain special characters or numbers!"
      )
      .min(5, "Username should be at least 5 characters long")
      .required("Username is required"),
    email: Yup.string()
      .email("enter valid email")
      .required("Email is required!"),
    designation: Yup.string().required("Designation is required!"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid mobile number")
      .required("Mobile number is required"),
    dob: Yup.date().required("date of birth is required!"),
    age: Yup.string().required("date of birth is required!"),
    workExperience: Yup.number()
      .min(0, "Work experience cannot be negative")
      .max(99, "Work experience should be a two-digit number or 0")
      .integer("Work experience should be an integer")
      .typeError("Enter a positive number")
      .required("Work experience is required"),
    previousSalary: Yup.string()
      // .matches(/^\d{1,3}(,\d{3})*$/, 'Invalid salary format')
      .required("Previous salary is required"),
    currentSalary: Yup.string()
      // .matches(/^\d{1,3}(,\d{3})*$/, 'Invalid salary format')
      .required("current salary is required!"),
    qualification: Yup.string().required("qualification is required!"),
    currentAddress: Yup.string().required("current address is required!"),
    currentArea: Yup.string().required("current area is required!"),
    currentCity: Yup.string().required("current city is required!"),
    currentState: Yup.string().required("current state is required!"),
    currentPincode: Yup.string()
      .matches(/^\d{6}$/, "Invalid PIN code format")
      .required("PIN code is required"),
    previousOrganisationName: Yup.string()
      .matches(
        /^[a-zA-Z.]+(?: [a-zA-Z]+)*$/,
        "should not contain special characters or numbers!"
      )
      .min(5, "should be at least 5 characters long")
      .required("Previous Organisation Name is required!"),
    profilePicture: Yup.mixed().required("Profile picture is required!"),
    documents: Yup.array()
      .min(1, "one doc is required!")
      .required("documents are required!"),
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
    return imgData;
  }
  const uploadDoc = async (data)=>{
    const formData = new FormData();
    data.forEach((file)=>{
        formData.append('files',file)
    });
    const docResponse = await fetch('http://localhost:8000/files/multiple',{
        method:'POST',
        body:formData
    });
    if(!docResponse.ok)return false;
    const docData = await docResponse.json();
    const arrData = docData?.data.map((e)=>{return e["_id"]})
    return arrData;
  }
  const handleSubmit = async (values, { resetForm }) => {
    const clone = (({ age, ...rest }) => rest)(values); // remove b and c
    clone.workExperience = +clone.workExperience;
    clone.previousSalary = +clone.previousSalary;
    clone.currentSalary = +clone.currentSalary;
    clone.mobile = +clone.mobile;
    clone.currentPincode = +clone.currentPincode;
    
    try {
      const response = await fetch(
        `http://localhost:8000/employees/putEmployee/${id}`,
        {
          method:'PUT',
          headers:{
              'Content-Type':'application/json',
              'authorization':`Bearer ${getToken()}`
          },
          body:JSON.stringify(clone)
      }
      );
      if (response.ok) {
        const data = await response.json();
        navigate('/viewEmployees',{replace:true})
        resetForm();
        window.history.replaceState(null, null, window.location.pathname);
      }
    } catch (err) {
      console.log(err);
    }
  };

  function calculateAge(birthdate) {
    // Parse the birthdate string to a Date object
    var birthDate = new Date(birthdate);

    // Get the current date
    var currentDate = new Date();

    // Calculate the difference in years
    var age = currentDate.getFullYear() - birthDate.getFullYear();

    // Adjust the age if the birthday hasn't occurred yet this year
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  return (
    
    <>
      <div>Edit employee</div>
      <Formik
        initialValues={editData}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
       
      >
        {({ values, setFieldValue, resetForm, touched, errors }) => {
          return (
            <Form className="form-wrapper">
              <div className="form">
                <div className="field-div">
                  <Field
                    min="2023-01-01"
                    type="date"
                    name="dateOfJoin"
                    className="field"
                  />
                  <div className="error-message">
                    <ErrorMessage name="dateOfJoin" />
                  </div>
                </div>
                <div className="field-div">
                  <Field
                    type="date"
                    name="dob"
                    className="field"
                    onChange={(e) => {
                      const age = calculateAge(e.target.value);
                      setFieldValue("dob", e.target.value);
                      setFieldValue("age", age);
                    }}
                  />
                  <div className="error-message">
                    <ErrorMessage name="dob" />
                  </div>
                </div>
                <div className="field-div">
                  <Field
                    type="text"
                    placeholder="age"
                    readOnly
                    name="age"
                    className="field"
                  />
                  <div className="error-message">
                    <ErrorMessage name="age" />
                  </div>
                </div>
                <div className="field-div">
                  <Field
                    placeholder="user name"
                    name="username"
                    className="field"
                    value={values?.username}
                  />
                  <div className="error-message">
                    <ErrorMessage name="username" />
                  </div>
                </div>
                <div className="field-div">
                  <Field
                    placeholder="email address"
                    name="email"
                    className="field"
                  />
                  <div className="error-message">
                    <ErrorMessage name="email" />
                  </div>
                </div>
                <div className="field-div">
                  <Field
                    placeholder="mobile number"
                    name="mobile"
                    className="field"
                  />
                  <div className="error-message">
                    <ErrorMessage name="mobile" />
                  </div>
                </div>
                <div className="field-div">
                  <Field
                    as="select"
                    placeholder="designation"
                    name="designation"
                    className="field"
                  >
                    <option defaultValue="select designation">
                      Select designation
                    </option>
                    <option>Employee</option>
                  </Field>
                  <div className="error-message">
                    <ErrorMessage name="designation" />
                  </div>
                </div>
                <div className="field-div">
                  <Field
                    placeholder="Work Experience"
                    name="workExperience"
                    className="field"
                  />
                  <div className="error-message">
                    <ErrorMessage name="workExperience" />
                  </div>
                </div>
                <div className="field-div">
                  <Field
                    placeholder="Previous Salary"
                    name="previousSalary"
                    className="field"
                  />
                  <div className="error-message">
                    <ErrorMessage name="previousSalary" />
                  </div>
                </div>
                <div className="field-div">
                  <Field
                    placeholder="Current Salary"
                    name="currentSalary"
                    className="field"
                  />
                  <div className="error-message">
                    <ErrorMessage name="currentSalary" />
                  </div>
                </div>
                <div className="field-div">
                  <Field
                    type="string"
                    placeholder="previousOrganisationName"
                    name="previousOrganisationName"
                    className="field"
                  />
                  <div className="error-message">
                    <ErrorMessage name="previousOrganisationName" />
                  </div>
                </div>
                <div className="field-div">
                  <Field
                    type="string"
                    placeholder="currentAddress"
                    name="currentAddress"
                    className="field"
                  />
                  <div className="error-message">
                    <ErrorMessage name="currentAddress" />
                  </div>
                </div>
                <div className="field-div">
                  <Field
                    as="select"
                    placeholder="Current Area"
                    name="currentArea"
                    className="field"
                  >
                    <option defaultValue="select current area">
                      Select Current Area
                    </option>
                    <option>dilshuknagar</option>
                  </Field>
                  <div className="error-message">
                    <ErrorMessage name="currentArea" />
                  </div>
                </div>
                <div className="field-div">
                  <Field
                    type="string"
                    placeholder="currentCity"
                    name="currentCity"
                    className="field"
                  />
                  <div className="error-message">
                    <ErrorMessage name="currentCity" />
                  </div>
                </div>
                <div className="field-div">
                  <Field
                    type="string"
                    placeholder="currentState"
                    name="currentState"
                    className="field"
                  />
                  <div className="error-message">
                    <ErrorMessage name="currentState" />
                  </div>
                </div>
                <div className="field-div">
                  <Field
                    type="string"
                    placeholder="currentPincode"
                    name="currentPincode"
                    className="field"
                  />
                  <div className="error-message">
                    <ErrorMessage name="currentPincode" />
                  </div>
                </div>
                <div className="field-div">
                  <Field
                    as="select"
                    placeholder="Qualification"
                    name="qualification"
                    className="field"
                  >
                    <option defaultValue="select qualification">
                      Select qualification
                    </option>
                    <option>Btech</option>
                    <option>Mtech</option>
                    <option>Bsc</option>
                    <option>Bcom</option>
                  </Field>
                  <div className="error-message">
                    <ErrorMessage name="qualification" />
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
                    onChange={async (event) => {
                      const uploadedImage = await uploadImage(event.target.files[0])
                      setFieldValue('profilePicture',uploadedImage?.data?._id);
                    }}
                  />
                  </label>
                  <div className="error-message">
                    <ErrorMessage name="profilePicture" />
                  </div>
                </div>

                <div className="field-div">
                  <label htmlFor="documents" className="custom-file-upload">
                    Upload Documents
                    <input
                      type="file"
                      id="documents"
                      multiple
                      name="documents"
                      accept=".pdf,.doc"
                      style={{ display: "none" }}
                      onChange={async (event) => {
                        const docs = await uploadDoc([...event.target.files]);
                        setFieldValue("documents", [...docs]);
                      }}
                    />
                  </label>
                  <div className="error-message">
                    <ErrorMessage name="documents" />
                  </div>
                </div>

                {/* form end div */}
              </div>

              <div className="form-buttons-div">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                  }}
                >
                  Clear
                </button>
                <button type="submit">Submit</button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default EditEmployee;

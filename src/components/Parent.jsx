import React, { useEffect } from 'react';
import { getSessionStorageRole, getToken } from '../layouts/sidebarItems';
import { useDispatch, useSelector } from 'react-redux';
import { getParentData, addParentData } from '../app/parentSlicer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import '../parent/children.css';

const Parent = () => {
  const dispatch = useDispatch();
  const parentInfo = useSelector(getParentData);
  const tokenData = getSessionStorageRole();
  const email = tokenData?.email;

  useEffect(() => {
    const getParentData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/parents/${email}`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization":`Bearer ${getToken()}`
          },
        });
        if (!response.ok) {
          console.log('Parent API has not been called');
          return;
        }
        const data = await response.json();
        dispatch(addParentData(data?.data));
      } catch (error) {
        console.error('Error fetching parent data:', error);
      }
    };
    getParentData();
  }, [dispatch, email]);
  const renderImage = (imageData, contentType) => {
    if (!imageData) return null;

    const arrayBufferView = new Uint8Array(imageData);
    const blob = new Blob([arrayBufferView], { type: contentType });
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(blob);

    return <img src={imageUrl} alt="Profile Picture" className='profileImg' />;
};
  return (
    <>
      <h2>Parent data</h2>
      <Card>
        <div className='wrapper'>
          <CardContent className='wrapper-one'>
            <p>Name: <span>{parentInfo?.name}</span></p>
            <p>Email: <span>{parentInfo?.email}</span></p>
            <p>Mobile: <span>{parentInfo?.mobile}</span></p>
            <p>Current Address: <span>{parentInfo?.currentAddress}</span></p>
          </CardContent>
          
          <div className='wrapper-two'>
            {renderImage(parentInfo?.profilePicture?.data?.data, parentInfo?.profilePicture?.contentType)}
          </div>
        </div>
      </Card>
    </>
  );
};

export default Parent;










// import React, { useEffect, useState } from 'react'
// import { getSessionStorageRole } from '../layouts/sidebarItems';
// import { useDispatch, useSelector } from 'react-redux';
// import { getParentData,addParentData } from '../app/parentSlicer';
// import '../parent/children.css';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';

// const Parent = () => {

//   const dispatch = useDispatch();
//   const parentInfo = useSelector(getParentData);
//     const tokenData = getSessionStorageRole();
//     const email = tokenData?.email;
//     useEffect(()=>{
//         const getParentData = async ()=>{
//             const response = await fetch(`http://localhost:8000/parents/${email}`);
//             if(!response.ok){
//                 console.log('parent api has not called');
//                 return
//             }
//             const data = await response.json();
//             dispatch(addParentData(data?.data))
//         }
//         getParentData();
//     },[])
//     console.log('parent info',parentInfo);
//   return (
//     <>
//     <h2>Parent data</h2>
//     <Card>
//        <div className='wrapper'>
//        <div className='wrapper-one'>
//        <p>Name:<span>{parentInfo?.name}</span></p>
//        <p>Email:<span>{parentInfo?.email}</span></p>
//        <p>Mobile:<span>{parentInfo?.mobile}</span></p>
//        <p>Current Address:<span>{parentInfo?.currentAddress}</span></p>
//        </div>
//        <div className='wrapper-two'>
//          <img className='profileImg'/>
//        </div>
//        </div>
      
//     </Card>
//     </>
//   )
// }

// export default Parent;




// import React, { useEffect, useState } from 'react'
// import { getSessionStorageRole } from '../layouts/sidebarItems';
// import { useDispatch, useSelector } from 'react-redux';
// import { getParentData,addParentData } from '../app/parentSlicer';
// import '../parent/children.css';
// const Parent = () => {

//   const dispatch = useDispatch();
//   const parentInfo = useSelector(getParentData);
//     const tokenData = getSessionStorageRole();
//     const email = tokenData?.email;
//     useEffect(()=>{
//         const getParentData = async ()=>{
//             const response = await fetch(`http://localhost:8000/parents/${email}`);
//             if(!response.ok){
//                 console.log('parent api has not called');
//                 return
//             }
//             const data = await response.json();
//             dispatch(addParentData(data?.data))
//         }
//         getParentData();
//     },[])
//     console.log('parent info',parentInfo);
//   return (
//     <>
//     <h2>Parent data</h2>
//     <div className='wrapper'>
//       <div className='wrapper-one'>
//       <p>Name:<span>{parentInfo?.name}</span></p>
//       <p>Email:<span>{parentInfo?.email}</span></p>
//       <p>Mobile:<span>{parentInfo?.mobile}</span></p>
//       <p>Current Address:<span>{parentInfo?.currentAddress}</span></p>
//       </div>
//       <div className='wrapper-two'>
//         <img className='profileImg'/>
//       </div>
//       </div>
//     </>
//   )
// }

// export default Parent;





import React from 'react';
import './children.css';
import { useSelector } from 'react-redux';
import { getParentData } from '../app/parentSlicer';
import Card from '@mui/material/Card';

const Childrens = () => {
    const parentInfo = useSelector(getParentData);

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
            <h2>Children data</h2>
            <Card >
            <div>
                {parentInfo?.children?.length > 0 ? (
                    parentInfo.children.map((child, index) => (
                        <div key={index} className='wrapper'>
                                <div className='wrapper-one'>
                                <p>Name: <span>{child?.name}</span></p>
                                <p>Class: <span>{child?.class}</span></p>
                                <p>Section: <span>{child?.section}</span></p>
                                <p>Roll Number: <span>{child?.rollNumber}</span></p>
                                </div>
                                <div className='wrapper-two'>{renderImage(child?.profilePicture?.data?.data, child?.profilePicture?.contentType)}</div>
                        </div>
                    ))
                ) : (
                    <p>Data Not Found!</p>
                )}
            </div>
            </Card>
        </>
    );
};

export default Childrens;





// import React from 'react';
// import './children.css';
// import { useSelector } from 'react-redux';
// import { getParentData } from '../app/parentSlicer';

// const Childrens = () => {
//     const parentInfo = useSelector(getParentData);

//     const renderImage = (imageData, contentType) => {
//         if (!imageData) return null;

//         const arrayBufferView = new Uint8Array(imageData);
//         const blob = new Blob([arrayBufferView], { type: contentType });
//         const urlCreator = window.URL || window.webkitURL;
//         const imageUrl = urlCreator.createObjectURL(blob);

//         return <img src={imageUrl} alt="Profile Picture" className='profileImg' />;
//     };

//     return (
//         <>
//             <h2>Children data</h2>
//             <div>
//                 {parentInfo?.children?.length > 0 ? (
//                     parentInfo.children.map((child, index) => (
//                         <div key={index} className='wrapper'>
//                                 <div className='wrapper-one'>
//                                 <p>Name: <span>{child?.name}</span></p>
//                                 <p>Class: <span>{child?.class}</span></p>
//                                 <p>Section: <span>{child?.section}</span></p>
//                                 <p>Roll Number: <span>{child?.rollNumber}</span></p>
//                                 </div>
//                                 <div className='wrapper-two'>{renderImage(child?.profilePicture?.data?.data, child?.profilePicture?.contentType)}</div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>Data Not Found!</p>
//                 )}
//             </div>
//         </>
//     );
// };

// export default Childrens;

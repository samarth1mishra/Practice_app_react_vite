import {useState,useEffect} from 'react'
import {FiTrash2,FiDownload,FiClipboard,FiFileText, FiCheckCircle,FiX,FiAlertTriangle} from 'react-icons/fi';
export const ViewFormData=()=>{
 const [savedData,setSaveData]=useState(null);
 const [message,setMessage]=useState('');
 const [profileImage,setProfileImage]=useState(null);
 const [showModal,setShowModal]=useState(false);

 useEffect(()=>{
    const data=localStorage.getItem('employeeFormData')
    const image=localStorage.getItem('profileImage');
    if(data){
        const objectData=JSON.parse(data);
        setSaveData(objectData);
    }
    if(image){
        setProfileImage(image);
    }
 },[]);

 const clearData=()=>{
    localStorage.removeItem('employeeFormData');
    localStorage.removeItem('profileImage');
    setSaveData(null);
    setProfileImage(null);
    setMessage('All data Cleared');
    setShowModal(false);
    setTimeout(()=>setMessage(''),3000);
 }
 const copyToClipboard=()=>{
    if(!savedData)return;
    const jsonString=JSON.stringify(savedData,null,2);
    navigator.clipboard.writeText(jsonString).then(()=>{ setMessage('JSON copied to clipboard!');
        setTimeout(() => setMessage(''), 3000);}).catch(()=>{
        setMessage('Failed to Copy');
        setTimeout(()=>setMessage(''),3000);
    })
 }
 const downloadJson=()=>{
    if (!savedData) return;
    const fileName = 'employeeFormData.json';
    const jsonString = JSON.stringify(savedData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setMessage('JSON file downloaded!');
    setTimeout(() => setMessage(''), 3000);
 }

if(!savedData){
    return (
        <div className="flex flex-col items-center justify-center h-full p-12 bg-gradient-to-tr from-purple-200 to-blue-200 dark:from-gray-800 dark:to-gray-700 rounded-xl">
        <FiFileText className="text-7xl text-indigo-400 dark:text-indigo-300 mb-6 animate-pulse" />
        <p className="text-xl font-medium text-gray-600 dark:text-gray-300">No form submitted yet.</p>
      </div>
    );
}
const groups=[
    {title:'Personal Details',fields:['firstName','middleName','lastName','mainMobile','emergencyMobile','email','address','dob','gender','maritalStatus']},
    {title:'Employee Details',fields:['employeeId','jobTitle','department','reportingHead','assistantHead','employeeType','joiningDate','confirmationDate']},
    {title:'Bank Details',fields:['bankName','accountNumber','ifsc','accountHolder']}
  ];

  const labels={
    firstName:'First Name*', middleName: 'Middle Name', lastName: 'Last Name*',
    mainMobile:'Main Mobile*', emergencyMobile: 'Emergency Mobile*', email: 'Email*', address: 'Address*',
    dob:'Date of Birth*', gender: 'Gender*', maritalStatus: 'Marital Status*',
    employeeId:'Employee ID*', jobTitle: 'Job Title*', department: 'Department*', reportingHead: 'Reporting Head*', assistantHead: 'Assistant Reporting Head',
    employeeType:'Employee Type*', joiningDate: 'Joining Date*', confirmationDate: 'Confirmation Date*',
    bankName:'Bank Name*', accountNumber: 'Account Number*', ifsc: 'IFSC Code*', accountHolder: 'Account Holder Name*'
  };

return (
    <div className="sm:p-8 max-w-10xl  space-y-10">
      <div className=" text-center">
       {profileImage &&(
        <div className="flex justify-center mb-6">
            <div className="flex flex-col items-center">
             <img src={profileImage} alt="Uploaded Profile" className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-purple-500 shadow-xl"/>
             <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Uploaded Profile Picture
             </p>
            </div>
        </div>
       )}
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            {groups.map(({ title, fields }) => (
          <div key={title} className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md space-y-4 w-full sm:w-[90%] sm:mx-auto">
            <h2 className="text-xl font-bold text-purple-700 dark:text-purple-300 border-b pb-2">{title}</h2>
            <dl className=" space-y-4">
              {fields.map((key) => (
                <div key={key} className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <dt className="text-sm font-semibold text-gray-600 dark:text-gray-100 w-full sm:w-1/3 break-words">
                    {labels[key]}
                  </dt>
                  <dd className="text-sm font-md text-gray-600 dark:text-gray-300 w-full sm:w-2/3 break-words text-center sm:text-center">
                    {savedData[key] || '-'}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
        </div>
         <div className="flex flex-col items-center justify-center space-y-4">
        { message && (
            <div className="flex items-center gap-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 px-6 py-2 rounded-lg shadow-md">
               <FiCheckCircle /><span>{message}</span>
            </div>
        )}
        </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        <button  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl shadow-md transition-transform hover:scale-105" onClick={copyToClipboard}><FiClipboard className="text-base sm:text-lg" /><span  className="text-sm sm:text-base">Copy JSON</span></button>
        <button  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md transition-transform hover:scale-105" onClick={downloadJson}><FiDownload className="text-base sm:text-lg" /><span className="text-sm sm:text-base">Download JSON</span></button>
        <button   className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-md transition-transform hover:scale-105" onClick={()=>setShowModal(true)}><FiTrash2 className="text-base sm:text-lg" /><span className="text-sm sm:text-base">Clear Data</span></button>

    </div>
    {showModal &&(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 m-2 sm:p-8 max-w-sm w-full shadow-xl relative animate-fade-in-up">
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition">
              <FiX className="text-xl" />
            </button>
            <div className="flex flex-col items-center text-center">
              <FiAlertTriangle className="text-red-500 text-4xl mb-2" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-2">
                Confirm Deletion
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Are you sure you want to permanently delete all form data and profile image?
              </p>
              <div className="flex gap-4 mt-4 w-full">
                <button onClick={clearData} className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md font-medium transition">
                  Yes, Delete
                </button>
                <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg shadow-md font-medium transition dark:bg-gray-700 dark:text-white">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
    )}
    </div>
)
}
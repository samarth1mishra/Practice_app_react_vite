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
        <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-lg">
            <FiFileText className="text-6xl text-blue-400 dark:text-gray-600 mb-4 animate-pulse"/>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 ">Form is Not Submitted Yet! Please Submit It.</p>
        </div>
    );
}
return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center mb-6 gap-4">
        <FiFileText className="text-3xl text-blue-700 dark:text-blue-300"/>
        <h1 className="text-2xl md:text-3xl font-semibold text-blue-700 dark:text-blue-300 "> Details of the Form That is Submitted </h1>
       </div>
       {profileImage &&(
        <div className="flex justify-center mb-6">
            <div className="flex flex-col items-center">
             <img src={profileImage} alt="Uploaded Profile" className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg  transition-duration-300 hover:scale-115"/>
             <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Uploaded Profile Picture
             </p>
            </div>
        </div>
       )}
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Object.entries(savedData).map(([key,value])=>(
              <div key={key} className="relative flex flex-col bg-white dark:bg-gray-800 p-4 rounded-lg shadow gover:shadow-lg transition duration-300 border border-blue-100 dark:border-gray-700 ">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-300 uppercase tracking wide">{key.replace(/([A-Z])/g,' $1')}</span>
                <span className="mt-1 text-gray-900 dark:text-gray-100 break-words text-sm">{value||'-'}</span>
                </div>
            ))}
        </div>
         <div className="flex items-center justify-center gap- mt-4">
        { message && (
            <div className="flex items-center gap-2 bg-green-100 text-bg-green-800 dark:bg-green-800 dark:text-green-100 px-4 py-2 rounded-lg shadow animate-fade-in">
               <FiCheckCircle /><span>{message}</span>
            </div>
        )}
        </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <button  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-xl shadow-md transition" onClick={copyToClipboard}><FiClipboard className="text-lg" /><span className="text-sm sm:text-base">Copy JSON</span></button>
        <button  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-md transition" onClick={downloadJson}><FiDownload className="text-lg" /><span className="text-sm sm:text-base">Download JSON</span></button>
        <button  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-md transition" onClick={()=>setShowModal(true)}><FiTrash2 className="text-lg" /><span className="text-sm sm:text-base">Clear Data</span></button>

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
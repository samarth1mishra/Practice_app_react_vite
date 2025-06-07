import {useState,useEffect} from 'react'
import {FiTrash2,FiDownload,FiClipboard,FiFileText} from 'react-icons/fi';
export const ViewFormData=()=>{
 const [savedData,setSaveData]=useState(null);
 const [message,setMessage]=useState('');

 useEffect(()=>{
    const data=localStorage.getItem('employeeFormData')
    if(data){
        const objectData=JSON.parse(data);
        setSaveData(objectData);
    }
 },[]);

 const clearData=()=>{
    localStorage.removeItem('employeeFormData');
    setSaveData(null);
    setMessage('All data Cleared');
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
        <div className="p-4 text-center text-gray-600 dark:text-gray-300">
            <p className="text-lg font-bold ">"Form is Not Submitted Yet!. Please Submit It."</p>
        </div>
    );
}
return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-center mb-6 space-x-2">
        <FiFileText className="text-3xl text-blue-600"/>
        <h1 className="text-2xl md:text-3xl font-semibold text-blue-700 dark:text-blue-300 "> Details of the Form That is Submitted </h1>
       </div> 
       <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            {Object.entries(savedData).map(([key,value])=>(
              <div key={key} className="flex flex-col text-sm sm:text-base">
                <span className="font-semibold text-gray-700 dark:text-gray-300 capitalize">{key.replace(/([A-Z])/g,' $1')}</span>
                <span className="text-gray-900 dark:text-white break-words">{value||'-'}</span>
                </div>
            ))}
        </div>
        {message && (
            <div className="">
                {message}
                </div>
        )}
    <div className="flex flex-col sm:flex-row justify-between ">
        <button className="px-6 py-2  bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200" onClick={copyToClipboard}><FiTrash2 className="mr-2" /> Copy JSON</button>
        <button className="px-6 py-2  bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200" onClick={downloadJson}><FiTrash2 className="mr-2" /> Download JSON</button>
        <button className="px-6 py-2  bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200" onClick={clearData}><FiTrash2 className="mr-2" /> Clear Saved Data</button>

    </div>
    </div>
)
}
import {useState,useEffect} from 'react'
export const ViewFormData=()=>{
 const [savedData,setSaveData]=useState(null);
 useEffect(()=>{
    const data=localStorage.getItem('employeeFormData')
    if(data){
        const objectData=JSON.parse(data);
        setSaveData(objectData);
    }
 },[]);


if(!savedData){
    return (
        <div className="p-4 text-center text-gray-600 dark:text-gray-300">
            <p className="text-lg font-bold ">"Form is Not Submitted Yet!. Please Submit It."</p>
        </div>
    );
}
return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300 text-center"> Details of the Form That is Submitted </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            {Object.entries(savedData).map(([key,value])=>(
              <div key={key} className="flex flex-col text-sm sm:text-base">
                <span className="font-semibold text-gray-700 dark:text-gray-300 capitalize">{key.replace(/([A-Z])/g,' $1')}</span>
                <span className="text-gray-900 dark:text-white break-words">{value||'-'}</span>
                </div>
            ))}
        </div>
    <div className="flex justify-center mt-6">
        <button className="px-6 py-2  bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200" onClick={()=>{localStorage.removeItem('employeeFormData');setSaveData(null);}}>Clear Saved Data</button>
    </div>
    </div>
)
}
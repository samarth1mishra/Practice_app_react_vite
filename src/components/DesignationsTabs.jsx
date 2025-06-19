import {useState} from'react';
import {Save,Edit2,Trash2,X,Search } from 'lucide-react';

export default function DesignationsTab({ designations, setDesignations, departments, windowWidth }) {
  const [designationForm, setDesignationForm] = useState({department: '',designation: ''});
  const [editingDesId, setEditingDesId] = useState(null);
  const [tempDesData, setTempDesData] = useState({ department: '', designation: '' });
  const [deleteTarget,setDeleteTarget]=useState(null);
  const addDesignation=()=>{
    if(designationForm.department && designationForm.designation){
      const newDesignations=[...designations,{id:Date.now(),department:designationForm.department,designation:designationForm.designation}];
      setDesignations(newDesignations);
      setDesignationForm({department:'',designation:''});
    }
  }
  const deleteDesignation=(id)=>{
    const newDesignations=designations.filter(des=>des.id!==id);
    setDesignations(newDesignations);
    localStorage.setItem('designations', JSON.stringify(newDesignations));
  }
  const startEditDesignation=(id,department,designation)=>{
    setEditingDesId(id);
    setTempDesData({department,designation});
  }
  const cancelEditDesignation=()=>{
   setEditingDesId(null);
   setTempDesData({department:'',designation:''});
  } 
  const saveEditDesignation=(id)=>{
    if(tempDesData.department &&tempDesData.designation){
      const updatedDesignations=designations.map(des=>des.id===id?{...des,...tempDesData}:des);
      setDesignations(updatedDesignations);
    }
    setEditingDesId(null);
    setTempDesData({department:'',designation:''});
  };
  return (
      <div className="space-y-6 ">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Add Designation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <select value={designationForm.department} onChange={(e) => setDesignationForm(prev => ({ ...prev, department: e.target.value }))} className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-100">
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.name}>{dept.name}</option>
            ))}
          </select>
          <input type="text" value={designationForm.designation} onChange={(e) => setDesignationForm(prev => ({ ...prev, designation: e.target.value }))} placeholder="Enter designation" className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-100"/>
        </div>
        <button onClick={addDesignation} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm transition" >
          <Save className="w-4 h-4" />
          Save
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Designations</h2>
          <div className="relative w-full sm:w-72">
            <input type="text" placeholder="Search designations..." className="pl-9 pr-3 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-100"/>
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
        <div className="space-y-3">
          {designations.length === 0 ? (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              No designations found.
            </div>
          ) : (
            designations.map((des) => (
              <div key={des.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-md gap-3" >
                {editingDesId === des.id ? (
                  <div className="flex-1 w-full space-y-2">
                    <select value={tempDesData.department} onChange={(e) => setTempDesData(prev => ({ ...prev, department: e.target.value }))} className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-sm">
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.name}>{dept.name}</option>
                      ))}
                    </select>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input type="text" value={tempDesData.designation} onChange={(e) => setTempDesData(prev => ({ ...prev, designation: e.target.value }))} className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-sm"/>
                      <div className="flex gap-2 justify-center w-full sm:w-auto">
                  <button onClick={() => saveEditDesignation(des.id)} className="bg-green-600 text-white px-2 py-1.5 sm:px-3 text-sm rounded flex items-center gap-1">
                    <Save className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                  <button onClick={cancelEditDesignation} className="bg-gray-500 text-white px-2 py-1.5 sm:px-3 text-sm rounded flex items-center gap-1">
                    <X className="w-3.5 h-3.5" />
                    <span>Cancel</span>
                  </button>
                  </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1">
                    <span className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100">
                      {des.designation}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm ml-2">
                      ({des.department})
                    </span>
                  </div>
                )}
                <div className="flex gap-3">
                  {editingDesId !== des.id && (
                    <>
                      <button onClick={() => startEditDesignation(des.id, des.department, des.designation)} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 text-sm" >
                        <Edit2 className="w-4 h-4" />
                        <span className="sm:hidden">Edit</span>
                      </button>
                      <button onClick={() => setDeleteTarget(des)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1 text-sm" >
                        <Trash2 className="w-4 h-4" />
                        <span className="sm:hidden">Delete</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {
        deleteTarget && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 max-w-sm space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Confirm Delete</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
          Are you sure you want to delete the designation <strong>{deleteTarget.designation}</strong> from <strong>{deleteTarget.department}</strong>?
          </p>
          <div className="flex justify-end gap-3">
         <button onClick={() => setDeleteTarget(null)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm" >
          Cancel
         </button>
         <button onClick={() => {deleteDesignation(deleteTarget.id);setDeleteTarget(null);}} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm">
          Delete
        </button>
        </div>
        </div>
        </div>
        )
      }
    </div>
  );
}
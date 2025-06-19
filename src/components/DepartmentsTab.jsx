import { useState } from 'react';
import { Save, Edit2, Trash2, X, Search } from 'lucide-react';

export default function DepartmentsTab({ departments, setDepartments, windowWidth }) {
  const [departmentForm, setDepartmentForm] = useState('');
  const [editingDeptId, setEditingDeptId] = useState(null);
  const [tempDeptName, setTempDeptName] = useState('');
  const [showDeleteModal,setShowDeleteModal]=useState(false);
  const [deptToDelete,setDeptToDelete]=useState(null);
  const addDepartment=()=>{
    if(!departmentForm.trim())return;
    setDepartments((prev)=>[...prev,{id:Date.now(),name:departmentForm.trim()}]);
    setDepartmentForm('');
  };
  const startEditDepartment=(id,name)=>{
    setEditingDeptId(id);
    setTempDeptName(name);
  }
  const saveEditDepartment=(id)=>{
    if(!tempDeptName.trim())return;
    setDepartments((prev)=>prev.map((dept)=>(dept.id===id?{...dept,name:tempDeptName.trim()}:dept)))
    setEditingDeptId(null);
    setTempDeptName('');
  }
  const cancelEditDepartment=()=>{
    setEditingDeptId(null);
    setTempDeptName('');
  }
  const deleteDepartment=(id)=>{
    const updated=departments.filter((dept)=>dept.id!==id);
    setDepartments(updated);
    localStorage.setItem('departments',JSON.stringify(updated));
  }
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 md:p-4 lg:p-6">
        <h2 className="text-md md:text-lg lg:text-xl font-semibold mb-3 dark:text-gray-100">
          Add Department
        </h2>
        <div className="flex justify-center gap-2">
          <input type="text" value={departmentForm} onChange={(e) => setDepartmentForm(e.target.value)} placeholder="Enter department name" className="w-full min-w-0 p-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"/>
          <button onClick={addDepartment} className="bg-blue-600 text-white px-3 py-2 md:px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-1 text-sm md:text-base">
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 md:p-4 lg:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-3">
          <h2 className="text-md md:text-lg lg:text-xl font-semibold dark:text-gray-100">
            Departments
          </h2>
          <div className="relative w-full md:w-auto">
            <input type="text" placeholder="Search departments..." className="pl-8 pr-3 py-2 text-sm w-full border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"/>
            <Search className="w-4 h-4 absolute left-2 top-2.5 text-gray-400 dark:text-gray-300" />
          </div>
        </div>
        <div className="space-y-2">
          {departments.length===0?(
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              No departments found
            </div>
          ):(
            departments.map((dept)=>(
              <div key={dept.id}  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md gap-2">
                {editingDeptId===dept.id?(
                  <div className="flex-1 w-full flex flex-col sm:flex-row gap-2">
                    <input type="text" value={tempDeptName} onChange={(e) => setTempDeptName(e.target.value)} className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"/>
                 <div className="flex gap-2 justify-center w-full sm:w-auto">
                  <button onClick={() => saveEditDepartment(dept.id)} className="bg-green-600 text-white px-2 py-1.5 sm:px-3 text-sm rounded flex items-center gap-1">
                    <Save className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                  <button onClick={cancelEditDepartment} className="bg-gray-500 text-white px-2 py-1.5 sm:px-3 text-sm rounded flex items-center gap-1">
                    <X className="w-3.5 h-3.5" />
                    <span>Cancel</span>
                  </button>
                  </div>
                   </div>
                ) : (
                  <span className="flex-1 font-medium text-sm sm:text-base dark:text-white">
                    {dept.name}
                  </span>
                )}
                <div className="flex gap-2 sm:ml-2">
                  {editingDeptId !== dept.id && (
                    <>
                      <button onClick={() => startEditDepartment(dept.id, dept.name)} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 text-sm">
                        <Edit2 className="w-4 h-4" />
                        <span className="sm:hidden">Edit</span>
                      </button>
                      <button onClick={() => {setDeptToDelete(dept);setShowDeleteModal(true);}} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1 text-sm">
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
    {showDeleteModal &&deptToDelete &&(
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Delete Department</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to delete "
              <span className="font-medium">{deptToDelete.name}</span>"?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button onClick={()=>{deleteDepartment(deptToDelete.id);setShowDeleteModal(false); setDeptToDelete(null);}} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
    )}
    </div>
  );
}

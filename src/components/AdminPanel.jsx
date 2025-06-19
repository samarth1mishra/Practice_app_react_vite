import { useState, useEffect } from 'react';
import { Building, User, Users, Menu, X } from 'lucide-react';
import DepartmentsTab from './DepartmentsTab';
import DesignationsTab from './DesignationsTabs';
import EmployeesTab from './EmployeesTab';

const loadData=(key)=>{
  const data=localStorage.getItem(key);
  return data?JSON.parse(data):[];
}
export const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('departments');
  const [departments, setDepartments] = useState(() => loadData('departments'));
  const [designations,setDesignations]=useState(()=>loadData('designations'));
  const [employees,setEmployees]=useState(()=>loadData('employees'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    localStorage.setItem('departments', JSON.stringify(departments));
  }, [departments]);
  useEffect(() => {
    if (windowWidth > 768) setMobileMenuOpen(false);
  }, [activeTab, windowWidth]);
  const tabs=[{key:'departments', icon:<Building className="w-4 h-4" /> },{key:'designations',icon:<User className="w-4 h-4" /> },{key:'employees',icon:<Users className="w-4 h-4"/>}];
  return (
    <div className="min-h-screen  bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="flex-none bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 ">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl sm:text-2xl font-bold">Admin Panel</h1>
            <div className="md:hidden">
              <button onClick={()=>setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white p-2">
                {mobileMenuOpen?<X className="w-6 h-6"/>:<Menu className="w-6 h-6"/>}
              </button>
            </div>
          </div>
        </div>
         {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 pb-4 space-y-1">
            {tabs.map(({ key, icon }) => (
              <button key={key} onClick={() => {setActiveTab(key);setMobileMenuOpen(false);}}className={`w-full py-2 px-3 rounded flex items-center gap-2 text-sm ${activeTab === key? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400':'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>  
              {icon} 
              <span className="capitalize">{key}</span>
              </button>
            ))}
          </div>
        )}
        <div className="hidden md:flex space-x-6 px-4 md:px-6 border-t md:border-t-0 border-gray-200 dark:border-gray-700">
          {tabs.map(({ key, icon }) => (
            <button key={key} onClick={() => setActiveTab(key)} className={`py-3 px-1 border-b-2 font-medium text-sm capitalize flex items-center gap-2 transition ${activeTab === key? 'border-blue-500 text-blue-600 dark:text-blue-400': 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200' }`}>
            {icon}
            <span>{key}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {activeTab === 'departments' && (
          <DepartmentsTab  departments={departments}  setDepartments={setDepartments}  windowWidth={windowWidth}/>
        )}
        {activeTab==='designations' && (
          <DesignationsTab designations={designations} setDesignations={setDesignations} departments={departments} windowWidth={windowWidth}/>
        )}
        {activeTab==='employees' && (
          <EmployeesTab employees={employees} setEmployees={setEmployees} departments={departments} designations={designations} />
        )}
      </div>
    </div>
  );
};

import {useState,useEffect} from 'react'
// import { EmployeeForm } from "./EmployeeForm";
import { AdminPanel } from "./AdminPanel";
import { EmployeeInternPanel } from './EmployeeInternPanel';
import { Login } from "./Login";
export const Content=({activeTab,isAdminLoggedIn,isUserLoggedIn,setIsAdminLoggedIn,setIsUserLoggedIn})=>{
  const [adminLoggedIn, setAdminLoggedIn] = useState(isAdminLoggedIn);
  const [employeeLoggedIn, setEmployeeLoggedIn] = useState(isUserLoggedIn);
  useEffect(() => {
    setAdminLoggedIn(localStorage.getItem('isAdminLoggedIn') === 'true');
    setEmployeeLoggedIn(localStorage.getItem('isUserLoggedIn') === 'true');
  }, [activeTab]);
  const handleLoginUpdate = (isAdmin) => {
    if (isAdmin) {
      setAdminLoggedIn(true);
    } else {
      setEmployeeLoggedIn(true);
    }
  };
  const toggleContent=()=>{
    switch (activeTab) {
      case "Employee/Intern Panel":
        return employeeLoggedIn ? (
          <EmployeeInternPanel />
        ) : (
          <Login setIsAdminLoggedIn={setAdminLoggedIn} setIsUserLoggedIn={setEmployeeLoggedIn} activeTab={activeTab}/>
        );
      case "Admin Panel":
        return adminLoggedIn ? (
          <AdminPanel />
        ) : (
          <Login setIsAdminLoggedIn={setAdminLoggedIn} setIsUserLoggedIn={setEmployeeLoggedIn} activeTab={activeTab}/>
        );
      default:
        return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="text-2xl mb-4">👋 Welcome!</div>
            <p>Please select a panel to continue</p>
          </div>
        )
    }
  };
  return (
    <div  className="p-1">
        <div className="text-lg ">{toggleContent()}</div>
      </div>
  );
};


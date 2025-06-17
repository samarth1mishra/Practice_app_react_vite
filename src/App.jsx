import { useState, useEffect } from 'react';
import {Sidebar} from './components/Sidebar'
import {Content} from './components/Content';
import {Login} from './components/Login'
import { SignUp } from './components/SignUp';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import {ProtectedRoute} from './components/ProtectedRoute.jsx'
const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState();
  const [sidebarOpen,setSidebarOpen]=useState(true);
  const [isMobile,setIsMobile]=useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(localStorage.getItem('isAdminLoggedIn') === 'true');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem('isUserLoggedIn') === 'true');
  const tabs = [{ name:'Employee/Intern Panel',icon:'👥'},{name:'Admin Panel',icon:'🛡️'}]
  useEffect(() => {
   if(darkMode){
    document.documentElement.classList.add('dark');
   }else{
    document.documentElement.classList.remove('dark');
   }
  }, [darkMode]);

  useEffect(()=>{
    const handleReSize=()=>{
      const mobileWidth=window.innerWidth<768;
      setIsMobile(mobileWidth);
      setSidebarOpen(!mobileWidth);
    }
    handleReSize();
    window.addEventListener('resize',handleReSize);
    return ()=> window.removeEventListener('resize',handleReSize);
  },[])
  
  const handleTabChange=(tab)=>{
    setActiveTab(tab);
    localStorage.setItem('activeTab',tab);
    if(isMobile){
      setSidebarOpen(!isMobile);
    }
  };
  const handleLogout = () => {
    const currentTab=localStorage.getItem('activeTab')
    if (currentTab === 'Admin Panel') {
      localStorage.setItem('isAdminLoggedIn', 'false');
      setIsAdminLoggedIn(false);
    } else {
      localStorage.setItem('isUserLoggedIn', 'false');
      setIsUserLoggedIn(false);
    }
    setActiveTab((previousVal)=>(previousVal==='Admin Panel' ? 'Employee/Intern Panel' : 'Admin Panel'));
    setTimeout(()=>setActiveTab(currentTab),0);
  };
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signUp" element={<SignUp/>}/>
      <Route path="/" element={
      <div className="h-screen flex bg-white dark:bg-gray-900  text-black dark:text-white ">
      <Sidebar tabs={tabs} activeTab={activeTab} setActiveTab={handleTabChange} darkMode={darkMode} setDarkMode={setDarkMode} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}   handleLogout={handleLogout}/>
      <div className={`flex-1 p-4 overflow-auto transition-all duration-300 ${sidebarOpen?'ml-64':'ml-16'} md:ml-0`}>
      <Content activeTab={activeTab} isAdminLoggedIn={isAdminLoggedIn} isUserLoggedIn={isUserLoggedIn}/>
      </div>
    </div>
     } />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
import { useState, useEffect } from 'react';
import {Sidebar} from './components/Sidebar'
import {Content} from './components/Content';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState();
  const [sidebarOpen,setSidebarOpen]=useState(false);
  const tabs = ['Careers','Services','Blogs','Employee Info'];
  useEffect(() => {
   if(darkMode){
    document.documentElement.classList.add('dark');
   }else{
    document.documentElement.classList.remove('dark');
   }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-900  text-black dark:text-white">
      <Sidebar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} setDarkMode={setDarkMode} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
      <Content activeTab={activeTab}/>
    </div>

  );
};

export default App;
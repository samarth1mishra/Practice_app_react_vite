import {SidebarButton} from './SidebarButton';
import {Button} from './Button';

export const Sidebar = ({tabs,activeTab,setActiveTab,darkMode,setDarkMode,sidebarOpen,setSidebarOpen }) => {
  return (
    <div  className={` h-screen flex flex-col justify-between transition-all duration-300 bg-gray-100 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 ${sidebarOpen ? 'w-64 p-4' : 'w-16 p-2 '} fixed md:static z-20`}>
      <div>
        <div className={`${sidebarOpen?'flex items-center justify-between mb-6': 'flex flex-col items-center mb-6 space-y-4'}`}>
          <button onClick={()=>setSidebarOpen(!sidebarOpen)} className="text-xl text-gray-700 dark:text-gray-200 font-bold hover:text-blue-500 transition-color" title="Toggle Sidebar">
            ☰
          </button>
          {sidebarOpen && (
             <Button onClick={() => setDarkMode(!darkMode)} size="small" className="text-sm">
              {darkMode ? '☀️Light' : '🌙Dark'}
            </Button>
          )}
        </div>
          <div className="space-y-2">
            {tabs.map((tab) => (
              <SidebarButton
                key={tab.name}
                label={sidebarOpen?tab.name:tab.icon}
                isActive={activeTab === tab.name}
                onClick={() => setActiveTab(tab.name)}
                isCollapsed={!sidebarOpen}
              />
            ))}

          </div>
        </div>
        <div >
          <button onClick={()=>{
            localStorage.removeItem('isLoggedIn');
            window.location.href='/login';
          }} className={`w-full flex items-center justify-center px-4 py-2 mt-6 text-sm font-semibold bg-red-500 text-white rounded-lg hover:bg-red-300  transition-all duration-200`}>
            {sidebarOpen ? 'Logout' : '⏻'}
          </button>
        </div>
      </div>
  );
};

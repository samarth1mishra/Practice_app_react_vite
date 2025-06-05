import {SidebarButton} from './SidebarButton';
import {Button} from './Button';

export const Sidebar = ({tabs,activeTab,setActiveTab,darkMode,setDarkMode,sidebarOpen,setSidebarOpen }) => {
  return (
    <div className={`${sidebarOpen?'w-64':'w-16'} bg-gray-100 dark:bg-gray-800 p-2 flex flex-col justify-between`}>
      <div>
        <div className="flex items-center justify-between mb-4">
          <button onClick={()=>setSidebarOpen(!sidebarOpen)} className="text-2xl font-bold hover:text-blue-500 transition-color">
            ☰
          </button>
          {sidebarOpen && (
             <Button onClick={() => setDarkMode(!darkMode)} size="small" className="text-sm">
              {darkMode ? '☀️' : '🌙'}
            </Button>
          )}
        </div>
        {sidebarOpen && (
          <div className="space-y-2">
            {tabs.map((tab) => (
              <SidebarButton
                key={tab}
                label={tab}
                isActive={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              />
            ))}

          </div>
        )}
        </div>
        <div className="">
        {sidebarOpen && (
          <button onClick={()=>{
            localStorage.removeItem('isLoggedIn');
            window.location.href='/login';
          }} className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            LogOut
          </button>
        )}
        </div>
      </div>
  );
};

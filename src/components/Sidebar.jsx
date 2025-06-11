import { useState } from 'react';
import {SidebarButton} from './SidebarButton';
import {Button} from './Button';
import {motion,AnimatePresence} from 'framer-motion'

export const Sidebar = ({tabs,activeTab,setActiveTab,darkMode,setDarkMode,sidebarOpen,setSidebarOpen }) => {
  const [hoveredTab, setHoveredTab] = useState(null);
  return (
    <div  className={` h-screen flex flex-col justify-between transition-all duration-300 bg-gray-100 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 ${sidebarOpen ? 'w-64 p-4' : 'w-16 p-2 '} fixed md:static z-20`}>
      <div>
        <div className={`${sidebarOpen?'flex items-center justify-between mb-6': 'flex flex-col items-center mb-6 space-y-4'}`}>
          <motion.button  whileHover={{rotate:90}} whileTap={{scale:0.95}} onClick={()=>setSidebarOpen(!sidebarOpen)} className="text-xl text-gray-700 dark:text-gray-200 font-bold hover:text-blue-500 transition-color" title="Toggle Sidebar">
            {sidebarOpen?'✕':'☰'}
          </motion.button>
          {sidebarOpen && (
             <Button onClick={() => setDarkMode(!darkMode)} size="small" className="text-sm" whileHover={{scale:1.05}}  whileTap={{scale:0.95}}>
              {darkMode ? '☀️Light' : '🌙Dark'}
            </Button>
          )}
        </div>
          <div className="space-y-2 font-semibold px-2 py-4 rounded-xl bg-white dark:bg-gray-800 shadow-md transition-all duration-300">
            {tabs.map((tab) => (
              <div key={tab.name} className="relative" onMouseEnter={()=>setHoveredTab(tab.name)} onMouseLeave={()=>setHoveredTab(null)}>
                  <motion.div whileHover={{scale: 1.03}} whileTap={{scale: 0.97}} >
              <SidebarButton
                key={tab.name}
                label={sidebarOpen?tab.name:tab.icon}
                isActive={activeTab === tab.name}
                onClick={() => setActiveTab(tab.name)}
                isCollapsed={!sidebarOpen}
              />
              </motion.div>
              <AnimatePresence>
                {!sidebarOpen &&hoveredTab===tab.name && (
                  <motion.div initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-10}}  className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-30" style={{pointerEvents:'none'}}>{tab.name}
                  <div className="absolute right-full top-1/2 w-2 h-2 bg-gray-900 tranform-translate-y-1/2 rotate-45"></div>
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
            ))}

          </div>
        </div>
        <div >
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={()=>{
            localStorage.removeItem('isLoggedIn');
            window.location.href='/login';
          }} className={`w-full flex items-center justify-center px-4 py-2 mt-6 text-sm font-semibold bg-red-500 text-white rounded-lg hover:bg-red-300  transition-all duration-200`}>
            {sidebarOpen ? 'Logout' : (
              <div className="relative">
                <span>⏻</span>
                <AnimatePresence>
                  {hoveredTab==='logOut' && (
                    <motion.div initial={{opacity:0,x:-10}} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg" style={{pointerEvents:'none', whiteSpace:'nowrap'}}>
                      LogOut
                      <div className="absolute right-full top-1/2 w-2 h-2 bg-gray-900 transform-translate-y-1/2 rotate-45"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.button>
        </div>
      </div>
  );
};

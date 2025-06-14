import { useState } from 'react';
import {SidebarButton} from './SidebarButton';
import {Button} from './Button';
import {motion,AnimatePresence} from 'framer-motion'

export const Sidebar = ({tabs,activeTab,setActiveTab,darkMode,setDarkMode,sidebarOpen,setSidebarOpen }) => {
  const [hoveredTab, setHoveredTab] = useState(null);
  const [showLogoutConfirm,setShowLogoutConfirm]=useState(null);
  const [hoveredLogout,setHoveredLogout]=useState(false);
  const handleLogout=()=>{
    localStorage.removeItem('isLoggedIn');
    window.location.href='/login'
  }
  return (
    <>
    <AnimatePresence>
      {showLogoutConfirm &&(
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={()=>setShowLogoutConfirm(false)}>
        <motion.div initial={{scale:0.9,y:100}} animate={{scale:1,y:0}} exit={{scale:0.9 ,opacity:0}} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-sm w-full" onClick={(e)=>e.stopPropagation()}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Confirm Log-Out
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Are you Sure You want to Log-Out?
          </p>
          <div className="flex justify-end space-x-3">
            <Button onClick={()=>setShowLogoutConfirm(false)} className="bg-blue-100 hover:bg-blue-200  dark:bg-gray-700 dark:hover:bg-gray-600">
              Cancel
            </Button>
            <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white">
              Log Out
            </Button>
          </div>
        </motion.div>
      </motion.div>)}
    </AnimatePresence>
    <div  className={` h-screen flex flex-col justify-between transition-all duration-300 bg-gray-100 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 ${sidebarOpen ? 'w-64 p-4' : 'w-16 p-2 '} fixed md:static z-20`}>
      <div>
        <div className={`${sidebarOpen?'flex items-center justify-between mb-6': 'flex flex-col items-center mb-6 space-y-4'}`}>
          <motion.button  whileHover={{rotate:90,backgroundColor:darkMode?'rgba(255,255,255,0.1)':'rgba(0,0,0,0.05)'}} whileTap={{scale:0.95}} onClick={()=>setSidebarOpen(!sidebarOpen)} className="text-xl text-gray-700 dark:text-gray-200 font-bold hover:text-blue-500 transition-all" title="Toggle Sidebar">
            {sidebarOpen?(<span classNme="text-xl">✕</span>):(<span classNme="text-xl">☰</span>)}
          </motion.button>
          {sidebarOpen && (
             <Button onClick={() => setDarkMode(!darkMode)} size="small" className="text-sm py-2 px-3 rounded-lg shadow-sm hover:shadow transition-all" whileHover={{scale:1.05}}  whileTap={{scale:0.95}}>
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </Button>
          )}
        </div>
          <div className="space-y-1 font-medium px-1 py-3 rounded-xl bg-white dark:bg-gray-800 shadow-md transition-all duration-300">
            {tabs.map((tab) => (
              <div key={tab.name} className="relative" onMouseEnter={()=>setHoveredTab(tab.name)} onMouseLeave={()=>setHoveredTab(null)}>
                  <motion.div whileHover={{scale: 1.03}} whileTap={{scale: 0.97}} className={`${activeTab===tab.name?'bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500':'hover:bg-gray-100 dark:hover:bg-gray-700/50'} rounded-lg transition-all`}>
              <SidebarButton
                key={tab.name}
                label={sidebarOpen?
                  <div className="flex items-center space-x-3">
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.name}</span>
                  </div>
                  :(tab.icon)}
                isActive={activeTab === tab.name}
                onClick={() => setActiveTab(tab.name)}
                isCollapsed={!sidebarOpen}
              />
              </motion.div>
              <AnimatePresence>
                {!sidebarOpen &&hoveredTab===tab.name && (
                  <motion.div initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-10}}  className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-30 dark:bg-white dark:text-gray-900" style={{pointerEvents:'none'}}>{tab.name}
                  <div className="absolute right-full top-1/2 w-2 h-2 bg-gray-900 tranform-translate-y-1/2 rotate-45 dark:bg-white dark:text-gray-900"></div>
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
            ))}

          </div>
        </div>
        <div >
          <motion.button whileHover={{ scale: 1.05 }} onMouseEnter={()=>setHoveredLogout(true)} onMouseLeave={()=>setHoveredLogout(false)}  whileTap={{ scale: 0.95 }} onClick={()=>{
           setShowLogoutConfirm(true);
          }} className={`w-full flex items-center justify-center px-4 py-3 mt-6 text-sm font-medium rounded-lg transition-all ${sidebarOpen?'bg-gray-100 shadow-lg dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-red-500 hover:text-white':'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'}`}>
            {sidebarOpen ? (
              <div className="flex items-center space-x-2">
                <span className="text-lg">⏻</span>
                <span>Logout</span>
              </div>
            ) : (
              <div className="relative">
                <span>⏻</span>
                <AnimatePresence>
                  {hoveredLogout && (
                    <motion.div initial={{opacity:0,x:-10}} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg dark:bg-white dark:text-gray-800" style={{pointerEvents:'none', whiteSpace:'nowrap'}}>
                      LogOut
                      <div className="absolute right-full top-1/2 w-2 h-2 bg-gray-900 transform -translate-y-1/2 rotate-45 dark:bg-white"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.button>
        </div>
      </div>
      </>
  );
};

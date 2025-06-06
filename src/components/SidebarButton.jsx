export const SidebarButton = ({ label, isActive, onClick,isCollapsed=false}) => {
  return (
    <button
      onClick={onClick} 
       className={`w-full ${isCollapsed?'flex items-center justify-center':'text-left'} px-4 py-2 rounded transition-colors ${isActive?'bg-blue-600 text-white':'text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700'}`}
       title={isCollapsed?label:'undefined'}>
        {isCollapsed?<span className="text-xl">{label}</span>:(label)}
    </button>
  );
};
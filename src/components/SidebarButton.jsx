export const SidebarButton = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick} 
       className={`w-full text-left px-4 py-2 rounded transition-colors ${isActive?'bg-blue-600 text-white':'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
      {label}
    </button>
  );
};
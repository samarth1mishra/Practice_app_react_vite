import React, { useState, useEffect } from 'react';

const Button = ({onClick,children}) => {
  return (
    <button onClick={onClick} className="  px-6 py-6 bg-blue-500 text-lg rounded">
      {children}
    </button>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
   if(darkMode){
    document.documentElement.classList.add('dark');
   }else{
    document.documentElement.classList.remove('dark');
   }
  }, [darkMode]);

  return (
    <div class="min-h-screen bg-white dark:bg-gray-900  text-black dark:text-white">
      <div className="flex flex-row items-center px-2 py-5">
        <h1 className="text-3xl font-bold mx-auto">
          Dark Mode Enable Using Tailwind CSS
        </h1>
      </div>

      <div className="flex flex-col justify-center items-center ">
        <Button onClick={()=>setDarkMode(!darkMode)} className="">{darkMode?'Disable Dark Mode':'Enable Dark Mode'}</Button>

        <div>
          <p className="text-yellow-400 dark:text-amber-300">{darkMode?'I am amber':'Now I am yellow'}</p>
        </div>

        <div>
          <p className="text-gray-900 dark:text-white">{darkMode?'I am white':' Now I am gray'}</p>
        </div>
      </div>
    </div>
  );
};

export default App;

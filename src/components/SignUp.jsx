import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { FiMail,FiLock,FiEye,FiEyeOff } from 'react-icons/fi';
import {easeIn, motion } from 'framer-motion'
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const SignUp=()=>{
    const navigate=useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [showPassword,setShowPassword]=useState(false);
    const [loading, setLoading]=useState(false);
    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true);
        setTimeout(()=>{
        localStorage.setItem('user',JSON.stringify({email,password}));
        setLoading(false);
        toast.success('SignUp Successful',{
            position:'top-right',
            autoClose:1500,
            hideProgressBar:false,
            pauseOnHover:true,
            draggable:true,
            theme:'colored',
        })
        setTimeout(()=>{
        navigate('/login');
        },1600)
        },1000);
        
     }
     return (
         <>
    <ToastContainer position="top-center" autoClose={1500} pauseOnHover draggable theme="colored" />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 to-pink-200 dark:from-indigo-900 dark:to-purple-900 p-6 sm:p-8 lg:p-10">
      <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="w-full max-w-md bg-white/70 dark:bg-gray-900/80 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl space-y-6 sm:space-y-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 dark:text-white">Create Your Account</h2>
        <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl px-4 py-3 sm:py-4 text-gray-900 dark:text-white">
          <FiMail className="mr-3 text-gray-500 dark:text-gray-400" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 min-w-0 bg-transparent text-sm sm:text-base placeholder-gray-400 dark:placeholder-gray-500 outline-none" />
        </div>
        <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl px-4 py-3 sm:py-4 text-gray-900 dark:text-white">
          <FiLock className="mr-3 text-gray-500 dark:text-gray-400" />
          <input type={showPassword ? 'text' : 'password'} placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="flex-1 min-w-0 bg-transparent text-sm sm:text-base placeholder-gray-400 dark:placeholder-gray-500 outline-none" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-3 text-gray-500 dark:text-gray-400">{showPassword ? <FiEyeOff /> : <FiEye />}</button>
        </div>
        <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-pink-700 dark:to-purple-700 text-white font-semibold text-sm sm:text-base rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition">{loading ? 'Signing up...' : 'Sign Up'}</motion.button>
        <div className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Already have an account? <button type="button" onClick={() => navigate('/login')} className="text-purple-600 hover:underline dark:text-purple-400 font-medium">Log In</button>
        </div>
      </motion.form>
    </div>
  </>
     )
}
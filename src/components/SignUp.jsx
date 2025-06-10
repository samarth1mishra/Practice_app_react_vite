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
        <ToastContainer/>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-[#a6c0fe] to-[#f68084] dark:from-gray-900 dark:to-gray-800 p-6 ">
            <motion.form onSubmit={handleSubmit} initial={{opacity:0,scale:0.3}} animate={{opacity:1,scale:1}} transition={{duration:0.5,ease:'easeOut'}} className="bg-gradient-to-t from-[#fdcbf1] to-[#e6dee9] dark:bg-gray-900 w-full max-w-lg p-10 rounded-3xl shadow-2xl  space-y-8">
                <h2 className="text-5xl font-extrabold text-center text-gray-900 dark:text-gray-100">Create Your Account</h2>
                <div className="flex flex-row items-center jutsify-center bg-white border border-gray-300 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white">
                    <FiMail className="ml-4 text-gray-400 dark:text-gray-500 "/>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="flex-1 w-full pl-2 pr-2 py-4  bg-transparent outline-none "/>
                </div>
                 <div className="flex flex-row items-center justify-between bg-white border border-gray-300 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white">
                <FiLock className="ml-4 text-gray-400 dark:text-gray-500 " />
                <input type={showPassword?'text':'password'} placeholder="Password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="flex-1 w-full pl-2 pr-2 py-4  bg-transparent outline-none "/>
                <button type="button" onClick={()=>setShowPassword(!showPassword)} className="mr-4 text-gray-600">{showPassword?<FiEyeOff/>:<FiEye/>}</button>
                </div>
                <motion.button type="submit" disabled={loading} whileHover={{scale:1.02}} whileTap={{scale:0.98}} className="w-full py-3 sm:py-4 bg-purple-600 text-white font-semibold text-sm sm:text-base rounded -xl sm:rounded-2xl shadow-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition">{loading?'Signing up...':'Sign Up'}</motion.button>
                <p className="text-center text-sm dark:text-white sm:text-base text-gray-600 dark:text-gray-400">
                    Already have an Account?{' '}<button type="button" onClick={()=>navigate('/login')} className="text-purple-600 hover:underline dark:text-purple-400 font-medium">Log In</button>
                </p>
            </motion.form>
        </div>
        </>
     )
}
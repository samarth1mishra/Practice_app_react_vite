import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiMail,FiLock,FiEye,FiEyeOff,FiCheck,FiLoader,FiGithub,FiAlertCircle} from 'react-icons/fi';

export const Login=({setIsAdminLoggedIn,setIsUserLoggedIn})=>{
    const navigate=useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [showPwd,setShowPwd]=useState(false);
    const [remember,setRemember]=useState(false);
    const [loading,setLoading]=useState(false);
    const handleLogin=async(e)=>{
        e.preventDefault();
        if(!email || !password){
            toast.error('Please fill in all Details');
            return;
        }
        setLoading(true);
        await new Promise((r)=>setTimeout(r,1000));
        const user=JSON.parse(localStorage.getItem('user'));
        const isAdmin = email === 'admin@enrope.solutions.com' && password === '12345';
        if (user && user.email === email && user.password === password) {
        if (isAdmin) {
          localStorage.setItem('isAdminLoggedIn', 'true');
          setIsAdminLoggedIn(true);
        } else {
          localStorage.setItem('isUserLoggedIn', 'true');
          setIsUserLoggedIn(true);
        }
          if (remember) localStorage.setItem('remember Email', email);
          toast.success('Login Successful!');
          setTimeout(() => navigate('/'), 500);
        }else{
           toast.error('Invalid credentials',{icon:<FiAlertCircle/>});
        }
        setLoading(false);
    }
    return (
        <div className="relative h-screen bg-gradient-to-br from-[#191654] via-[#6e44ff] to-[#3b1c73] overflow-hidden">
             <motion.div className="absolute -inset-[50%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-300 via-pink-400 to-indigo-500 opacity-30 blur-3xl animate-pulse" animate={{rotate:360}} transition={{repeat:Infinity,duration:30,ease:'linear'}}/>
             <div className="relative flex items-center  justify-center min-h-screen px-4 py-12">
            <motion.form onSubmit={handleLogin} initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{duration:0.6,ease:'easeOut'}} className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2cl space-y-6 border-white/20">
           {/* <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-80 space-y-4"> */}
                <h2  className="text-center text-3xl font-bold text-white drop-shadow-cl">Login</h2>
                <div className="flex items-center bg-white/20 rounded-xl px-4 py-2 focus-within:ring-2 ring-white/40 transition"><FiMail className="text-white/80 mr-3"/>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="flex-1 bg-transparent outline-none text-white placeholder-white/70"/>
                </div>
                <div className="flex items-center bg-white/20 rounded-xl px-4 py-2 focus-within:ring-2 ring-white/40 transition">
                {showPwd ?(
                    <FiEyeOff className="text-white/80 mr-3 cursor-pointer" onClick={()=>setShowPwd(false)}/>
                ):(<FiEye className="text-white/80 mr-3 cursor pointer" onClick={()=>setShowPwd(true)}/>)}
                <input type={showPwd?"text":"password"} placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="flex-1 bg-transparent outline-none text-white placeholder-white/70"/>
                </div>  
                <label className="flex items-center text-white/80 text-sm space-x-2">
                <input type="checkbox" checked={remember} onChange={(e)=>setRemember(e.target.checked)} className="form-checkbox h-4 w-4 accent-pink-500"/>
                <span>Remember me</span>
                </label> 
                <div className="flex items-center text-white/60 text-sm">
                <span className="flex-grow h-px bg-white/40"></span>
                <span className="px-3">OR</span>
                <span className="flex-grow h-px bg-white/40"></span>
                </div>
                <div className="flex gap-4">
                    <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/30 text-white rounded-lg hover:bg-white/40 transition">
                    <FiGithub/> Github
                    </button>
                    <button type="button"  className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                    <FiAlertCircle/> Google
                    </button>
                </div>
                <button type="Submit" disabled={loading}  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-lg hover:scale-[1.02] hover:shadow-lg transition disabled:opacity-70">{loading?<FiLoader className="animate-spin"/>:<FiCheck/>}{loading?'Logging in...':'Login'}</button>
                <p className="text-center text-sm text-white/80">
                    Don't have an account?{' '}<a href="/signup" className="underline text-pink-300 hover:text-pink-400 transition"> Sign Up</a>
                </p> 
            <ToastContainer className="mt-4" position="bottom-center" autoClose={3000} hideProgressBar/>
            </motion.form>
        </div>
       
        </div>
    )

}
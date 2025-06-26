import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FiMail,FiLock,FiEye,FiEyeOff,FiCheck,FiLoader,FiGithub} from 'react-icons/fi';

export const Login = ({ setIsAdminLoggedIn, setIsUserLoggedIn,activeTab}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 400) setScreenSize('mobile');
      else if (width < 768) setScreenSize('tablet');
      else setScreenSize('desktop');
    };
    
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all details');
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = email === 'admin@enrope.solutions.com' && password === '12345';
    if (activeTab === "Admin Panel" && !isAdmin) {
      toast.error('🔒 You are not an admin. Please log in as an employee in the Employee/Intern Panel.');
      setLoading(false);
      return;
    } 
    if (activeTab === "Employee/Intern Panel" && isAdmin) {
      toast.error('👔 Admins should log in using the Admin Panel');
      setLoading(false);
      return;
    }
    console.log(user);
     if (activeTab === "Employee/Intern Panel" && user.email!==email) {
      console.log('why');
      toast.error(
        <div>
          You're not signed up yet! 
          <br />
          <a 
            href="/signUp" 
            className="underline text-blue-300 hover:text-blue-200 font-bold"
          >
            Create an account now
          </a>
        </div>,
        { autoClose: 5000 }
      );
      setLoading(false);
      return;
    }
    if (user && user.email === email && user.password === password) {
      localStorage.setItem('currentUserEmail', email);

      if (isAdmin) {
        localStorage.setItem('isAdminLoggedIn', 'true');
        setIsAdminLoggedIn(true);
      } else {
        localStorage.setItem('isUserLoggedIn', 'true');
        setIsUserLoggedIn(true);
      }

      if (remember) {
        localStorage.setItem('remember Email', email);
      }

      toast.success('🎉 Login successful!');
      setTimeout(() => navigate('/'), 800);
    } else {
      toast.error('❌ Invalid credentials');
    }

    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: 0.2, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#24243e] to-[#302b63] p-3 sm:p-4">
       <ToastContainer 
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName={`
          !bg-gradient-to-r !from-white/20 !to-white/10 
          !backdrop-blur-xl !border !border-white/30 
          !text-white !rounded-2xl !shadow-2xl 
          !text-sm !min-h-[50px] !p-3 !pr-10
          ${screenSize === 'mobile' ? '!w-[280px]' : '!w-[320px]'}
          !font-medium !leading-relaxed !relative
        `}
        progressClassName="!bg-gradient-to-r !from-pink-400 !via-purple-500 !to-indigo-500 !h-1"
        closeButton={({ closeToast }) => (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              closeToast();
            }}
            className="text-white/80 hover:text-white transition-all duration-200 absolute top-2 right-2 p-1.5 rounded-full hover:bg-white/20 z-50"
            type="button"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        style={{
          top: screenSize === 'mobile' ? '12px' : '16px',
          left: screenSize === 'mobile' ? '50%' : '60%',
          transform: screenSize === 'mobile' ? 'translateX(-50%)' : 'translateX(-50%)',
          zIndex: 9999
        }}
      />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl flex flex-col lg:flex-row bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
      >
        <div className="hidden lg:flex flex-1 items-center justify-center p-12 bg-gradient-to-br from-purple-600/20 to-pink-600/20">
          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-20 h-20 mx-auto bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-3xl"
            >
              👋
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-4xl font-bold text-white"
            >
              Welcome Back
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-white/80 text-lg"
            >
              Sign in to continue your journey
            </motion.p>
          </div>
        </div>

        <motion.div 
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 xl:p-12"
        >
          <div className="lg:hidden text-center mb-6">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-2xl mb-4">
              👋
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          </div>

          <div className="hidden lg:block mb-8">
            <h2 className="text-3xl font-bold text-white text-center">Login</h2>
          </div>

          <form className="space-y-4 sm:space-y-5" onSubmit={handleLogin}>
            <motion.div 
              whileFocus={{ scale: 1.02 }}
              className="relative group"
            >
              <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 group-focus-within:text-pink-400 transition-colors z-10" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full pl-12 pr-4 py-3.5 sm:py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300 backdrop-blur-sm"
              />
            </motion.div>

            <motion.div 
              whileFocus={{ scale: 1.02 }}
              className="relative group"
            >
              <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 group-focus-within:text-pink-400 transition-colors z-10" />
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-12 pr-12 py-3.5 sm:py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300 backdrop-blur-sm"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                onClick={() => setShowPwd(!showPwd)}
              >
                {showPwd ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </motion.div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-white/90">
              <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-white/30 bg-white/10 text-pink-500 focus:ring-pink-500/50 focus:ring-2"
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-pink-400 hover:text-pink-300 transition-colors font-medium">
                Forgot Password?
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-semibold flex justify-center items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin" size={18} />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <FiCheck size={18} />
                  <span>Sign In</span>
                </>
              )}
            </motion.button>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <span className="text-white/70 text-sm font-medium">OR</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="py-3 px-4 rounded-xl bg-gray-800/50 border border-white/20 text-white flex items-center justify-center gap-2 hover:bg-gray-700/50 transition-all duration-300 backdrop-blur-sm"
              >
                <FiGithub size={18} />
                <span className="font-medium">GitHub</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="py-3 px-4 rounded-xl bg-red-600/80 border border-red-500/30 text-white flex items-center justify-center gap-2 hover:bg-red-600 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="font-medium">Google</span>
              </motion.button>
            </div>

            <p className="text-center text-white/80 text-sm mt-6">
              Don't have an account?{' '}
              <a href="/signUp" className="text-pink-400 hover:text-pink-300 transition-colors font-medium">
                Create Account
              </a>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};
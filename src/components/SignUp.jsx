import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
export const SignUp=()=>{
    const navigate=useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const handleSubmit=(e)=>{
        e.preventDefault();
        localStorage.setItem('user',JSON.stringify({email,password}));
        alert('SignUp Successful.Please Login');
        navigate('/login');
     }
     return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-80 space-y-4">
                <h2 className="text-xl font-bold text-center dark:text-white">Sign Up</h2>
                <input type="email" placeholder="Email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-3 py-2 border rounded"/>
                <input type="password" placeholder="Password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full px-3 py-2 border rounded"/>
                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Sign Up</button>
                <p className="text-center text-sm dark:text-white">
                    Already have an Account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
                </p>
            </form>
        </div>
     )
}
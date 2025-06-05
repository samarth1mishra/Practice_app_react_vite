import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export const Login=()=>{
    const navigate=useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const handleLogin=(e)=>{
        e.preventDefault();
        const user=JSON.parse(localStorage.getItem('user'));
        if(user && user.email===email && user.password===password){
            localStorage.setItem('isLoggedIn',true);
            navigate('/');
        }else{
            alert('Invalid Email or PassWord. Please Try again')
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-80 space-y-4">
                <h2  className="text-xl font-bold text-center dark:text-white">Login</h2>
                <input type="email" placeholder="Email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-3 py-2 border rounded"/>
                <input type="password" placeholder="Password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full px-3 py-2 border rounded"/>
                <button type="Submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
                <p className="text-center text-sm dark:text-white">
                    Don't have an account? <a href="/signup" className="text-blue-500 hover:underline"> Sign Up</a>
                </p>
            </form>
        </div>
    )

}
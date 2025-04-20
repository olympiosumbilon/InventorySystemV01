import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth";
import Input from "../../components/Input";

const Login = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        if(!email|| !password){
            setError('Please fill in both email and password');
            setLoading(false);
            return;
        }

        const {error} = await loginUser(
            email,
            password,
        )

        if(error){
            setError(error.message)
        }else{
            navigate('/dashboard')
        }
        setLoading(false)
    }

    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-100">  

            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded-md shadow-md w-full max-w-sm"
            >
                       <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

            <Input label="Email" type="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <Input label="Password" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition disabled:opacity-50"
                >
                    {loading ? 'Logging in..': 'Login'}
                    
                </button>
            </form>
        </div>
    )
}

export default Login
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import Input from "../../components/Input";

const Login = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const {error} = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if(error){
            setError(error.message)
        }else{
            alert('Logged in successfully')
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

            <Input label="Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <Input label="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>

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
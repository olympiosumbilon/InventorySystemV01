import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { signUpUser, saveUserProfile } from "../../services/auth";

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [role, setRole] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()

    const handleSignUp = async (e:React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const {data: signUpData, error: signUpError } = await signUpUser(
            email,
            password,
        )

        if(signUpError){
            setError(signUpError.message)
            setLoading(false)
            return 
        }

        const user = signUpData.user
        if(user){
            const {error: profileError} = await saveUserProfile(user.id,
                {
                    tfusername: username,
                    tfphone:phone,
                    tfrole:role,
                    tffull_name: fullName,
                    tfbusiness_name : businessName,
                }
            )

            if(profileError){
                console.error(profileError);
                setError('User created, but failed to save profile info.')
                setLoading(false)
                return
            }
        }
        setSuccess(true)
        setLoading(false)
        setTimeout(()=> navigate('/login'),2000)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <form
            onSubmit={handleSignUp}
            className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
          >
            <h2 className="text-2xl font-bold text-center">Create an Account</h2>
    
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full border p-2 rounded"
            />
    
            <input
              type="text"
              placeholder="Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
              className="w-full border p-2 rounded"
            />
    
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border p-2 rounded"
            />
    
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-2 rounded"
            />
    
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="owner">Owner</option>
              <option value="staff">Staff</option>
            </select>
    
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border p-2 rounded"
            />
    
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border p-2 rounded"
            />
    
            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">Registered! Redirecting...</p>}
    
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
        </div>
      )
}

export default SignUp
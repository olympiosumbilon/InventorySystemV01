import { useState } from "react";
import { useRouter } from "next/router";
//import { signUpUser, saveUserProfile } from "../services/auth";
import Input from "../src/components/Input";

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
    const router = useRouter()

    const handleSignUp = async (e: React.FormEvent) => {
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
                    tfphone: phone,
                    tfrole: role,
                    tffull_name: fullName,
                    tfbusiness_name: businessName,
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
        setTimeout(() => router.push('/login'), 2000)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-green-600 rounded-full flex items-center justify-center">
                        <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Join us and start managing your inventory
                    </p>
                </div>

                <form
                    onSubmit={handleSignUp}
                    className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg"
                >
                    <div className="space-y-4">
                        <Input 
                            label="Full Name" 
                            type="text" 
                            value={fullName} 
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <Input 
                            label="Business Name" 
                            type="text" 
                            value={businessName} 
                            onChange={(e) => setBusinessName(e.target.value)}
                        />
                        <Input 
                            label="Username" 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input 
                            label="Phone Number" 
                            type="tel" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Role</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                                <option value="">Select a role</option>
                                <option value="owner">Owner</option>
                                <option value="staff">Staff</option>
                            </select>
                        </div>
                        <Input 
                            label="Email" 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input 
                            label="Password" 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-red-800">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {success && (
                        <div className="rounded-md bg-green-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-green-800">Account created successfully! Redirecting to login...</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5 text-green-500 group-hover:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </span>
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp 
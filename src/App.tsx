import './App.css'
import { useEffect } from 'react'
import {supabase} from './supabaseClient'

function App() {
  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error('❌ Supabase Error:', error.message)
      } else {
        console.log('✅ Supabase connected! Session data:', data)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Login Page</h1>
    </div>
  )
}

export default App

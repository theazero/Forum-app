import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function SignInPage() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    
    const success = await login(userName, password)
    if (success) {
      navigate('/')
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <section className="space-y-6 max-w-md">
      <h1 className="h-title">Sign In</h1>
      <form onSubmit={submit} className="bg-white border border-line rounded-xl p-6 space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            className="w-full border border-line rounded-lg px-4 py-3 bg-white"
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-line rounded-lg px-4 py-3 bg-white"
            placeholder="Enter your password"
            required
          />
        </div>

        <button className="btn btn-primary w-full" type="submit">
          Sign In
        </button>
      </form>
      
      <div className="text-center">
        <p className="text-sm text-muted">
          Don't have an account?{' '}
          <a href="/register" className="text-indigo-600 hover:underline">
            Register here
          </a>
        </p>
        <p className="text-sm text-muted mt-2">
          Demo: Try username "guest" with password "password"
        </p>
      </div>
    </section>
  )
}
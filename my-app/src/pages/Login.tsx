import React, { useState } from 'react'
import { useAuth } from '../controller/AuthContext'
import { useNavigate } from 'react-router-dom'
import { RouteEnum } from '../enum/RouteEnum'
import { UserIcon, KeyIcon, LogInIcon } from 'lucide-react'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login(username, password)
    if (success) {
      navigate(RouteEnum.AllCountrys)
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="flex w-full min-h-screen bg-gray-100 justify-center items-center p-4">
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-center mb-8">
          <div className="bg-gray-700 p-3 rounded-full">
            <LogInIcon className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Welcome Back
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="Enter username"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="Enter password"
                required
              />
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/30 py-2 rounded-lg">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-gray-700 hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Sign in
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{' '}
          <a href="#" className="text-gray-700 dark:text-white font-medium underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login

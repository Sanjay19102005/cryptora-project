import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CryptoraBackground from '../components/CryptoraBackground'
import FloatingParticles from '../components/FloatingParticles'
import CryptoraLogo from '../components/CryptoraLogo'
import { Lock, User, ArrowRight, X, Mail } from 'lucide-react'
import { api } from '../utils/api'

const Login = ({ onLogin }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showSignUp, setShowSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [signUpData, setSignUpData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [signUpError, setSignUpError] = useState('')
  const [signUpSuccess, setSignUpSuccess] = useState('')
  const [signUpLoading, setSignUpLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    
    if (!username || !password) {
      setError('Please enter both username and password')
      setLoading(false)
      return
    }

    try {
      const result = await api.login(username, password)
      
      if (result.success) {
        setSuccess('Login successful! Redirecting...')
        // Store user session
        localStorage.setItem('cryptora_current_user', JSON.stringify(result.user))
        localStorage.setItem('tor-unveil-auth', 'true')
        onLogin()
        setTimeout(() => {
          navigate('/dashboard')
        }, 1000)
      } else {
        setError(result.message || 'Login failed')
        if (result.needsVerification) {
          setTimeout(() => {
            navigate(`/verification?email=${encodeURIComponent(result.email)}`)
          }, 2000)
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setSignUpError('')
    setSignUpSuccess('')
    setSignUpLoading(true)
    
    if (signUpData.password !== signUpData.confirmPassword) {
      setSignUpError('Passwords do not match')
      setSignUpLoading(false)
      return
    }

    if (signUpData.password.length < 6) {
      setSignUpError('Password must be at least 6 characters')
      setSignUpLoading(false)
      return
    }

    try {
      const result = await api.signup(signUpData.username, signUpData.email, signUpData.password)
      
      if (result.success) {
        setSignUpSuccess(result.message || 'Account created. Please check your email for OTP.')
        setTimeout(() => {
          setShowSignUp(false)
          navigate(`/verification?email=${encodeURIComponent(signUpData.email)}`)
        }, 2000)
      } else {
        setSignUpError(result.message || 'Sign up failed. Please try again.')
      }
    } catch (err) {
      setSignUpError('An error occurred. Please try again.')
    } finally {
      setSignUpLoading(false)
    }
  }

  const handleSignUpChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CryptoraBackground />
      <FloatingParticles count={30} />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div style={{ opacity: 1, filter: 'none' }}>
              <CryptoraLogo size="medium" />
            </div>
            <p className="text-cryptora-neon/80 text-sm mt-4 font-futura">
              Cyber Forensics Platform
            </p>
          </div>

          {/* Login Form */}
          <div className="glassmorphism rounded-lg p-8 cryptora-glow">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg font-futura">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg font-futura">
                  {success}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-futura">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cryptora-neon/50 z-10" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/90 border border-cryptora-neon/30 rounded-lg text-black placeholder-gray-600 focus:outline-none focus:border-cryptora-neon focus:ring-2 focus:ring-cryptora-neon/50 transition-all font-futura"
                    placeholder="Enter username"
                    autoComplete="username"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-futura">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cryptora-neon animate-neon-pulse z-10" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/90 border border-cryptora-neon/30 rounded-lg text-black placeholder-gray-600 focus:outline-none focus:border-cryptora-neon focus:ring-2 focus:ring-cryptora-neon/50 transition-all font-futura"
                    placeholder="Enter password"
                    autoComplete="current-password"
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full neon-button py-3 rounded-lg font-futura font-bold text-lg flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? 'Logging in...' : 'Access System'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm font-futura mb-2">
                Don't have an account?{' '}
                <button
                  onClick={() => setShowSignUp(true)}
                  className="text-cryptora-neon hover:text-cryptora-neon/80 font-bold transition-colors"
                >
                  Create a new account?
                </button>
              </p>
              <p className="text-xs text-gray-500 font-futura">
                Authorized Personnel Only
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-gray-500 text-sm font-futura">
            <p>© 2024 CRYPTORA | Confidential</p>
          </div>
        </div>
      </div>

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glassmorphism rounded-lg p-8 cryptora-glow w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white font-futura">Create Account</h2>
              <button
                onClick={() => {
                  setShowSignUp(false)
                  setSignUpError('')
                  setSignUpSuccess('')
                  setSignUpData({ username: '', email: '', password: '', confirmPassword: '' })
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSignUp} className="space-y-6">
              {signUpError && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg font-futura">
                  {signUpError}
                </div>
              )}
              {signUpSuccess && (
                <div className="bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg font-futura">
                  {signUpSuccess}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-futura">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cryptora-neon/50 z-10" />
                  <input
                    type="text"
                    name="username"
                    value={signUpData.username}
                    onChange={handleSignUpChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/90 border border-cryptora-neon/30 rounded-lg text-black placeholder-gray-600 focus:outline-none focus:border-cryptora-neon focus:ring-2 focus:ring-cryptora-neon/50 transition-all font-futura"
                    placeholder="Enter username"
                    required
                    disabled={signUpLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-futura">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cryptora-neon/50 z-10" />
                  <input
                    type="email"
                    name="email"
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/90 border border-cryptora-neon/30 rounded-lg text-black placeholder-gray-600 focus:outline-none focus:border-cryptora-neon focus:ring-2 focus:ring-cryptora-neon/50 transition-all font-futura"
                    placeholder="Enter email"
                    required
                    disabled={signUpLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-futura">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cryptora-neon animate-neon-pulse z-10" />
                  <input
                    type="password"
                    name="password"
                    value={signUpData.password}
                    onChange={handleSignUpChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/90 border border-cryptora-neon/30 rounded-lg text-black placeholder-gray-600 focus:outline-none focus:border-cryptora-neon focus:ring-2 focus:ring-cryptora-neon/50 transition-all font-futura"
                    placeholder="Enter password"
                    required
                    disabled={signUpLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-futura">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cryptora-neon/50 z-10" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={signUpData.confirmPassword}
                    onChange={handleSignUpChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/90 border border-cryptora-neon/30 rounded-lg text-black placeholder-gray-600 focus:outline-none focus:border-cryptora-neon focus:ring-2 focus:ring-cryptora-neon/50 transition-all font-futura"
                    placeholder="Confirm password"
                    required
                    disabled={signUpLoading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={signUpLoading}
                className="w-full neon-button py-3 rounded-lg font-futura font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {signUpLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login

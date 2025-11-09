import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CryptoraBackground from '../components/CryptoraBackground'
import FloatingParticles from '../components/FloatingParticles'
import CryptoraLogo from '../components/CryptoraLogo'
import { Lock, User, Mail, ArrowLeft } from 'lucide-react'
import { api } from '../utils/api'

const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      const result = await api.signup(formData.username, formData.email, formData.password)
      
      if (result.success) {
        // Show OTP if provided (development mode or email failed)
        if (result.otp) {
          setSuccess(`Account created! OTP: ${result.otp}${result.development ? ' (Development Mode)' : result.emailSent ? '' : ' (Check email or console)'}`)
          console.log('📧 OTP:', result.otp)
        } else {
          setSuccess(result.message || 'Account created. Please check your email for OTP.')
        }
        setTimeout(() => {
          navigate(`/verification?email=${encodeURIComponent(formData.email)}`)
        }, 2000)
      } else {
        setError(result.message || 'Sign up failed. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CryptoraBackground />
      <FloatingParticles count={30} />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="mb-6 flex items-center space-x-2 text-cryptora-neon hover:text-cryptora-neon/80 transition-colors font-futura"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>

          {/* Logo */}
          <div className="text-center mb-8">
            <div style={{ opacity: 1, filter: 'none' }}>
              <CryptoraLogo size="medium" />
            </div>
            <p className="text-cryptora-neon/80 text-sm mt-2 font-futura">
              Create Your Account
            </p>
          </div>

          {/* Sign Up Form */}
          <div className="glassmorphism rounded-lg p-8 cryptora-glow">
            <form onSubmit={handleSubmit} className="space-y-6">
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

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-futura">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cryptora-neon/50 z-10" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/90 border border-cryptora-neon/30 rounded-lg text-black placeholder-gray-600 focus:outline-none focus:border-cryptora-neon focus:ring-2 focus:ring-cryptora-neon/50 transition-all font-futura"
                    placeholder="Enter username"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-futura">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cryptora-neon/50 z-10" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/90 border border-cryptora-neon/30 rounded-lg text-black placeholder-gray-600 focus:outline-none focus:border-cryptora-neon focus:ring-2 focus:ring-cryptora-neon/50 transition-all font-futura"
                    placeholder="Enter email"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-futura">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cryptora-neon animate-neon-pulse z-10" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/90 border border-cryptora-neon/30 rounded-lg text-black placeholder-gray-600 focus:outline-none focus:border-cryptora-neon focus:ring-2 focus:ring-cryptora-neon/50 transition-all font-futura"
                    placeholder="Enter password"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-futura">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cryptora-neon/50 z-10" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/90 border border-cryptora-neon/30 rounded-lg text-black placeholder-gray-600 focus:outline-none focus:border-cryptora-neon focus:ring-2 focus:ring-cryptora-neon/50 transition-all font-futura"
                    placeholder="Confirm password"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full neon-button py-3 rounded-lg font-futura font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm font-futura">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-cryptora-neon hover:text-cryptora-neon/80 font-bold transition-colors"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp

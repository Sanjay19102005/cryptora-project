import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CryptoraBackground from '../components/CryptoraBackground'
import FloatingParticles from '../components/FloatingParticles'
import CryptoraLogo from '../components/CryptoraLogo'
import { CheckCircle, Mail, RefreshCw } from 'lucide-react'
import { api } from '../utils/api'

const Verification = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
    }
  }, [searchParams])

  const handleVerify = async (e) => {
    e.preventDefault()
    setStatus('')
    setMessage('')
    setLoading(true)
    
    if (!email || !otp) {
      setStatus('error')
      setMessage('Please enter both email and OTP')
      setLoading(false)
      return
    }

    try {
      const result = await api.verifyOTP(email, otp)
      setStatus(result.success ? 'success' : 'error')
      setMessage(result.message)
      
      if (result.success) {
        setIsVerified(true)
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      }
    } catch (err) {
      setStatus('error')
      setMessage('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    if (!email) {
      setStatus('error')
      setMessage('Email is required')
      return
    }

    setResendLoading(true)
    setStatus('')
    setMessage('')

    try {
      const result = await api.resendOTP(email)
      setStatus(result.success ? 'success' : 'error')
      setMessage(result.message || (result.success ? 'OTP resent. Please check your email.' : 'Failed to resend OTP.'))
    } catch (err) {
      setStatus('error')
      setMessage('Failed to resend OTP. Please try again.')
    } finally {
      setResendLoading(false)
    }
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
              Email Verification
            </p>
          </div>

          {/* Verification Form */}
          {!isVerified ? (
            <div className="glassmorphism rounded-lg p-8 cryptora-glow">
              <form onSubmit={handleVerify} className="space-y-6">
                {message && (
                  <div className={`px-4 py-3 rounded-lg font-futura ${
                    status === 'success' 
                      ? 'bg-green-500/20 border border-green-500/50 text-green-400' 
                      : 'bg-red-500/20 border border-red-500/50 text-red-400'
                  }`}>
                    {message}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 font-futura">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cryptora-neon/50 z-10" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/90 border border-cryptora-neon/30 rounded-lg text-black placeholder-gray-600 focus:outline-none focus:border-cryptora-neon focus:ring-2 focus:ring-cryptora-neon/50 transition-all font-futura"
                      placeholder="Enter your email"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 font-futura">
                    OTP (One-Time Password)
                  </label>
                  <div className="relative">
                    <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cryptora-neon/50 z-10" />
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="w-full pl-10 pr-4 py-3 bg-white/90 border border-cryptora-neon/30 rounded-lg text-black placeholder-gray-600 focus:outline-none focus:border-cryptora-neon focus:ring-2 focus:ring-cryptora-neon/50 transition-all font-futura font-mono text-2xl text-center tracking-widest"
                      placeholder="000000"
                      maxLength="6"
                      required
                      disabled={loading}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2 font-futura">
                    Check your email for the 6-digit OTP code
                  </p>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={resendLoading || !email}
                    className="mt-2 text-sm text-cryptora-neon hover:text-cryptora-neon/80 font-bold transition-colors font-futura flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RefreshCw className={`w-4 h-4 ${resendLoading ? 'animate-spin' : ''}`} />
                    <span>{resendLoading ? 'Sending...' : 'Resend OTP'}</span>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full neon-button py-3 rounded-lg font-futura font-bold text-lg flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>{loading ? 'Verifying...' : 'Verify Account'}</span>
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate('/login')}
                  className="text-cryptora-neon hover:text-cryptora-neon/80 font-bold transition-colors font-futura text-sm"
                >
                  Back to Login
                </button>
              </div>
            </div>
          ) : (
            <div className="glassmorphism rounded-lg p-8 cryptora-glow text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2 font-futura">Account Verified!</h2>
              <p className="text-gray-400 font-futura">Redirecting to login...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Verification

import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { MapPin, Shield, CheckCircle, Download, AlertTriangle } from 'lucide-react'
import { generateOriginIP } from '../utils/mockData'

const ProbableOriginIP = ({ onLogout }) => {
  const [originIP, setOriginIP] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    // Generate initial origin IP on component mount
    analyzeOrigin()
  }, [])

  const analyzeOrigin = () => {
    setIsAnalyzing(true)
    // Simulate analysis
    setTimeout(() => {
      const ip = generateOriginIP()
      setOriginIP(ip)
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="flex min-h-screen bg-cryptora-navy">
      <Sidebar onLogout={onLogout} />
      
      <div className="flex-1 ml-0 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center space-x-3 font-futura text-neon-glow-sm">
            <MapPin className="w-8 h-8 text-cryptora-neon" />
            <span>Probable Origin IP</span>
          </h1>
          <p className="text-gray-400 font-futura">Identify the most probable origin IP address from TOR network analysis</p>
        </div>

        {/* Analysis Control */}
        <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white mb-2 font-futura">Origin IP Analysis</h2>
              <p className="text-gray-400 text-sm font-futura">Click the button to run a new analysis</p>
            </div>
            <button
              onClick={analyzeOrigin}
              disabled={isAnalyzing}
              className="px-6 py-3 neon-button rounded-lg font-futura font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
            </button>
          </div>
        </div>

        {isAnalyzing && (
          <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cryptora-neon mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg font-futura">Analyzing network patterns...</p>
          </div>
        )}

        {originIP && !isAnalyzing && (
          <div className="space-y-6">
            {/* Main IP Card */}
            <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-6 cryptora-glow">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-cryptora-neon/20 rounded-lg">
                    <Shield className="w-8 h-8 text-cryptora-neon" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white font-mono font-futura">{originIP.ip}</h2>
                    <p className="text-gray-400 font-futura">{originIP.country}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-cryptora-neon mb-1 font-futura">
                    {originIP.confidence}%
                  </div>
                  <p className="text-gray-400 text-sm font-futura">Confidence Score</p>
                </div>
              </div>

              {/* Confidence Meter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2 font-futura">
                  <span className="text-gray-400">Confidence Level</span>
                  <span className="text-white font-bold">{originIP.confidence}%</span>
                </div>
                <div className="w-full bg-cryptora-navy/50 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all duration-1000 ${
                      originIP.confidence >= 90 ? 'bg-cryptora-neon' :
                      originIP.confidence >= 75 ? 'bg-cryptora-neon' : 'bg-yellow-400'
                    }`}
                    style={{ width: `${originIP.confidence}%` }}
                  />
                </div>
              </div>

              {/* IP Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-futura">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Country</p>
                  <p className="text-white font-semibold">{originIP.country}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">ASN</p>
                  <p className="text-white font-semibold">{originIP.asn}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">ISP</p>
                  <p className="text-white font-semibold">{originIP.isp}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Country Code</p>
                  <p className="text-white font-semibold">{originIP.countryCode}</p>
                </div>
              </div>
            </div>

            {/* Map Visualization */}
            <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2 font-futura">
                <MapPin className="w-5 h-5 text-cryptora-neon" />
                <span>Geographic Location</span>
              </h3>
              <div className="relative h-96 bg-cryptora-navy/50 rounded-lg overflow-hidden border border-cryptora-neon/20">
                <svg width="100%" height="100%" className="absolute inset-0">
                  {/* Simple world map representation */}
                  <defs>
                  <radialGradient id="locationGradient">
                    <stop offset="0%" stopColor="#00C3FF" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#00C3FF" stopOpacity="0" />
                  </radialGradient>
                  </defs>
                    <circle
                    cx={`${((originIP.lon + 180) / 360) * 100}%`}
                    cy={`${((90 - originIP.lat) / 180) * 100}%`}
                    r="8"
                    fill="#00C3FF"
                    className="animate-pulse"
                  />
                  <circle
                    cx={`${((originIP.lon + 180) / 360) * 100}%`}
                    cy={`${((90 - originIP.lat) / 180) * 100}%`}
                    r="20"
                    fill="url(#locationGradient)"
                    className="animate-pulse"
                  />
                </svg>
                <div className="absolute bottom-4 left-4 glassmorphism border border-cryptora-neon/50 rounded-lg p-4">
                  <p className="text-cryptora-neon font-bold font-futura">{originIP.country}</p>
                  <p className="text-gray-300 text-sm font-futura">Lat: {originIP.lat.toFixed(2)}, Lon: {originIP.lon.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Matched Patterns */}
            <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2 font-futura">
                <CheckCircle className="w-5 h-5 text-cryptora-neon" />
                <span>Matched Patterns</span>
              </h3>
              <div className="space-y-4">
                {originIP.patterns.map((pattern, index) => (
                  <div
                    key={index}
                    className="glassmorphism border border-cryptora-neon/30 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2 font-futura">
                      <span className="text-white font-medium">{pattern.type}</span>
                      <span className="text-cryptora-neon font-bold">
                        {(pattern.match * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-cryptora-navy/50 rounded-full h-2">
                      <div
                        className="bg-cryptora-neon h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${pattern.match * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generate Report Button */}
            <div className="flex justify-center">
              <a
                href="/report"
                className="flex items-center space-x-2 px-8 py-4 neon-button rounded-lg font-futura font-bold"
              >
                <Download className="w-5 h-5" />
                <span>Generate Forensic Summary Report</span>
              </a>
            </div>
          </div>
        )}

        {!originIP && !isAnalyzing && (
          <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-12 text-center">
            <AlertTriangle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg font-futura">Click "Run Analysis" to identify probable origin IP</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProbableOriginIP


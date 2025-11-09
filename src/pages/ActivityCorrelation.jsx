import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Upload, FileText, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'
import { generateCorrelationResults } from '../utils/mockData'

const ActivityCorrelation = ({ onLogout }) => {
  const [fileUploaded, setFileUploaded] = useState(false)
  const [correlationResults, setCorrelationResults] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setFileUploaded(false)
      setCorrelationResults(null)
    }
  }

  const handleFileUpload = (e) => {
    e.preventDefault()
    if (!selectedFile) {
      alert('Please select a file first')
      return
    }
    
    setIsProcessing(true)
    
    // Simulate file processing
    setTimeout(() => {
      const results = generateCorrelationResults()
      setCorrelationResults(results)
      setFileUploaded(true)
      setIsProcessing(false)
    }, 2000)
  }

  const ConfidenceGauge = ({ value, label }) => {
    const circumference = 2 * Math.PI * 45
    const offset = circumference - (value / 100) * circumference

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="#0B1C2C"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke={value >= 80 ? '#00C3FF' : value >= 60 ? '#FFAA00' : '#FF6B6B'}
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{value}%</span>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-400 font-futura">{label}</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-cryptora-navy">
      <Sidebar onLogout={onLogout} />
      
      <div className="flex-1 ml-0 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 font-futura text-neon-glow-sm">Activity Correlation</h1>
          <p className="text-gray-400 font-futura">Upload PCAP/Log files to correlate TOR network activity</p>
        </div>

        {/* File Upload Section */}
        <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2 font-futura">
            <Upload className="w-5 h-5 text-cryptora-neon" />
            <span>Upload Network Capture</span>
          </h2>
          <form onSubmit={handleFileUpload} className="space-y-4">
            <div className="border-2 border-dashed border-cryptora-neon/30 rounded-lg p-8 text-center hover:border-cryptora-neon/50 transition-all duration-200">
              <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <input
                type="file"
                accept=".pcap,.cap,.log,.txt"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer inline-block px-6 py-3 neon-button rounded-lg font-futura font-bold"
              >
                Select PCAP/Log File
              </label>
              <p className="text-gray-400 text-sm mt-4 font-futura">Supported formats: .pcap, .cap, .log, .txt</p>
              {selectedFile && (
                <p className="text-cryptora-neon text-sm mt-2 font-futura">Selected: {selectedFile.name}</p>
              )}
            </div>
            {fileUploaded && (
              <div className="flex items-center space-x-2 text-cryptora-neon">
                <CheckCircle className="w-5 h-5" />
                <span className="font-futura">File uploaded successfully</span>
              </div>
            )}
            <button
              type="submit"
              disabled={isProcessing || !selectedFile}
              className="w-full px-6 py-3 neon-button rounded-lg font-futura font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : 'Analyze Correlation'}
            </button>
          </form>
        </div>

        {/* Correlation Results */}
        {correlationResults && (
          <div className="space-y-6">
            {/* Confidence Scores */}
            <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-6 font-futura">Correlation Confidence Scores</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <ConfidenceGauge 
                  value={Math.round(correlationResults.overallConfidence)} 
                  label="Overall Confidence"
                />
                <ConfidenceGauge 
                  value={Math.round(correlationResults.timestampMatch * 100)} 
                  label="Timestamp Match"
                />
                <ConfidenceGauge 
                  value={Math.round(correlationResults.packetSizeSimilarity * 100)} 
                  label="Packet Similarity"
                />
                <ConfidenceGauge 
                  value={Math.round(correlationResults.flowProbability * 100)} 
                  label="Flow Probability"
                />
              </div>
            </div>

            {/* Correlation Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 font-futura">Timestamp Matching</span>
                  <TrendingUp className="w-5 h-5 text-cryptora-neon" />
                </div>
                <div className="text-3xl font-bold text-white mb-2 font-futura">
                  {(correlationResults.timestampMatch * 100).toFixed(1)}%
                </div>
                <div className="w-full bg-cryptora-navy/50 rounded-full h-2">
                  <div
                    className="bg-cryptora-neon h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${correlationResults.timestampMatch * 100}%` }}
                  />
                </div>
              </div>

              <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 font-futura">Packet Size Similarity</span>
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2 font-futura">
                  {(correlationResults.packetSizeSimilarity * 100).toFixed(1)}%
                </div>
                <div className="w-full bg-cryptora-navy/50 rounded-full h-2">
                  <div
                    className="bg-cyan-400 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${correlationResults.packetSizeSimilarity * 100}%` }}
                  />
                </div>
              </div>

              <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 font-futura">Flow Probability</span>
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2 font-futura">
                  {(correlationResults.flowProbability * 100).toFixed(1)}%
                </div>
                <div className="w-full bg-cryptora-navy/50 rounded-full h-2">
                  <div
                    className="bg-purple-400 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${correlationResults.flowProbability * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Possible Entry Nodes */}
            <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4 font-futura">Possible Entry Nodes</h2>
              <div className="space-y-4">
                {correlationResults.entryNodes.map((node, index) => (
                  <div
                    key={index}
                    className="glassmorphism border border-cryptora-neon/30 rounded-lg p-4 hover:border-cryptora-neon/50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          node.confidence >= 80 ? 'bg-cryptora-neon' :
                          node.confidence >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                        }`} />
                        <span className="text-white font-mono font-bold">{node.ip}</span>
                        <span className="text-gray-400">({node.country})</span>
                      </div>
                      <span className="text-cryptora-neon font-bold font-futura">{node.confidence}%</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm mt-3 font-futura">
                      <div>
                        <span className="text-gray-400">Confidence: </span>
                        <span className="text-white">{node.confidence}%</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Packet Size: </span>
                        <span className="text-white">{node.packetSize} bytes</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Flow Probability: </span>
                        <span className="text-white">{(node.flowProbability * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-cryptora-navy/50 rounded-full h-2">
                        <div
                          className="bg-cryptora-neon h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${node.confidence}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!correlationResults && !isProcessing && (
          <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg font-futura">Upload a file and click "Analyze Correlation" to see results</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ActivityCorrelation


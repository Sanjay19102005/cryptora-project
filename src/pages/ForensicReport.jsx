import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { FileText, Download, Calendar, MapPin, Network, Activity, Shield } from 'lucide-react'
import { generateForensicReport, generateTORCircuit, generateOriginIP, generateCorrelationResults } from '../utils/mockData'

const ForensicReport = ({ onLogout }) => {
  const [report, setReport] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    generateReport()
  }, [])

  const generateReport = () => {
    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      const circuit = generateTORCircuit()
      const originIP = generateOriginIP()
      const correlation = generateCorrelationResults()
      const newReport = generateForensicReport(circuit, originIP, correlation)
      setReport(newReport)
      setIsGenerating(false)
    }, 1500)
  }

  const handleDownloadPDF = () => {
    alert('PDF download functionality - This would generate and download a PDF report in a real application.')
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isGenerating) {
    return (
      <div className="flex min-h-screen bg-cryptora-navy">
        <Sidebar onLogout={onLogout} />
        <div className="flex-1 ml-64 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cryptora-neon mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg font-futura">Generating forensic report...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-cryptora-navy">
      <Sidebar onLogout={onLogout} />
      
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center space-x-3 font-futura text-neon-glow-sm">
              <FileText className="w-8 h-8 text-cryptora-neon" />
              <span>Forensic Report</span>
            </h1>
            <p className="text-gray-400 font-futura">Comprehensive TOR network forensic analysis report</p>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center space-x-2 px-6 py-3 neon-button rounded-lg font-futura font-bold"
          >
            <Download className="w-5 h-5" />
            <span>Download PDF</span>
          </button>
        </div>

        {report && (
          <div className="space-y-6">
            {/* Report Header */}
            <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-8 cryptora-glow">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-cryptora-neon mb-2 font-futura">CRYPTORA</h2>
                  <p className="text-gray-400 font-futura">Cyber Forensics Report</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm font-futura">Report ID</p>
                  <p className="text-white font-mono font-bold font-futura">{report.reportId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 font-futura">
                <Calendar className="w-5 h-5" />
                <span>Generated: {formatDate(report.generatedAt)}</span>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2 font-futura">
                <Shield className="w-6 h-6 text-cryptora-neon" />
                <span>Executive Summary</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1 font-futura">Total Sessions</p>
                  <p className="text-2xl font-bold text-white font-futura">{report.summary.totalSessions}</p>
                </div>
                <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1 font-futura">Data Transferred</p>
                  <p className="text-2xl font-bold text-white font-futura">
                    {(report.summary.totalDataTransferred / 1000000).toFixed(2)} MB
                  </p>
                </div>
                <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1 font-futura">Avg. Session Duration</p>
                  <p className="text-2xl font-bold text-white font-futura">
                    {Math.floor(report.summary.averageSessionDuration / 60)} min
                  </p>
                </div>
                <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1 font-futura">Suspected Activities</p>
                  <p className="text-2xl font-bold text-white font-futura">{report.summary.suspectedActivities.length}</p>
                </div>
              </div>
            </div>

            {/* TOR Path Visualization */}
            <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2 font-futura">
                <Network className="w-6 h-6 text-cryptora-neon" />
                <span>TOR Path Visualization</span>
              </h3>
              <div className="bg-cryptora-navy/50 rounded-lg p-6 border border-cryptora-neon/20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-cryptora-neon rounded-full flex items-center justify-center mb-2">
                        <span className="text-white font-bold font-futura">E</span>
                      </div>
                      <p className="text-xs text-gray-400 font-futura">Entry</p>
                      <p className="text-xs text-white font-mono font-futura">{report.circuit.entry.ip}</p>
                    </div>
                    <div className="flex-1 h-1 bg-cryptora-neon mx-4"></div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center mb-2">
                        <span className="text-white font-bold font-futura">M</span>
                      </div>
                      <p className="text-xs text-gray-400 font-futura">Middle</p>
                      <p className="text-xs text-white font-mono font-futura">{report.circuit.middle.ip}</p>
                    </div>
                    <div className="flex-1 h-1 bg-cryptora-neon mx-4"></div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mb-2">
                        <span className="text-white font-bold font-futura">X</span>
                      </div>
                      <p className="text-xs text-gray-400 font-futura">Exit</p>
                      <p className="text-xs text-white font-mono font-futura">{report.circuit.exit.ip}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm font-futura">
                  <div>
                    <p className="text-gray-400">Country</p>
                    <p className="text-white">{report.circuit.entry.country}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Country</p>
                    <p className="text-white">{report.circuit.middle.country}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Country</p>
                    <p className="text-white">{report.circuit.exit.country}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Session Timeline */}
            <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                <Activity className="w-6 h-6 text-cryptora-neon" />
                <span>Session Timeline</span>
              </h3>
              <div className="space-y-4">
                {report.timeline.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-cryptora-neon rounded-full"></div>
                      {index < report.timeline.length - 1 && (
                        <div className="w-0.5 h-16 bg-cryptora-neon/30"></div>
                      )}
                    </div>
                    <div className="flex-1 glassmorphism border border-cryptora-neon/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2 font-futura">
                        <span className="text-white font-semibold">{event.event}</span>
                        <span className="text-gray-400 text-sm">{formatDate(event.timestamp)}</span>
                      </div>
                      <p className="text-gray-400 text-sm font-futura">{event.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Correlation Score */}
            <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4 font-futura">Correlation Score</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-4 text-center">
                  <p className="text-gray-400 text-sm mb-2 font-futura">Overall Confidence</p>
                  <p className="text-3xl font-bold text-cryptora-neon font-futura">
                    {report.correlation.overallConfidence}%
                  </p>
                </div>
                <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-4 text-center">
                  <p className="text-gray-400 text-sm mb-2 font-futura">Timestamp Match</p>
                  <p className="text-3xl font-bold text-cyan-400 font-futura">
                    {(report.correlation.timestampMatch * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-4 text-center">
                  <p className="text-gray-400 text-sm mb-2 font-futura">Packet Similarity</p>
                  <p className="text-3xl font-bold text-purple-400 font-futura">
                    {(report.correlation.packetSizeSimilarity * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-4 text-center">
                  <p className="text-gray-400 text-sm mb-2 font-futura">Flow Probability</p>
                  <p className="text-3xl font-bold text-cryptora-neon font-futura">
                    {(report.correlation.flowProbability * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Possible Origin IP */}
            <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2 font-futura">
                <MapPin className="w-6 h-6 text-cryptora-neon" />
                <span>Possible Origin IP</span>
              </h3>
              <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold text-white font-mono font-futura">{report.originIP.ip}</p>
                    <p className="text-gray-400 font-futura">{report.originIP.country}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-cryptora-neon font-futura">{report.originIP.confidence}%</p>
                    <p className="text-gray-400 text-sm font-futura">Confidence</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-futura">
                  <div>
                    <p className="text-gray-400">ASN</p>
                    <p className="text-white font-semibold">{report.originIP.asn}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">ISP</p>
                    <p className="text-white font-semibold">{report.originIP.isp}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Country Code</p>
                    <p className="text-white font-semibold">{report.originIP.countryCode}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Location</p>
                    <p className="text-white font-semibold">
                      {report.originIP.lat.toFixed(2)}, {report.originIP.lon.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-6 text-center">
              <p className="text-gray-400 text-sm font-futura">
                © 2024 CRYPTORA | Confidential Forensic Report
              </p>
              <p className="text-gray-500 text-xs mt-2 font-futura">
                This report is generated by CRYPTORA Cyber Forensics Platform
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ForensicReport


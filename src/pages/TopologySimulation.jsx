import { useState, useEffect, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import { Network, Play, RotateCcw, Clock, ScrollText } from 'lucide-react'
import { generateTORCircuit } from '../utils/mockData'

const TopologySimulation = ({ onLogout }) => {
  const [circuit, setCircuit] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)
  const [hoveredNode, setHoveredNode] = useState(null)
  const [timelineLogs, setTimelineLogs] = useState([])
  const timelineEndRef = useRef(null)

  // Dynamic color palette from CSS variables (logo/theme)
  const [palette, setPalette] = useState({
    neon: '#00C3FF',
    accent2: '#22D3EE',
    accent3: '#EC4899',
    text: '#E5E7EB'
  })

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement)
    setPalette({
      neon: styles.getPropertyValue('--cryptora-neon').trim() || '#00C3FF',
      accent2: styles.getPropertyValue('--cryptora-accent-2').trim() || '#22D3EE',
      accent3: styles.getPropertyValue('--cryptora-accent-3').trim() || '#EC4899',
      text: styles.getPropertyValue('--cryptora-text').trim() || '#E5E7EB'
    })
  }, [])

  // Auto-scroll to bottom when new logs are added
  useEffect(() => {
    timelineEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [timelineLogs])

  const addLog = (message, type = 'info') => {
    const log = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    }
    setTimelineLogs(prev => [...prev, log])
  }

  const simulatePath = () => {
    const newCircuit = generateTORCircuit()
    setCircuit(newCircuit)
    setIsAnimating(true)
    setAnimationStep(0)

    // Add initial log
    addLog(`Circuit ${newCircuit.id} initialized`, 'success')
    addLog(`Entry node: ${newCircuit.entry.ip} (${newCircuit.entry.country})`, 'info')

    // Simulate animation progression with logs
    const steps = ['entry', 'middle', 'exit']
    let currentStep = 0

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setAnimationStep(currentStep + 1)
        
        if (currentStep === 0) {
          addLog(`Connection established to entry node`, 'success')
          addLog(`Bandwidth: ${newCircuit.entry.bandwidth} KB/s`, 'info')
        } else if (currentStep === 1) {
          addLog(`Middle node: ${newCircuit.middle.ip} (${newCircuit.middle.country})`, 'info')
          addLog(`Routing through middle node`, 'success')
        } else if (currentStep === 2) {
          addLog(`Exit node: ${newCircuit.exit.ip} (${newCircuit.exit.country})`, 'info')
          addLog(`Circuit established successfully`, 'success')
          addLog(`Total duration: ${newCircuit.duration}s`, 'info')
        }
        
        currentStep++
      } else {
        setIsAnimating(false)
        clearInterval(interval)
        addLog(`Circuit ${newCircuit.id} completed`, 'success')
      }
    }, 1000)
  }

  const resetSimulation = () => {
    setCircuit(null)
    setIsAnimating(false)
    setAnimationStep(0)
    setHoveredNode(null)
    addLog('Simulation reset', 'warning')
  }

  const getNodeColor = (type) => {
    switch (type) {
      case 'entry':
        return palette.neon
      case 'middle':
        return palette.accent2
      case 'exit':
        return palette.accent3
      default:
        return '#64748B' // slate-500 fallback
    }
  }

  const getNodeGlow = (type, isActive) => {
    if (!isActive) return ''
    switch (type) {
      case 'entry':
        return 'shadow-[0_0_20px_rgba(0,195,255,0.8)]'
      case 'middle':
        return 'shadow-[0_0_20px_rgba(34,211,238,0.8)]'
      case 'exit':
        return 'shadow-[0_0_20px_rgba(236,72,153,0.8)]'
      default:
        return ''
    }
  }

  const getLogColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-400 border-green-400/30'
      case 'warning':
        return 'text-yellow-400 border-yellow-400/30'
      case 'error':
        return 'text-red-400 border-red-400/30'
      default:
        return 'text-cryptora-neon border-cryptora-neon/30'
    }
  }

  return (
    <div className="flex min-h-screen bg-cryptora-navy">
      <Sidebar onLogout={onLogout} />
      
      <div className="flex-1 ml-0 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center space-x-3 font-futura text-neon-glow-sm">
            <Network className="w-7 h-7 sm:w-8 sm:h-8 text-cryptora-neon" />
            <span>TOR Topology Simulation</span>
          </h1>
          <p className="text-gray-400 font-futura">Visualize TOR circuit paths and node connections</p>
        </div>

        {/* Control Panel */}
        <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-4 sm:p-6 mb-6">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={simulatePath}
              disabled={isAnimating}
              className="flex items-center space-x-2 px-4 sm:px-6 py-3 neon-button rounded-lg font-futura font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-5 h-5" />
              <span>Simulate Path</span>
            </button>
            <button
              onClick={resetSimulation}
              className="flex items-center space-x-2 px-4 sm:px-6 py-3 glassmorphism border border-cryptora-neon/30 text-white font-medium rounded-lg hover:border-cryptora-neon/50 transition-all duration-200 font-futura"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </button>
            {circuit && (
              <div className="flex items-center space-x-2 text-gray-400 sm:ml-auto font-futura">
                <Clock className="w-5 h-5" />
                <span className="truncate">Circuit ID: {circuit.id}</span>
              </div>
            )}
          </div>
        </div>

        {/* Topology Visualization (always at top) */}
        <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-3 sm:p-6 mb-6 relative overflow-visible mx-auto max-w-screen-xl">
          {circuit ? (
            <div className="relative w-full aspect-16-9 min-h-[260px]">
              <svg viewBox="0 0 820 400" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 w-full h-full">
                {/* Connection Lines with Glow */}
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--cryptora-neon)" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="var(--cryptora-neon)" stopOpacity="1" />
                    <stop offset="100%" stopColor="var(--cryptora-neon)" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                
                <line
                  x1={circuit.entry.position.x}
                  y1={circuit.entry.position.y}
                  x2={circuit.middle.position.x}
                  y2={circuit.middle.position.y}
                  stroke={animationStep >= 1 ? 'url(#lineGradient)' : '#334155'}
                  strokeWidth="3"
                  className={animationStep >= 1 ? 'data-flow' : ''}
                  opacity={animationStep >= 1 ? 1 : 0.4}
                  style={{ filter: animationStep >= 1 ? 'drop-shadow(0 0 8px rgba(0, 195, 255, 0.8))' : 'none' }}
                />
                <line
                  x1={circuit.middle.position.x}
                  y1={circuit.middle.position.y}
                  x2={circuit.exit.position.x}
                  y2={circuit.exit.position.y}
                  stroke={animationStep >= 2 ? 'url(#lineGradient)' : '#334155'}
                  strokeWidth="3"
                  className={animationStep >= 2 ? 'data-flow' : ''}
                  opacity={animationStep >= 2 ? 1 : 0.4}
                  style={{ filter: animationStep >= 2 ? 'drop-shadow(0 0 8px rgba(0, 195, 255, 0.8))' : 'none' }}
                />

                {/* Entry Node */}
                <g>
                  <circle
                    cx={circuit.entry.position.x}
                    cy={circuit.entry.position.y}
                    r="30"
                    fill={getNodeColor('entry')}
                    className={`transition-all duration-500 ${getNodeGlow('entry', animationStep >= 1)}`}
                    onMouseEnter={() => setHoveredNode(circuit.entry)}
                    onMouseLeave={() => setHoveredNode(null)}
                  />
                  <text
                    x={circuit.entry.position.x}
                    y={circuit.entry.position.y - 50}
                    textAnchor="middle"
                    fill={palette.neon}
                    fontSize="14"
                    fontWeight="bold"
                    fontFamily="Orbitron, sans-serif"
                  >
                    ENTRY
                  </text>
                </g>

                {/* Middle Node */}
                <g>
                  <circle
                    cx={circuit.middle.position.x}
                    cy={circuit.middle.position.y}
                    r="30"
                    fill={getNodeColor('middle')}
                    className={`transition-all duration-500 ${getNodeGlow('middle', animationStep >= 2)}`}
                    onMouseEnter={() => setHoveredNode(circuit.middle)}
                    onMouseLeave={() => setHoveredNode(null)}
                  />
                  <text
                    x={circuit.middle.position.x}
                    y={circuit.middle.position.y - 50}
                    textAnchor="middle"
                    fill={palette.accent2}
                    fontSize="14"
                    fontWeight="bold"
                    fontFamily="Orbitron, sans-serif"
                  >
                    MIDDLE
                  </text>
                </g>

                {/* Exit Node */}
                <g>
                  <circle
                    cx={circuit.exit.position.x}
                    cy={circuit.exit.position.y}
                    r="30"
                    fill={getNodeColor('exit')}
                    className={`transition-all duration-500 ${getNodeGlow('exit', animationStep >= 3)}`}
                    onMouseEnter={() => setHoveredNode(circuit.exit)}
                    onMouseLeave={() => setHoveredNode(null)}
                  />
                  <text
                    x={circuit.exit.position.x}
                    y={circuit.exit.position.y - 50}
                    textAnchor="middle"
                    fill={palette.accent3}
                    fontSize="14"
                    fontWeight="bold"
                    fontFamily="Orbitron, sans-serif"
                  >
                    EXIT
                  </text>
                </g>
              </svg>

              {/* Node Metadata Panel */}
              {hoveredNode && (
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 glassmorphism border border-cryptora-neon/50 rounded-lg p-3 sm:p-4 min-w-[240px] sm:min-w-[300px] cryptora-glow z-10">
                  <h4 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 font-futura">{hoveredNode.type.toUpperCase()} Node</h4>
                  <div className="space-y-2 text-xs sm:text-sm font-futura">
                    <div className="flex justify-between"><span className="text-gray-400">IP Address:</span><span className="text-white font-mono">{hoveredNode.ip}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Port:</span><span className="text-white">{hoveredNode.port}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Country:</span><span className="text-white">{hoveredNode.country}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Bandwidth:</span><span className="text-white">{hoveredNode.bandwidth} KB/s</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Uptime:</span><span className="text-white">{hoveredNode.uptime}%</span></div>
                    <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-cryptora-neon/30">
                      <span className="text-gray-400 text-[10px] sm:text-xs">Fingerprint:</span>
                      <p className="text-white text-[10px] sm:text-xs font-mono break-all mt-1">{hoveredNode.fingerprint}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Circuit Info */}
              <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 glassmorphism border border-cryptora-neon/50 rounded-lg p-3 sm:p-4 z-10">
                <h4 className="text-base sm:text-lg font-bold text-white mb-2 font-futura">Circuit Information</h4>
                <div className="space-y-1 text-xs sm:text-sm text-gray-300 font-futura">
                  <p>Entry: {circuit.entry.ip} ({circuit.entry.country})</p>
                  <p>Middle: {circuit.middle.ip} ({circuit.middle.country})</p>
                  <p>Exit: {circuit.exit.ip} ({circuit.exit.country})</p>
                  <p className="mt-2 text-cryptora-neon">Duration: {circuit.duration}s</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[260px]">
              <div className="text-center">
                <Network className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg font-futura">Click "Simulate Path" to generate a TOR circuit</p>
              </div>
            </div>
          )}
        </div>

        {/* Timeline Logs (moved below graph) */}
        <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-4 sm:p-6">
          <div className="flex items-center space-x-2 mb-3 sm:mb-4">
            <ScrollText className="w-5 h-5 text-cryptora-neon" />
            <h3 className="text-lg sm:text-xl font-bold text-white font-futura">Timeline Logs</h3>
          </div>
          <div className="max-h-[50vh] h-[360px] overflow-y-auto space-y-2 scrollbar-hide">
            {timelineLogs.length === 0 ? (
              <p className="text-gray-400 text-center py-8 font-futura">No logs yet. Click "Simulate Path" to start.</p>
            ) : (
              timelineLogs.map((log) => (
                <div
                  key={log.id}
                  className={`glassmorphism border ${getLogColor(log.type)} rounded-lg p-3 font-futura animate-fade-in`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-gray-400 mb-1">{log.timestamp}</p>
                      <p className="text-sm">{log.message}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={timelineEndRef} />
          </div>
        </div>

        {/* Reconstruct Timeline Button */}
        {circuit && !isAnimating && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => addLog('Timeline reconstruction initiated', 'info')}
              className="px-8 py-3 neon-button rounded-lg font-futura font-bold"
            >
              Reconstruct Timeline
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TopologySimulation

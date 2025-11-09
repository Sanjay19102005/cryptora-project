import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { 
  Server, 
  Network, 
  Activity, 
  AlertTriangle,
  TrendingUp,
  Globe
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { generateTrafficData, generateTORNodes, generateSessions } from '../utils/mockData'

const Dashboard = ({ onLogout }) => {
  const [trafficData, setTrafficData] = useState([])
  const [nodes, setNodes] = useState([])
  const [sessions, setSessions] = useState([])
  const [stats, setStats] = useState({
    totalRelays: 0,
    activeExitNodes: 0,
    detectedSessions: 0,
    suspectedOrigins: 0,
  })

  useEffect(() => {
    // Initialize data
    const initialNodes = generateTORNodes(100)
    const initialSessions = generateSessions(25)
    const initialTraffic = generateTrafficData(24)
    
    setNodes(initialNodes)
    setSessions(initialSessions)
    setTrafficData(initialTraffic)
    
    setStats({
      totalRelays: initialNodes.length,
      activeExitNodes: initialNodes.filter(n => n.type === 'exit').length,
      detectedSessions: initialSessions.length,
      suspectedOrigins: Math.floor(Math.random() * 10) + 5,
    })

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newTraffic = generateTrafficData(24)
      setTrafficData(newTraffic)
      setStats(prev => ({
        ...prev,
        detectedSessions: prev.detectedSessions + Math.floor(Math.random() * 3),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const StatCard = ({ icon: Icon, label, value, color = 'cryptora-neon', trend }) => (
    <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-6 cryptora-glow hover:border-cryptora-neon/50 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-cryptora-neon/20 rounded-lg">
          <Icon className="w-6 h-6 text-cryptora-neon" />
        </div>
        {trend && (
          <div className="flex items-center space-x-1 text-cryptora-neon">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium font-futura">{trend}%</span>
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-white mb-1 font-futura">{value.toLocaleString()}</h3>
      <p className="text-gray-400 text-sm font-futura">{label}</p>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-cryptora-navy">
      <Sidebar onLogout={onLogout} />
      
      <div className="flex-1 ml-0 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 font-futura text-neon-glow-sm">Dashboard</h1>
          <p className="text-gray-400 font-futura">Real-time TOR network monitoring and analysis</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={Server} 
            label="Total TOR Relays" 
            value={stats.totalRelays}
            trend="+2.3"
          />
          <StatCard 
            icon={Network} 
            label="Active Exit Nodes" 
            value={stats.activeExitNodes}
          />
          <StatCard 
            icon={Activity} 
            label="Detected Sessions" 
            value={stats.detectedSessions}
            trend="+5.1"
          />
          <StatCard 
            icon={AlertTriangle} 
            label="Suspected Origin IPs" 
            value={stats.suspectedOrigins}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Traffic Analysis Chart */}
          <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2 font-futura">
              <Activity className="w-5 h-5 text-cryptora-neon" />
              <span>Traffic Analysis</span>
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C3FF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00C3FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#0B1C2C" />
                <XAxis dataKey="time" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0B1C2C', 
                    border: '1px solid #00C3FF',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="traffic" 
                  stroke="#00C3FF" 
                  fillOpacity={1} 
                  fill="url(#colorTraffic)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Connections Chart */}
          <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2 font-futura">
              <Network className="w-5 h-5 text-cryptora-neon" />
              <span>Active Connections</span>
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0B1C2C" />
                <XAxis dataKey="time" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0B1C2C', 
                    border: '1px solid #00C3FF',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="connections" 
                  stroke="#00C3FF" 
                  strokeWidth={2}
                  dot={{ fill: '#00C3FF', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* World Map Visualization */}
        <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2 font-futura">
            <Globe className="w-5 h-5 text-cryptora-neon" />
            <span>TOR Node Distribution</span>
          </h3>
          <div className="relative h-96 bg-cryptora-navy/50 rounded-lg overflow-hidden border border-cryptora-neon/20">
            <svg width="100%" height="100%" className="absolute inset-0">
              {nodes.slice(0, 50).map((node, index) => {
                const x = ((node.lon + 180) / 360) * 100
                const y = ((node.lat + 90) / 180) * 100
                const color = node.type === 'entry' ? '#00C3FF' : 
                             node.type === 'exit' ? '#FF6B6B' : '#4ECDC4'
                
                return (
                  <g key={index}>
                    <circle
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="4"
                      fill={color}
                      className="node-pulse"
                      opacity="0.9"
                    >
                      <title>{`${node.ip} (${node.country}) - ${node.type}`}</title>
                    </circle>
                    {/* Glow effect */}
                    <circle
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="8"
                      fill="none"
                      stroke={color}
                      strokeWidth="1"
                      opacity="0.3"
                      className="animate-ping"
                    />
                  </g>
                )
              })}
            </svg>
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-futura">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cryptora-neon rounded-full animate-pulse"></div>
                <span className="text-gray-300">Entry Nodes</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Middle Nodes</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Exit Nodes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard


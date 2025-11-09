import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Network, 
  Activity, 
  MapPin, 
  FileText,
  LogOut,
  Shield
} from 'lucide-react'
import CryptoraLogo from './CryptoraLogo'

const Sidebar = ({ onLogout }) => {
  const location = useLocation()
  
  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/topology', icon: Network, label: 'TOR Topology' },
    { path: '/correlation', icon: Activity, label: 'Activity Correlation' },
    { path: '/origin-ip', icon: MapPin, label: 'Probable Origin IP' },
    { path: '/report', icon: FileText, label: 'Forensic Report' },
  ]

  return (
    <div className="w-64 bg-cryptora-navy/90 backdrop-blur-sm border-r border-cryptora-neon/20 h-screen fixed left-0 top-0 flex flex-col z-30">
      <div className="p-6 border-b border-cryptora-neon/20">
        <div className="flex flex-col items-center space-y-2">
          <CryptoraLogo size="small" />
          <p className="text-xs text-cryptora-neon/60 font-futura">Cyber Forensics</p>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 font-futura ${
                isActive
                  ? 'bg-cryptora-neon/20 text-cryptora-neon border border-cryptora-neon/50 cryptora-glow'
                  : 'text-gray-400 hover:bg-cryptora-neon/10 hover:text-cryptora-neon hover:border border-cryptora-neon/30'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
      
      <div className="p-4 border-t border-cryptora-neon/20">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-200 font-futura"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar


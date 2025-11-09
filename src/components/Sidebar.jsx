import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Network, 
  Activity, 
  MapPin, 
  FileText,
  LogOut,
  Shield,
  Menu,
  X
} from 'lucide-react'
import CryptoraLogo from './CryptoraLogo'

const Sidebar = ({ onLogout }) => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/topology', icon: Network, label: 'TOR Topology' },
    { path: '/correlation', icon: Activity, label: 'Activity Correlation' },
    { path: '/origin-ip', icon: MapPin, label: 'Probable Origin IP' },
    { path: '/report', icon: FileText, label: 'Forensic Report' },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-cryptora-navy/90 border border-cryptora-neon/30 rounded-lg text-cryptora-neon hover:bg-cryptora-neon/10 transition-all"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:flex w-64 bg-cryptora-navy/95 backdrop-blur-sm border-r border-cryptora-neon/20 h-screen left-0 top-0 flex-col z-40 transition-transform duration-300`}>
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
              onClick={() => setIsMobileMenuOpen(false)}
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
    </>
  )
}

export default Sidebar


import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CryptoraBackground from '../components/CryptoraBackground'
import FloatingParticles from '../components/FloatingParticles'
import NetworkGlobe from '../components/NetworkGlobe'
import CryptoraLogo from '../components/CryptoraLogo'
import { ArrowRight, Shield, Network, Activity } from 'lucide-react'

const Landing = () => {
  // Try to load logo image, fallback to text logo if not found
  const logoPaths = [
    '/logo.png',
    '/cryptora-logo.png',
    '/logo.svg',
    '/cryptora-logo.svg',
    '/logo.jpg',
    '/cryptora-logo.jpg'
  ];

  const [logoSrc, setLogoSrc] = useState(null);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    // Check if logo exists
    const checkLogo = () => {
      for (const path of logoPaths) {
        const img = new Image();
        img.onload = () => {
          setLogoSrc(path);
          setLogoError(false);
        };
        img.onerror = () => {
          if (path === logoPaths[logoPaths.length - 1] && !logoSrc) {
            setLogoError(true);
          }
        };
        img.src = path;
      }
    };
    checkLogo();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CryptoraBackground />
      <FloatingParticles count={40} />
      
      {/* Radial glow behind logo */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cryptora-neon/10 rounded-full blur-3xl -z-10"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Logo Section */}
        <div className="text-center mb-12 space-y-8">
          {/* Logo Display */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 rounded-full border-4 border-cryptora-neon/30 neon-ring"></div>
            </div>
            <div className="relative flex flex-col items-center" style={{ opacity: 1, filter: 'none' }}>
              {logoSrc && !logoError ? (
                <div className="mb-8" style={{ opacity: 1, filter: 'none', mixBlendMode: 'normal' }}>
                  <img
                    src={logoSrc}
                    alt="CRYPTORA Logo"
                    className="max-w-md w-full h-auto object-contain"
                    style={{
                      maxHeight: '400px',
                      width: 'auto',
                      height: 'auto',
                      filter: 'none !important',
                      opacity: '1 !important',
                      mixBlendMode: 'normal',
                      imageRendering: 'auto',
                      display: 'block'
                    }}
                  />
                </div>
              ) : (
                <div className="mb-8" style={{ opacity: 1, filter: 'none' }}>
                  <CryptoraLogo size="large" />
                </div>
              )}
              <div className="text-neon-glow-sm">
                <p className="text-cryptora-neon text-xl md:text-2xl font-futura font-bold tracking-widest">
                  MAPPING ANONYMOUS TOR PATHS
                </p>
              </div>
            </div>
          </div>

          {/* Central Network Globe */}
          <div className="flex justify-center my-12">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-cryptora-neon/5 blur-2xl"></div>
              </div>
              <NetworkGlobe size={250} />
            </div>
          </div>

          {/* Banner */}
          <div className="relative mt-12">
            <div className="absolute inset-0 bg-black/60 transform skew-x-12 -skew-y-1"></div>
            <div className="relative px-8 py-4">
              <p className="text-black font-futura font-bold text-lg md:text-xl tracking-wider">
                MAPPING ANONYMOUS TOR PATHS
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mt-12 z-20">
          <Link
            to="/login"
            className="neon-button px-8 py-4 rounded-lg text-lg font-futura font-bold flex items-center space-x-2 group"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/signup"
            className="px-8 py-4 rounded-lg text-lg font-futura font-bold border-2 border-cryptora-neon/50 text-cryptora-neon hover:bg-cryptora-neon/10 transition-all duration-300 flex items-center space-x-2"
          >
            <Shield className="w-5 h-5" />
            <span>Sign Up</span>
          </Link>
        </div>

        {/* Feature Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mb-16">
          <div className="glassmorphism rounded-lg p-6 text-center hover:border-cryptora-neon/50 transition-all duration-300">
            <Network className="w-12 h-12 text-cryptora-neon mx-auto mb-4" />
            <h3 className="text-white font-futura font-bold text-lg mb-2">TOR Network Analysis</h3>
            <p className="text-gray-400 text-sm">Trace anonymous TOR paths and identify network patterns</p>
          </div>
          <div className="glassmorphism rounded-lg p-6 text-center hover:border-cryptora-neon/50 transition-all duration-300">
            <Activity className="w-12 h-12 text-cryptora-neon mx-auto mb-4" />
            <h3 className="text-white font-futura font-bold text-lg mb-2">Real-time Monitoring</h3>
            <p className="text-gray-400 text-sm">Monitor TOR activity with live analytics and alerts</p>
          </div>
          <div className="glassmorphism rounded-lg p-6 text-center hover:border-cryptora-neon/50 transition-all duration-300">
            <Shield className="w-12 h-12 text-cryptora-neon mx-auto mb-4" />
            <h3 className="text-white font-futura font-bold text-lg mb-2">Forensic Reports</h3>
            <p className="text-gray-400 text-sm">Generate comprehensive forensic analysis reports</p>
          </div>
        </div>

        {/* Footer Description */}
        <footer className="mt-16 mb-8 max-w-4xl mx-auto">
          <div className="glassmorphism border border-cryptora-neon/30 rounded-lg p-6 text-center">
            <p className="text-cryptora-neon text-sm md:text-base font-futura leading-relaxed" style={{
              textShadow: '0 0 10px rgba(0, 195, 255, 0.5), 0 0 20px rgba(0, 195, 255, 0.3)'
            }}>
              Cryptora is an advanced cyber-forensics visualization platform designed to map and analyze anonymous TOR paths. It helps investigators correlate TOR nodes, simulate routes, visualize traffic flow, and identify potential origin patterns through advanced analytical modeling.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Landing

import { Lock } from 'lucide-react'

const CryptoraLogo = ({ size = 'large', className = '' }) => {
  const isLarge = size === 'large'
  const textSize = isLarge ? 'text-7xl md:text-8xl' : 'text-4xl md:text-5xl'
  const iconSize = isLarge ? 'w-16 h-16 md:w-20 md:h-20' : 'w-10 h-10'

  return (
    <div 
      className={`flex items-center justify-center ${className}`} 
      style={{ 
        opacity: 1, 
        filter: 'none',
        mixBlendMode: 'normal'
      }}
    >
      <h1 
        className={`font-futura font-black ${textSize} tracking-wider`} 
        style={{ opacity: 1 }}
      >
        <span 
          className="inline-block"
          style={{ 
            background: 'linear-gradient(to right, #ffffff, #00C3FF, #ffffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: 'none',
            filter: 'none',
            opacity: 1,
            mixBlendMode: 'normal'
          }}
        >
          CRYPT
        </span>
        <span 
          className="inline-flex items-center justify-center mx-2" 
          style={{ opacity: 1, filter: 'none' }}
        >
          <Lock 
            className={iconSize}
            style={{ 
              color: '#00C3FF',
              filter: 'none',
              opacity: 1,
              mixBlendMode: 'normal'
            }}
          />
        </span>
        <span 
          className="inline-block"
          style={{ 
            background: 'linear-gradient(to right, #ffffff, #00C3FF, #ffffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: 'none',
            filter: 'none',
            opacity: 1,
            mixBlendMode: 'normal'
          }}
        >
          RA
        </span>
      </h1>
    </div>
  )
}

export default CryptoraLogo

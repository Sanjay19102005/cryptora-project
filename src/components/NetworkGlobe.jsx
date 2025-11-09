import { useEffect, useRef } from 'react'

const NetworkGlobe = ({ size = 200 }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = size
    canvas.height = size

    const centerX = size / 2
    const centerY = size / 2
    const radius = size * 0.4

    // Create nodes
    const nodes = []
    const nodeCount = 12
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2
      nodes.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        angle: angle,
      })
    }

    let rotation = 0

    const animate = () => {
      ctx.clearRect(0, 0, size, size)

      // Draw outer ring
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius + 10, 0, Math.PI * 2)
      ctx.stroke()

      // Draw fingerprint pattern (simplified)
      ctx.strokeStyle = 'rgba(0, 195, 255, 0.3)'
      ctx.lineWidth = 1
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + rotation * 0.01
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius - 10 + i * 3, angle, angle + 0.5)
        ctx.stroke()
      }

      // Draw network lines
      ctx.strokeStyle = 'rgba(0, 195, 255, 0.4)'
      ctx.lineWidth = 1
      nodes.forEach((node, i) => {
        const nextNode = nodes[(i + 1) % nodes.length]
        ctx.beginPath()
        ctx.moveTo(node.x, node.y)
        ctx.lineTo(nextNode.x, nextNode.y)
        ctx.stroke()

        // Draw connections to center
        if (i % 3 === 0) {
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(centerX, centerY)
          ctx.stroke()
        }
      })

      // Draw nodes
      nodes.forEach((node) => {
        ctx.fillStyle = '#00C3FF'
        ctx.beginPath()
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2)
        ctx.fill()

        // Glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 8)
        gradient.addColorStop(0, 'rgba(0, 195, 255, 0.6)')
        gradient.addColorStop(1, 'rgba(0, 195, 255, 0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw curved arrow
      ctx.strokeStyle = '#00C3FF'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius + 5, rotation * 0.02, rotation * 0.02 + 1.5)
      ctx.stroke()

      // Arrowhead
      const arrowAngle = rotation * 0.02 + 1.5
      const arrowX = centerX + Math.cos(arrowAngle) * (radius + 5)
      const arrowY = centerY + Math.sin(arrowAngle) * (radius + 5)
      ctx.beginPath()
      ctx.moveTo(arrowX, arrowY)
      ctx.lineTo(arrowX - 8 * Math.cos(arrowAngle - 0.3), arrowY - 8 * Math.sin(arrowAngle - 0.3))
      ctx.moveTo(arrowX, arrowY)
      ctx.lineTo(arrowX - 8 * Math.cos(arrowAngle + 0.3), arrowY - 8 * Math.sin(arrowAngle + 0.3))
      ctx.stroke()

      rotation++
      requestAnimationFrame(animate)
    }

    animate()
  }, [size])

  return (
    <div className="relative flex items-center justify-center">
      <canvas ref={canvasRef} className="relative z-10" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full rounded-full border-2 border-black opacity-50"></div>
      </div>
    </div>
  )
}

export default NetworkGlobe


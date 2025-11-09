import React from "react"

type BubbleProps = {
  count?: number
}

const Bubbles = ({ count = 20 }: BubbleProps) => {
  const bubbles = Array.from({ length: count }).map((_, i) => {
    const size = Math.random() * 50 + 20 // 20px to 70px
    const left = Math.random() * 100     // 0% to 100%
    const duration = Math.random() * 10 + 5
    const delay = Math.random() * 10

    return (
      <div
        key={i}
        className="absolute rounded-full bg-white/20 animate-float pointer-events-none"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          bottom: "-100px",
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />
    )
  })

  return <div className="fixed inset-0 overflow-hidden">{bubbles}</div>
}

export default Bubbles

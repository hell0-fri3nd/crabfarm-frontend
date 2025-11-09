type BubbleProps = {
  count?: number
}

const Bubbles = ({ count = 20 }: BubbleProps) => {
  const bubbles = Array.from({ length: count }).map((_, i) => {
    const size = Math.random() * 50 + 20 // 20px to 70px
    const left = Math.random() * 100 // 0% to 100%
    const duration = Math.random() * 10 + 5
    const delay = Math.random() * 10

    return (
      <div
        key={i}
        className="absolute rounded-full bg-primary/30 pointer-events-none"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          animation: `float ${duration}s infinite linear`,
          animationDelay: `${delay}s`,
          top: "100%",
        }}
      />
    )
  })

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes float {
          to {
            transform: translateY(-100vh);
            opacity: 0;
          }
          from {
            opacity: 1;
          }
        }
      `}</style>
      {bubbles}
    </div>
  )
}

export default Bubbles

import { useEffect, useRef, useState } from 'react'

interface CounterProps {
  target: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
}

export function AnimatedCounter({ target, suffix = '', prefix = '', label, duration = 2500 }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const runAnimation = () => {
    setCount(0)
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(target)
    }
    requestAnimationFrame(tick)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) runAnimation() },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-4xl font-extrabold md:text-5xl">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-sm font-medium opacity-60">{label}</div>
    </div>
  )
}

"use client"

import { useScroll, useTransform, MotionValue } from "framer-motion"
import { useRef } from "react"

export function useParallax(offset: number = 50): {
  ref: React.RefObject<HTMLDivElement | null>
  y: MotionValue<number>
} {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset])
  
  return { ref, y }
}

export function useScrollFade(): {
  ref: React.RefObject<HTMLDivElement | null>
  opacity: MotionValue<number>
  scale: MotionValue<number>
} {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])
  
  return { ref, opacity, scale }
}
"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { MasterclassCard, type MasterclassCardData } from "./MasterclassCards"
import { cn } from "@/lib/utils"

interface MasterclassCarouselProps {
  data: MasterclassCardData[]
}

export function MasterclassCarousel({ data }: MasterclassCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener("scroll", checkScroll, { passive: true })
    window.addEventListener("resize", checkScroll)
    return () => {
      el.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [checkScroll])

  useEffect(() => {
    if (isMobile && data.length > 1) {
      const interval = setInterval(() => {
        const el = scrollRef.current
        if (!el) return
        
        const maxScroll = el.scrollWidth - el.clientWidth
        const currentScroll = el.scrollLeft
        
        if (currentScroll >= maxScroll) {
          el.scrollTo({ left: 0, behavior: "smooth" })
        } else {
          el.scrollBy({ left: 280, behavior: "smooth" })
        }
      }, 3000)
      
      return () => clearInterval(interval)
    }
  }, [isMobile, data.length])

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const scrollAmount = window.innerWidth < 640 ? 280 : 320
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <div className="relative w-full">
      {!isMobile && canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute -left-2 sm:-left-4 top-1/3 z-10 flex h-8 w-8 sm:h-10 sm:w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-colors hover:bg-muted"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      )}

      <div
        ref={scrollRef}
        className={cn(
          "scrollbar-hide flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth pb-2",
          isMobile && "snap-x snap-mandatory"
        )}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {data.map((item) => (
          <MasterclassCard key={item.id} data={item} />
        ))}
      </div>

      {!isMobile && canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute -right-2 sm:-right-4 top-1/3 z-10 flex h-8 w-8 sm:h-10 sm:w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-colors hover:bg-muted"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      )}
    </div>
  )
}

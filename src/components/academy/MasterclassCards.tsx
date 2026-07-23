"use client"

import { useNavigate } from "react-router-dom"

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center";

export interface MasterclassCardData {
  id: string
  title: string
  instructor: string
  image: string
  rating: number
  reviewCount: number
  currentPrice: string
  originalPrice: string
  isBestseller?: boolean
  isCertified?:boolean
  isPrensential?:boolean
  isFollowed?:boolean
}

interface MasterclassCardProps {
  data: MasterclassCardData
}

export function MasterclassCard({ data }: MasterclassCardProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    window.scrollTo(0, 0);
    navigate(`/formations/${data.id}`)
  }

  return (
    <div 
      className="group flex w-[280px] flex-shrink-0 cursor-pointer flex-col gap-2 sm:w-[300px] md:w-[320px] lg:w-[280px] xl:w-[300px] snap-center"
      onClick={handleClick}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border">
        <img
          src={data.image || FALLBACK_IMAGE}
          alt={data.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== FALLBACK_IMAGE) {
              target.src = FALLBACK_IMAGE;
            }
          }}
        />
      </div>

      <div className="flex flex-col gap-1 px-0.5 sm:px-1">
        <h3 className="line-clamp-2 text-xs sm:text-sm font-bold leading-snug text-foreground">
          {data.title}
        </h3>
        <p className="text-xs text-muted-foreground">{data.instructor}</p>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {data.isBestseller && (
              <span className="rounded-sm bg-amber-100 px-1.5 py-0.5 text-xs font-semibold text-amber-800">
                {"Les mieux not\u00E9s"}
              </span>
            )}
            {data.isCertified && (
              <span className="rounded-sm bg-green-100 px-1.5 py-0.5 text-xs font-semibold text-green-800">
                {"Certifi\u00E9"}
              </span>
            )}
            {data.isPrensential === true && (
              <span className="rounded-sm bg-gray-100 px-1.5 py-0.5 text-xs font-semibold text-gray-800">
                Présential
              </span>
            )}
            {data.isPrensential === false && (
              <span className="rounded-sm bg-blue-100 px-1.5 py-0.5 text-xs font-semibold text-blue-800">
                En ligne
              </span>
            )}
            {data.isFollowed && (
              <span className="rounded-sm bg-orange-100 px-1.5 py-0.5 text-xs font-semibold text-orange-800">
                {"Suivi"}
              </span>
            )}
          </div>
          
                  </div>
      </div>
    </div>
  )
}

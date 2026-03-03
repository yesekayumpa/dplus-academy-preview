import { Star } from "lucide-react"

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
  return (
    <div className="group flex w-[280px] flex-shrink-0 cursor-pointer flex-col gap-2 sm:w-[300px]">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border">
        <img
          src={data.image || "/placeholder.svg"}
          alt={data.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-1 px-0.5">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-foreground">
          {data.title}
        </h3>
        <p className="text-xs text-muted-foreground">{data.instructor}</p>

        <div className="mt-1 flex items-center gap-2">
          <div className="flex flex-wrap gap-2">
            {data.isBestseller && (
              <span className="rounded-sm bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                {"Les mieux not\u00E9s"}
              </span>
            )}
            {data.isCertified && (
              <span className="rounded-sm bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">
                {"Certifi\u00E9"}
              </span>
            )}
            {data.isPrensential ? 
              <span className="rounded-sm bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-800">
                {"Pr\u00E9sential"}
              </span> :
              <span className="rounded-sm bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800">
                {"En ligne"}
              </span>
            }
            {data.isFollowed && (
              <span className="rounded-sm bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-800">
                {"Suivi"}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-foreground">
              {data.rating.toFixed(1).replace(".", ",")}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {data.reviewCount} avis
          </span>
        </div>
      </div>
    </div>
  )
}

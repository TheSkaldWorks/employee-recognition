interface AwardcoLogoProps {
  url?: string
}

export function AwardcoLogo({ url }: AwardcoLogoProps) {
  if (!url) return null
  
  return (
    <div className="flex justify-center mb-6">
      <img
        src={url}
        alt="Awardco"
        className="max-h-[40px] h-auto max-w-[240px] object-contain"
      />
    </div>
  )
}

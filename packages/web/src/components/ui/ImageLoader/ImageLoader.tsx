import { PageLoader } from "@boardgames/components"
import Image from "next/image"
import { ReactNode, useCallback, useRef, useState } from "react"

import { replace } from "config/translations/replace"
import { useTranslations } from "hooks/useTranslations"

export type ImageLoaderProps = {
  children: ReactNode
  images: StaticImageData[]
}

export function ImageLoader({ children, images }: ImageLoaderProps) {
  const imagesRef = useRef(images)
  const imagesLoadedRef = useRef(new Set<string>())
  const lastTimeUpdated = useRef(Date.now())
  const t = useTranslations()

  const [imagesLoadedCount, setImagesLoadedCount] = useState(0)

  const onLoad = useCallback((src: string) => {
    imagesLoadedRef.current.add(src)
    if (imagesLoadedRef.current.size === imagesRef.current.length) {
      setImagesLoadedCount(imagesLoadedRef.current.size)
    } else {
      const now = Date.now()
      if (lastTimeUpdated.current < now - 1000) {
        setImagesLoadedCount(imagesLoadedRef.current.size)
        lastTimeUpdated.current = now
      }
    }
  }, [])

  if (imagesLoadedCount >= imagesRef.current.length) {
    return <>{children}</>
  }

  const message = replace(t.game.pageLoadingAssets, {
    count: imagesLoadedCount,
    total: imagesRef.current.length,
  })

  return (
    <>
      <div style={{ display: "none" }}>
        {imagesRef.current.map(image => (
          <Image
            key={image.src}
            onError={() => onLoad(image.src)}
            onLoadingComplete={() => onLoad(image.src)}
            priority
            src={image}
          />
        ))}
      </div>
      <PageLoader message={message} />
    </>
  )
}

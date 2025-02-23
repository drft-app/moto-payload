"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Media, Tour } from "@/payload-types"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface TourGalleryProps {
  gallery: NonNullable<Tour["gallery"]>
}

export default function TourGallery({ gallery }: TourGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery.map((item, index) => {
          const imageUrl =
            item.image &&
            typeof item.image === "object" &&
            "url" in item.image &&
            (item.image as Media).url

          return imageUrl ? (
            <div
              key={item.id || index}
              className="relative aspect-[4/3] cursor-pointer group"
              onClick={() => setSelectedImage(imageUrl)}
            >
              <Image
                src={imageUrl}
                alt={`Tour gallery image ${index + 1}`}
                fill
                sizes="300px"
                priority
                className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity rounded-lg" />
            </div>
          ) : null
        })}
      </div>

      <Dialog
        open={selectedImage !== null}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        <DialogContent className="max-w-7xl border-none bg-transparent p-0 overflow-hidden">
          <DialogTitle className="sr-only">Tour Gallery</DialogTitle>
          <DialogDescription className="sr-only">Tour Gallery</DialogDescription>
          {selectedImage && (
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={selectedImage}
                alt="Tour gallery image"
                fill
                className="object-contain"
                priority
                sizes="300px"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

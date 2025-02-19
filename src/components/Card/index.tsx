'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post, Tour } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardData = Post | Tour

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardData
  relationTo?: 'posts' | 'tours'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo = 'posts', showCategories, title: titleFromProps } = props

  if (!doc) return null

  const { slug, title } = doc
  const titleToUse = titleFromProps || title
  const href = `/${relationTo}/${slug}`

  const renderContent = () => {
    if (relationTo === 'posts') {
      const postDoc = doc as Post
      const { categories, meta } = postDoc
      const { description, image: metaImage } = meta || {}
      const hasCategories = categories && Array.isArray(categories) && categories.length > 0
      const sanitizedDescription = description?.replace(/\s/g, ' ')

      return (
        <>
          <div className="relative w-full">
            {!metaImage && <div className="">No image</div>}
            {metaImage && typeof metaImage !== 'string' && (
              <Media resource={metaImage} size="33vw" />
            )}
          </div>
          <div className="p-4">
            {showCategories && hasCategories && (
              <div className="uppercase text-sm mb-4">
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category
                    const categoryTitle = titleFromCategory || 'Untitled category'
                    const isLast = index === categories.length - 1
                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }
                  return null
                })}
              </div>
            )}
            {titleToUse && (
              <div className="prose">
                <h3>
                  <Link className="not-prose" href={href} ref={link.ref}>
                    {titleToUse}
                  </Link>
                </h3>
              </div>
            )}
            {description && (
              <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>
            )}
          </div>
        </>
      )
    } else {
      const tourDoc = doc as Tour
      const { featuredImage, duration, price, shortDescription } = tourDoc

      return (
        <>
          <div className="relative h-40 sm:h-48">
            {featuredImage && typeof featuredImage === 'object' && 'url' in featuredImage && (
              <Media resource={featuredImage} size="33vw" />
            )}
          </div>
          <div className="p-3 sm:p-4 flex-1 flex flex-col">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary-600 line-clamp-2">
              <Link href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{shortDescription}</p>
            <div className="flex items-center justify-between mt-auto">
              <div>
                <span className="text-base sm:text-lg font-bold text-primary-600">
                  ${price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 ml-1">USD</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block px-3 py-1 text-sm bg-primary-600 rounded-full">
                  {duration} days
                </span>
              </div>
            </div>
          </div>
        </>
      )
    }
  }

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      {renderContent()}
    </article>
  )
}

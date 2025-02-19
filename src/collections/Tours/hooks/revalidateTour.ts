import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Tour } from '../../../payload-types'

export const revalidateTour: CollectionAfterChangeHook<Tour> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/tours/${doc.slug}`

    payload.logger.info(`Revalidating tour at path: ${path}`)

    revalidatePath(path)
    revalidateTag('tours-sitemap')
    revalidatePath('/tours') // Revalidate the tours listing page
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Tour> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/tours/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('tours-sitemap')
    revalidatePath('/tours') // Revalidate the tours listing page
  }

  return doc
}

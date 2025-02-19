import config from '@payload-config'
import { getServerSideSitemap } from 'next-sitemap'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

const getToursSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const results = await payload.find({
      collection: 'tours',
      overrideAccess: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((tour) => Boolean(tour?.slug))
          .map((tour) => ({
            loc: `${SITE_URL}/tours/${tour?.slug}`,
            lastmod: tour.updatedAt || dateFallback,
          }))
      : []

    return sitemap
  },
  ['tours-sitemap'],
  {
    tags: ['tours-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getToursSitemap()

  return getServerSideSitemap(sitemap)
}

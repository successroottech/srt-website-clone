import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  canonicalPath?: string
  doc: Partial<Page> | Partial<Post> | null
  type?: 'article' | 'website'
}): Promise<Metadata> => {
  const { canonicalPath, doc, type = 'website' } = args

  const ogImage = getImageURL(doc?.meta?.image)
  const serverUrl = getServerSideURL()

  const title = doc?.meta?.title || doc?.title || 'Success Root Technologies'
  const plainText = doc?.legacyHTML
    ?.replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
  const description =
    doc?.meta?.description?.trim() ||
    plainText?.slice(0, 155).trim() ||
    `Explore ${title} from Success Root Technologies, including practical guidance, current technology skills, and next steps.`
  const canonical = canonicalPath || (doc?.slug === 'home' ? '/' : `/${doc?.slug || ''}/`)
  const canonicalURL = new URL(canonical, serverUrl).toString()

  return {
    description,
    alternates: {
      canonical: canonicalURL,
    },
    openGraph: mergeOpenGraph({
      description,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      type,
      url: canonicalURL,
    }),
    title,
    twitter: {
      card: 'summary_large_image',
      description,
      images: ogImage ? [ogImage] : undefined,
      title,
    },
  }
}

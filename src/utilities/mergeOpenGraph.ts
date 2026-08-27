import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'AI-first training for AI engineering, agents, full-stack development, data, cloud and cybersecurity.',
  images: [
    {
      url: `${getServerSideURL()}/og-ai.png`,
    },
  ],
  siteName: 'Success Root Technologies',
  title: 'AI-First Career Training | Success Root Technologies',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}

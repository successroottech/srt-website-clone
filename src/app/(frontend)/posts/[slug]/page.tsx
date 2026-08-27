import { permanentRedirect } from 'next/navigation'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function LegacyPostRedirect({ params }: Args) {
  const { slug = '' } = await params
  permanentRedirect(`/${encodeURIComponent(decodeURIComponent(slug))}/`)
}

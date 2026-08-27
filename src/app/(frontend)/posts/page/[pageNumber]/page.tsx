import { permanentRedirect } from 'next/navigation'

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function PostsPageRedirect({ params }: Args) {
  const { pageNumber } = await params
  permanentRedirect(`/blog/page/${encodeURIComponent(pageNumber)}/`)
}

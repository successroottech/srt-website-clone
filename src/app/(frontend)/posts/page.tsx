import { permanentRedirect } from 'next/navigation'

export default function PostsRedirect() {
  permanentRedirect('/blog/')
}

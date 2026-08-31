'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'

export function QuickPostForm() {
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  const chooseImage = (event: ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.files?.[0] || null)
    setMessage('')
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (!description.trim() || !image) {
      setMessage('Paste the description and choose an image.')
      return
    }

    setSaving(true)
    setMessage('')
    const body = new FormData()
    body.append('description', description)
    body.append('image', image)

    try {
      const response = await fetch('/api/quick-post', { body, method: 'POST' })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to save the post.')

      setDescription('')
      setImage(null)
      setMessage('Post published successfully.')
      const input = document.getElementById('quick-post-image') as HTMLInputElement | null
      if (input) input.value = ''
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save the post.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="srt-quick-post-page">
      <div className="srt-quick-post-card">
        <div className="srt-quick-post-heading">
          <div>
            <p>Posts</p>
            <h1>Create Quick Post</h1>
            <span>Paste the description, upload the square image and save.</span>
          </div>
          <a href="/admin/collections/posts/">Back to Posts</a>
        </div>

        <form onSubmit={submit}>
          <label htmlFor="quick-post-description">Description</label>
          <textarea
            id="quick-post-description"
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Paste the complete blog description here..."
            rows={16}
            value={description}
          />

          <label className="srt-quick-post-upload" htmlFor="quick-post-image">
            <strong>Blog image (1080 × 1080)</strong>
            <span>{image ? image.name : 'Click to choose or drag and drop a JPG, PNG or WebP image'}</span>
            <input
              accept="image/jpeg,image/png,image/webp"
              id="quick-post-image"
              onChange={chooseImage}
              type="file"
            />
          </label>

          {message && <p className="srt-quick-post-message" role="status">{message}</p>}

          <button disabled={saving} type="submit">
            {saving ? 'Saving…' : 'Save & Publish'}
          </button>
        </form>
      </div>
    </main>
  )
}

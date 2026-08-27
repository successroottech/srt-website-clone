'use client'

import { Download } from 'lucide-react'

export function PrintProfileButton() {
  return (
    <button onClick={() => window.print()} type="button">
      <Download aria-hidden="true" size={18} />
      Download / Print Profile
    </button>
  )
}

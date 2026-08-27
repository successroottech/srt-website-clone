import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'

export const revalidateFAQ: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  if (!req.context.disableRevalidate) {
    if (doc._status === 'published' || previousDoc?._status === 'published') {
      revalidatePath('/')
      revalidatePath('/faq/')
    }
  }

  return doc
}

export const revalidateFAQDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  if (!req.context.disableRevalidate) {
    revalidatePath('/')
    revalidatePath('/faq/')
  }

  return doc
}

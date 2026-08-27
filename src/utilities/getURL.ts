import canUseDOM from './canUseDOM'

export const PRODUCTION_HOSTNAME = 'successroottech.com'
export const STAGING_HOSTNAME = 'srtv1.successroottech.com'

const normalizeURL = (url: string) => url.replace(/\/$/, '')

export const getServerSideURL = () => {
  return normalizeURL(
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000')
  )
}

export const getAbsoluteURL = (path = '/') => new URL(path, `${getServerSideURL()}/`).toString()

export const getProductionURL = (path = '/') =>
  new URL(path, `https://${PRODUCTION_HOSTNAME}/`).toString()

export const isStagingHostname = (hostname: string) =>
  hostname.split(':')[0].toLowerCase() === STAGING_HOSTNAME

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return process.env.NEXT_PUBLIC_SERVER_URL || ''
}

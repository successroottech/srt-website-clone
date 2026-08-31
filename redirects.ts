import type { NextConfig } from 'next'

export const redirects: NextConfig['redirects'] = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header' as const,
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  return [
    {
      source: '/about-success-root-it-training-chennai',
      destination: '/about-us/',
      statusCode: 301,
    },
    {
      source: '/about-success-root-it-training-chennai/',
      destination: '/about-us/',
      statusCode: 301,
    },
    {
      source: '/courses',
      destination: '/it-courses-chennai/',
      statusCode: 301,
    },
    {
      source: '/courses/',
      destination: '/it-courses-chennai/',
      statusCode: 301,
    },
    {
      source: '/courses/full-stack-web-development-react-python-fastapi-and-mongodb/',
      destination: '/courses/full-stack-developer-course-chennai/',
      permanent: true,
    },
    {
      source: '/courses/data-analytics-power-bi-ai/',
      destination: '/courses/data-analytics-course-chennai/',
      permanent: true,
    },
    internetExplorerRedirect,
  ]
}

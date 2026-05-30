const OUYI_HOST = 'ouyi.xxmsanguo.com'
const MAIN_HOSTS = new Set(['xxmsanguo.com', 'www.xxmsanguo.com'])

const ouyiRoutes = new Map([
  ['/', '/ouyi.html'],
  ['/anzhuo', '/ouyi/anzhuo.html'],
  ['/ios', '/ouyi/ios.html'],
  ['/pc', '/ouyi/pc.html'],
])

export async function onRequest(context) {
  const url = new URL(context.request.url)
  const host = url.hostname.toLowerCase()

  if (host === OUYI_HOST) {
    const assetPath = ouyiRoutes.get(url.pathname)

    if (assetPath) {
      const assetUrl = new URL(context.request.url)
      assetUrl.pathname = assetPath
      return context.env.ASSETS.fetch(new Request(assetUrl, context.request))
    }
  }

  if (MAIN_HOSTS.has(host) && (url.pathname === '/ouyi' || url.pathname.startsWith('/ouyi/'))) {
    const target = new URL('https://ouyi.xxmsanguo.com/')
    target.pathname = url.pathname.replace(/^\/ouyi\/?/, '/') || '/'
    target.search = url.search
    return Response.redirect(target.toString(), 301)
  }

  return context.next()
}

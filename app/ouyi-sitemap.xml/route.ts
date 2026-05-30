export const dynamic = 'force-static'

const ouyiUrls = [
  'https://ouyi.xxmsanguo.com/',
  'https://ouyi.xxmsanguo.com/anzhuo',
  'https://ouyi.xxmsanguo.com/ios',
  'https://ouyi.xxmsanguo.com/pc',
]

export function GET() {
  const lastModified = new Date().toISOString()
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ouyiUrls.map((url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified}</lastmod>
  </url>`).join('\n')}
</urlset>`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}

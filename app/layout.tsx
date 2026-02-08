import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://xxmsanguo.com'),
  title: '小虾米战三国 - 官方下载 | 隐都游戏',
  description: '《小虾米战三国》官方下载。2026年度高自由度开放式武侠RPG，经典战棋玩法，穿越乱世三国，谱写你的传奇。',
  keywords: '小虾米战三国,三国战棋,单机RPG,像素风手游,开放世界,策略游戏',
  openGraph: {
    title: '小虾米战三国 - 官方下载',
    description: '2026年度高自由度开放式武侠RPG，经典战棋玩法，穿越乱世三国，谱写你的传奇。',
    type: 'website',
    locale: 'zh_CN',
    images: ['/appicon.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '小虾米战三国 - 官方下载',
    description: '2026年度高自由度开放式武侠RPG，经典战棋玩法',
    images: ['/appicon.webp'],
  },
  icons: {
    icon: '/appicon.webp',
    apple: '/appicon.webp',
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '小虾米战三国',
    url: 'https://xxmsanguo.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://xxmsanguo.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <html lang="zh-CN">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}

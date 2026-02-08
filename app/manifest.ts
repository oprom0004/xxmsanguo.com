import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: '小虾米战三国',
        short_name: '小虾米三国',
        description: '2026年度高自由度开放式武侠RPG，经典战棋玩法，穿越乱世三国，谱写你的传奇。',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
            {
                src: '/appicon.webp',
                sizes: '192x192',
                type: 'image/webp',
            },
            {
                src: '/appicon.webp',
                sizes: '512x512',
                type: 'image/webp',
            },
        ],
    }
}

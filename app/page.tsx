import { Metadata } from 'next'
import Link from 'next/link'
import GamePage from '@/components/GamePage'

export const metadata: Metadata = {
  title: '小虾米战三国 - 官方下载 | 隐都游戏',
  description: '《小虾米战三国》官方下载。2026年度高自由度开放式武侠RPG，经典战棋玩法，穿越乱世三国，谱写你的传奇。',
  keywords: '小虾米战三国,三国战棋,单机RPG,像素风手游,开放世界,策略游戏,三国志曹操传',
  openGraph: {
    title: '小虾米战三国 - 官方下载',
    description: '2026年度高自由度开放式武侠RPG，经典战棋玩法',
    type: 'website',
  },
}

export default function Home() {
  return <GamePage />
}

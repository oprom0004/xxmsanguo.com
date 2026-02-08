import Link from 'next/link'
import { Layers, Smartphone, Globe, Monitor, Home } from 'lucide-react'

interface QuickLinksProps {
  current: string
}

const links = [
  { id: 'android', label: '安卓版下载', desc: '官方 APK · 防封锁', icon: Smartphone, href: '/ouyi/anzhuo' },
  { id: 'ios', label: '苹果版下载', desc: '海外 ID · 教程', icon: Globe, href: '/ouyi/ios' },
  { id: 'pc', label: '电脑版下载', desc: 'Win/Mac · 专业版', icon: Monitor, href: '/ouyi/pc' },
  { id: 'ouyi', label: '下载中心首页', desc: '返回索引页', icon: Home, href: '/ouyi' },
]

export default function QuickLinks({ current }: QuickLinksProps) {
  const visibleLinks = links.filter(l => l.id !== current)

  return (
    <div className="mt-12 pt-8 border-t border-slate-200 not-prose">
      <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Layers size={18} className="text-blue-600"/>
        相关版本下载
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visibleLinks.map((link) => {
          const Icon = link.icon
          return (
            <Link
              key={link.id}
              href={link.href}
              className="group flex flex-col p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-sm cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-1.5 bg-white rounded-md border border-slate-100 text-slate-400 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                  <Icon size={18} />
                </div>
                <span className="font-bold text-slate-700 group-hover:text-blue-700">{link.label}</span>
              </div>
              <span className="text-xs text-slate-500 pl-[42px]">{link.desc}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

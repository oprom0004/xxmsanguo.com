import Breadcrumbs from './Breadcrumbs'

interface TechHeaderProps {
  title: string
  subtitle: string
  tag: string
  breadcrumbs: Array<{ label: string; href?: string }>
}

export default function TechHeader({ title, subtitle, tag, breadcrumbs }: TechHeaderProps) {
  return (
    <div className="bg-[#111827] text-white pt-8 pb-12 px-4 md:px-0">
      <div className="container mx-auto max-w-4xl">
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded shadow-sm">{tag}</span>
          <span className="flex items-center gap-2 text-green-400 text-xs">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            官方最新版本
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight leading-snug">
          {title}
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-3xl leading-relaxed border-l-2 border-slate-700 pl-4">
          {subtitle}
        </p>
      </div>
    </div>
  )
}

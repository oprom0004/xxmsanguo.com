import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && <ChevronRight className="mx-1 text-slate-600" size={14} />}
            {item.href && index < items.length - 1 ? (
              <Link 
                href={item.href}
                className="hover:text-white transition-colors cursor-pointer text-slate-400"
              >
                {item.label}
              </Link>
            ) : (
              <span className={`${index === items.length - 1 ? 'text-white font-medium cursor-default pointer-events-none' : 'text-slate-400'}`}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

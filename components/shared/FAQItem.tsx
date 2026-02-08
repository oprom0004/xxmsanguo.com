import { HelpCircle } from 'lucide-react'

interface FAQItemProps {
  q: string
  a: string
}

export default function FAQItem({ q, a }: FAQItemProps) {
  return (
    <div className="border-b border-slate-100 last:border-0 py-5">
      <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
        <HelpCircle size={18} className="text-blue-500" />
        {q}
      </h3>
      <p className="text-slate-600 text-sm leading-7 pl-7 text-justify">{a}</p>
    </div>
  )
}

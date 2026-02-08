import { Shield } from 'lucide-react'

interface SecurityBoxProps {
  text: string
}

export default function SecurityBox({ text }: SecurityBoxProps) {
  return (
    <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3 text-sm text-blue-800">
      <Shield className="shrink-0 mt-0.5" size={18} />
      <div>
        <div className="font-bold mb-1">官方安全验证</div>
        <div className="opacity-90 leading-relaxed text-justify">{text}</div>
      </div>
    </div>
  )
}

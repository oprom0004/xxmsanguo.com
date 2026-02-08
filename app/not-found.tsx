
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: '404 - 页面未找到 | 小虾米战三国',
    description: '您访问的页面不存在，请返回首页。',
    robots: {
        index: false,
        follow: false,
    },
}

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                    🤔
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">哎呀，页面走丢了</h1>
                <p className="text-gray-500 mb-8">
                    您访问的页面可能已被删除、更名或暂时不可用。
                </p>

                <div className="space-y-3">
                    <Link
                        href="/"
                        className="block w-full py-3 px-4 bg-brand hover:bg-brand-dark text-white rounded-xl font-bold transition-colors"
                    >
                        返回首页
                    </Link>
                    <Link
                        href="/ouyi"
                        className="block w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-colors"
                    >
                        前往下载中心
                    </Link>
                </div>
            </div>

            <p className="mt-8 text-xs text-gray-400">
                Error Code: 404 Not Found
            </p>
        </div>
    )
}

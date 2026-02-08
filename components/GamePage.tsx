'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Download,
  Share2,
  Flag,
  Star,
  ChevronDown,
  Search,
  Bell,
  Gamepad2,
  HelpCircle
} from 'lucide-react'

const screenshots = [
  "/banner-1.webp",
  "/banner-2.webp"
]

const tags = ["角色扮演", "战棋", "策略", "高自由度", "单机", "三国", "武侠", "像素风"]

const recommendedLinks = [
  { title: "欧易下载", href: "/ouyi", icon: "/ouyi-logo.png" },
  { title: "欧易安卓版下载", href: "/ouyi/anzhuo", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" },
  { title: "欧易苹果版下载", href: "/ouyi/ios", icon: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { title: "欧易电脑版下载", href: "/ouyi/pc", icon: "/okex-logo-pc.png" }
]

export default function GamePage() {
  return (
    <div className="min-h-screen bg-[#f5f6f7] font-sans pb-20 md:pb-0">
      {/* Top Navigation Bar */}
      <nav className="bg-white sticky top-0 z-50 shadow-sm px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-brand text-white p-1 rounded-md">
            <Gamepad2 size={24} />
          </div>
          <div className="text-gray-900 font-black text-xl tracking-tight">小虾米三国</div>
        </Link>
        <div className="flex-1 mx-4 max-w-xl hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="搜索游戏..."
              className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-600">
          <Search className="md:hidden" size={24} />
          <Bell size={24} />
          <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden border border-gray-100">
            <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="小虾米战三国玩家头像" width={32} height={32} />
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-5xl md:mt-6 md:px-4">
        <div className="flex flex-col md:flex-row gap-6">

          {/* Main Content Column */}
          <main className="flex-1 min-w-0">

            {/* Header / Hero Section */}
            <div className="bg-white md:rounded-2xl p-6 shadow-soft mb-4">
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md flex-shrink-0 border border-gray-100 relative">
                  <Image src="/appicon.webp" alt="小虾米战三国游戏图标 - 三国战棋RPG手游" width={96} height={96} className="object-cover" />
                  <div className="absolute bottom-0 right-0 bg-yellow-400 text-[10px] font-bold px-1 rounded-tl-md">S3</div>
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-bold text-gray-900 mb-1 leading-tight">小虾米战三国</h1>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-gray-100 text-gray-500 text-xs px-1.5 py-0.5 rounded">发行: 隐都工作室</span>
                    <span className="text-xs text-brand border border-brand/30 px-1.5 py-0.5 rounded">官方正版</span>
                  </div>

                  {/* Rating / Stats Row */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1 text-gray-900 font-bold">
                      <Star className="fill-brand text-brand" size={16} />
                      <span className="text-lg">9.8</span>
                    </div>
                    <div className="h-3 w-[1px] bg-gray-300"></div>
                    <div>战棋榜 <span className="text-gray-900 font-bold">No.1</span></div>
                    <div className="h-3 w-[1px] bg-gray-300"></div>
                    <div>120万+ 下载</div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {tags.slice(0, 4).map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{tag}</span>
                    ))}
                    <span className="text-xs text-gray-400 self-center">+</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <Link
                  href="/xiaoxiami/anzhuo"
                  className="flex-1 min-w-[120px] bg-brand hover:bg-brand-dark text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-brand/20"
                >
                  <Download size={20} />
                  安卓版下载
                </Link>
                <Link
                  href="/xiaoxiami/ios"
                  className="flex-1 min-w-[120px] bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-gray-900/20"
                >
                  <Download size={20} />
                  苹果版下载
                </Link>
                <div className="flex gap-3">
                  <button className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-xl text-brand hover:bg-brand/5 transition-colors">
                    <Share2 size={20} />
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                    <Flag size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Screenshots Gallery */}
            <div className="bg-white md:rounded-2xl p-6 shadow-soft mb-4 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">游戏预览</h2>
                <span className="text-xs text-gray-400">查看全部 &gt;</span>
              </div>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6 md:mx-0 md:px-0 scroll-pl-6 snap-x">
                {screenshots.map((src, idx) => (
                  <div key={idx} className="flex-shrink-0 w-72 aspect-video rounded-lg overflow-hidden relative shadow-sm snap-center group cursor-pointer">
                    <Image src={src} alt={`Screenshot ${idx + 1}`} width={288} height={162} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white md:rounded-2xl p-6 shadow-soft mb-4">
              <h2 className="font-bold text-lg mb-4 text-slate-900">关于《小虾米战三国》</h2>
              <div className="text-gray-600 space-y-6 leading-relaxed text-sm md:text-base prose prose-slate max-w-none">
                <p className="font-bold text-gray-900 text-lg">
                  2026年最受期待的单机三国战棋手游《小虾米战三国》正式公测！这不仅仅是一款游戏，更是一部可以玩的开放世界武侠小说。
                </p>
                <p>
                  致敬《金庸群侠传》与《三国志曹操传》经典玩法，本作融合了现代高自由度RPG元素。你将扮演一名意外穿越到三国乱世的现代少年——“小虾米”，在烽火连天的时代中，不仅要结识刘备、曹操、孙权等历史雄主，更要在江湖中拜师学艺，探寻“古今穿越”背后的惊天秘密。作为一款<b>不肝不氪的良心手游</b>，我们致力于还原最纯粹的策略乐趣。
                </p>

                <h2 className="text-xl font-bold text-slate-900 mt-8 border-l-4 border-brand pl-3">游戏特色：重新定义三国RPG</h2>

                <div className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-base mb-1">1. 开放世界：高自由度武侠江湖</h3>
                    <p>
                      告别传统卡牌游戏的推图模式，在这里，整个三国版图都是你的后花园。从幽州雪原到南蛮丛林，超大无缝地图任你<b>自由探索</b>。路边的乞丐可能是绝世高手，山洞中的枯骨可能藏着失传的《青囊书》。你的每一个选择，都会触发不同的<b>奇遇支线</b>，影响江湖声望与历史走向。
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 text-base mb-1">2. 硬核战棋：拒绝数值碾压</h3>
                    <p>
                      回归最纯粹的战棋玩法（SRPG）。本作采用经典的六角格（Hexagon）与四方格战棋机制。胜利不再仅仅取决于战斗力，你需要考虑<b>兵种克制</b>（骑克步，步克弓）、<b>地形影响</b>（山地增加防御，河流减少移动）、<b>五行相克</b>以及队友之间的协同作战（羁绊合击）。即使是初始武将，只要策略得当，也能觉醒无双技，成为独当一面的大将军。
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 text-base mb-1">3. 历史名将：全员皆可无双</h3>
                    <p>
                      吕布、赵云、关羽、诸葛亮……数百位三国名将等你<b>招募</b>。不同于其他游戏强行划分R/SR/SSR等级，在《小虾米战三国》中，通过培养和转职，即使是潘凤、邢道荣这样的“小人物”，也能觉醒无双技，成为独当一面的大将军。独特的<b>武器锻造系统</b>，让你能为心爱的武将打造专属神兵。
                    </p>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mt-8 border-l-4 border-brand pl-3">为什么选择《小虾米战三国》？</h2>
                <p className="mb-4">
                  市面上的三国手游虽多，但真正能做到“单机体验”与“策略深度”并存的屈指可数。我们与传统“换皮卡牌”游戏有着本质区别：
                </p>

                <div className="overflow-x-auto not-prose border border-gray-200 rounded-lg">
                  <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-50 font-bold text-gray-900">
                      <tr>
                        <th className="p-3">对比维度</th>
                        <th className="p-3 text-brand">小虾米战三国</th>
                        <th className="p-3 text-gray-400">传统卡牌手游</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-100">
                        <td className="p-3 font-medium">核心玩法</td>
                        <td className="p-3 font-bold text-green-600">手动战棋，走位策略</td>
                        <td className="p-3 text-gray-500">全自动战斗，数值对撞</td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="p-3 font-medium">探索度</td>
                        <td className="p-3">全地图自由跑动，捡垃圾</td>
                        <td className="p-3 text-gray-500">点击关卡推图</td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="p-3 font-medium">氪金压力</td>
                        <td className="p-3">无VIP，通关全靠脑子</td>
                        <td className="p-3 text-gray-500">不充钱卡关，逼氪严重</td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="p-3 font-medium">画面风格</td>
                        <td className="p-3">复古像素风 (Pixel Art)</td>
                        <td className="p-3 text-gray-500">油腻写实风 / Q版大头</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mt-8 border-l-4 border-brand pl-3">新手入门与常见问题 (FAQ)</h2>

                <div className="space-y-4 not-prose bg-gray-50 p-4 rounded-lg">
                  <div>
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm"><HelpCircle size={14} className="text-brand" /> 小虾米战三国是单机游戏吗？需要联网吗？</h3>
                    <p className="text-gray-600 text-xs mt-1 pl-6">
                      本作是<b>弱联网单机手游</b>。大部分时间（跑图、战斗、剧情）都是单机体验，不需要消耗流量。仅在登录账号、云存档保存、以及参加“华山论剑”PVP排行榜时需要短暂联网。
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm"><HelpCircle size={14} className="text-brand" /> 手机配置要求高吗？</h3>
                    <p className="text-gray-600 text-xs mt-1 pl-6">
                      由于采用了复古像素风格，游戏对配置要求极低。Android 8.0 以上系统，2GB 内存即可流畅运行。无论是华为、小米还是OPPO/Vivo的老机型都能完美适配。iOS用户需要 iPhone 8 及以上机型。
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm"><HelpCircle size={14} className="text-brand" /> 开局选什么职业好？</h3>
                    <p className="text-gray-600 text-xs mt-1 pl-6">
                      新手推荐选择<b>“刀客”</b>（血厚防高，容错率高）或<b>“剑客”</b>（闪避高，单体输出强）。喜欢远程风筝流的玩家可以选择“弓手”。实际上，后期可以通过拜师学艺自由切换武器，不必过于纠结初始职业。
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-4 border-t pt-4">
                  标签：#三国战棋 #单机RPG #像素风手游 #小虾米 #开放世界 #策略游戏 #三国志曹操传MOD #金庸群侠传
                  <br />隐私政策 | 用户协议 | 家长监护工程 | 适龄提示：16+
                </p>
              </div>
            </div>

            {/* Ratings & Reviews Snippet */}
            <div className="bg-white md:rounded-2xl p-6 shadow-soft mb-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg">评价与试玩</h2>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <span>全部 1.8万 条评论</span>
                  <ChevronDown size={16} />
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">L</div>
                    <span className="text-sm font-bold text-gray-800">李逍遥</span>
                    <span className="bg-yellow-100 text-yellow-700 text-[10px] px-1 rounded">玩过 560小时</span>
                  </div>
                  <div className="flex text-yellow-400">
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  这绝对是目前市面上最好的单机三国战棋手游，没有之一！不逼氪，慢慢玩什么都有。最喜欢里面的探索模式，能在地图上捡垃圾太快乐了。希望官方能多出点新剧本！
                </p>
              </div>

              <button className="w-full py-3 text-brand text-sm font-medium bg-brand/5 rounded-lg hover:bg-brand/10 transition-colors">
                查看更多评价
              </button>
            </div>

            {/* Mobile Only: Recommended Links / More Games */}
            <div className="bg-white p-6 shadow-soft mb-4 md:hidden">
              <h3 className="font-bold text-gray-900 mb-4">更多推荐</h3>
              <div className="space-y-4">
                {recommendedLinks.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="flex gap-3 items-center group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors -mx-2 border border-gray-100"
                  >
                    <div className="w-10 h-10 flex-shrink-0 bg-white rounded-full overflow-hidden border border-gray-200 p-1 flex items-center justify-center">
                      <Image src={item.icon} alt={item.title} width={24} height={24} className="object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-800 text-sm truncate group-hover:text-brand">{item.title}</div>
                      <div className="text-xs text-gray-400">官方正版 · 安全下载</div>
                    </div>
                    <div className="text-gray-300">
                      <ChevronDown className="-rotate-90" size={16} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </main>

          {/* Sidebar (Desktop Only) */}
          <aside className="hidden md:block w-80 space-y-6">
            {/* Info Card */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="font-bold text-gray-900 mb-4">游戏信息</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">开发商</span>
                  <span className="text-brand">隐都工作室</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">发行</span>
                  <span className="text-brand">隐都工作室</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">更新时间</span>
                  <span className="text-gray-900">2026-02-08</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">版本</span>
                  <span className="text-gray-900">3.5.0</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">大小</span>
                  <span className="text-gray-900">548.5 MB</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-gray-500">语言</span>
                  <span className="text-gray-900">简体中文</span>
                </div>
              </div>
            </div>



            {/* Related Games */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="font-bold text-gray-900 mb-4">你可能也喜欢</h3>
              <div className="space-y-4">
                {recommendedLinks.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="flex gap-3 items-center group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors -mx-2"
                  >
                    <div className="w-10 h-10 flex-shrink-0 bg-white rounded-full overflow-hidden border border-gray-200 p-1 flex items-center justify-center">
                      <Image src={item.icon} alt={item.title} width={24} height={24} className="object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-800 text-sm truncate group-hover:text-brand">{item.title}</div>
                      <div className="text-xs text-gray-400">官方正版 · 安全下载</div>
                    </div>
                    <div className="text-gray-300">
                      <ChevronDown className="-rotate-90" size={16} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

        </div>

        {/* Footer */}
        <footer className="mt-12 py-8 text-center text-gray-400 text-xs border-t border-gray-200">
          <p className="mb-2">© 2026 隐都工作室 (Yindu Studio). All Rights Reserved.</p>
          <p>沪ICP备 20260000号-1 | 客服电话: 400-123-4567</p>
        </footer>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 md:hidden z-50 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100">
          <Image src="/appicon.webp" alt="小虾米战三国 - 开放世界三国RPG" width={40} height={40} className="object-cover" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-sm text-gray-900">小虾米战三国</div>
          <div className="text-xs text-gray-500">高自由度武侠RPG</div>
        </div>
        <button className="bg-brand text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-brand/20">
          下载
        </button>
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Download, 
  Share2, 
  Flag, 
  Star, 
  ChevronDown, 
  ChevronRight,
  Search, 
  Bell, 
  Gamepad2,
  Shield,
  Smartphone,
  Cpu,
  Globe,
  AlertTriangle,
  Terminal,
  CheckCircle,
  XCircle,
  HelpCircle,
  Server,
  Info,
  ArrowLeft,
  Settings,
  Wifi,
  Lock,
  FileCode,
  Layers,
  Check,
  SmartphoneNfc,
  Home,
  Monitor,
  HardDrive,
  Wallet,
  Zap
} from 'lucide-react';

// --- Shared Components ---

const Breadcrumbs = ({ items, onNavigate }) => (
  <nav className="flex text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
    <ol className="inline-flex items-center space-x-1 md:space-x-2">
      {/* Removed the Home link as requested */}
      {items.map((item, index) => (
        <li key={index} className="inline-flex items-center">
          {index > 0 && <ChevronRight className="mx-1 text-slate-600" size={14} />}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); if(item.action) item.action(); }}
            className={`${index === items.length - 1 ? 'text-white font-medium cursor-default pointer-events-none' : 'hover:text-white transition-colors cursor-pointer text-slate-400'}`}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ol>
  </nav>
);

const TechHeader = ({ title, subtitle, tag, breadcrumbs, onNavigate }) => (
  <div className="bg-[#111827] text-white pt-8 pb-12 px-4 md:px-0">
    <div className="container mx-auto max-w-4xl">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />
      
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
);

const SecurityBox = ({ text }) => (
  <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3 text-sm text-blue-800">
    <Shield className="shrink-0 mt-0.5" size={18} />
    <div>
      <div className="font-bold mb-1">官方安全验证</div>
      <div className="opacity-90 leading-relaxed text-justify">{text}</div>
    </div>
  </div>
);

const FAQItem = ({ q, a }) => (
  <div className="border-b border-slate-100 last:border-0 py-5">
    <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
      <HelpCircle size={18} className="text-blue-500" />
      {q}
    </h3>
    <p className="text-slate-600 text-sm leading-7 pl-7 text-justify">{a}</p>
  </div>
);

const QuickLinks = ({ onNavigate, current }) => {
  const links = [
    { id: 'android', label: '安卓版下载', desc: '官方 APK · 防封锁', icon: Smartphone, target: 'ouyi_android' },
    { id: 'ios', label: '苹果版下载', desc: '海外 ID · 教程', icon: Globe, target: 'ouyi_ios' },
    { id: 'pc', label: '电脑版下载', desc: 'Win/Mac · 专业版', icon: Monitor, target: 'ouyi_pc' },
    { id: 'home', label: '下载中心首页', desc: '返回索引页', icon: Home, target: 'ouyi' },
  ];

  const visibleLinks = links.filter(l => l.id !== current);

  return (
    <div className="mt-12 pt-8 border-t border-slate-200 not-prose">
      <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Layers size={18} className="text-blue-600"/>
        相关版本下载
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visibleLinks.map((link) => (
          <div 
            key={link.id}
            onClick={() => onNavigate(link.target)}
            className="group flex flex-col p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-sm cursor-pointer transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-1.5 bg-white rounded-md border border-slate-100 text-slate-400 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                <link.icon size={18} />
              </div>
              <span className="font-bold text-slate-700 group-hover:text-blue-700">{link.label}</span>
            </div>
            <span className="text-xs text-slate-500 pl-[42px]">{link.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Sub-Pages ---

const OuyiAndroidView = ({ onNavigate }) => {
  const breadcrumbs = [
    { label: '欧易下载中心', action: () => onNavigate('ouyi') },
    { label: '安卓版下载', action: null }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans">
      <TechHeader 
        title="欧易安卓版下载 (OKX Android) 2026 官方正式版 APK 获取与安装深度指南"
        subtitle="提供欧易OKX交易所官方APK下载。针对华为 HarmonyOS、小米 HyperOS 及 OPPO/Vivo 等国产系统的纯净模式拦截问题提供完整解决方案。内置 Web3 钱包、DeFi 聚合器与防封节点，保障数字资产交易安全与流畅体验。"
        tag="Android v6.48.1"
        breadcrumbs={breadcrumbs}
        onNavigate={onNavigate}
      />

      <div className="container mx-auto max-w-4xl -mt-8 px-4 mb-20">
        <div className="bg-white p-8 border border-slate-200 shadow-lg rounded-lg">
          <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-blue-500 prose-h2:pl-4 prose-h3:text-lg prose-a:text-blue-600 prose-p:leading-7 prose-li:leading-7">
            
            <div className="flex flex-col md:flex-row gap-6 items-center mb-10 not-prose bg-slate-50 p-6 rounded-xl border border-slate-100">
              <div className="w-24 h-24 bg-white rounded-2xl shadow-sm p-3 shrink-0 flex items-center justify-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" className="w-full h-full object-contain" alt="Android Logo"/>
              </div>
              <div className="flex-1 space-y-2">
                <div className="text-xl font-bold text-slate-900">欧易 OKX 安卓通用版 APK</div>
                <div className="text-sm text-slate-500">
                  <div className="mb-1">版本号：v6.48.1 (Build 20260209)</div>
                  <div className="mb-1">文件大小：285 MB (安装后约 600MB)</div>
                  <div>系统要求：Android 8.0 及以上</div>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                   <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded border border-green-200">官方签名认证</span>
                   <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded border border-blue-200">64位架构</span>
                   <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded border border-purple-200">内置 Web3</span>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold shadow-lg shadow-blue-200 transition-all w-full md:w-auto flex items-center justify-center gap-2">
                <Download size={20} />
                立即下载 APK
              </button>
            </div>

            <h2>深度解析：为什么选择欧易官方安卓版？</h2>
            <p>
              在移动互联网时代，数字资产交易对客户端的安全性、实时性和功能完整性要求极高。<b>欧易安卓版下载</b>不仅仅是一个简单的交易软件，它是一个集成了交易所（CEX）和去中心化钱包（Web3 Wallet）的超级应用。相比于网页版或第三方应用商店的“阉割版”，官方 APK 具有不可替代的优势：
            </p>
            <ul className="list-none pl-0 space-y-4">
              <li className="flex gap-3">
                <div className="shrink-0 mt-1"><CheckCircle className="text-green-500" size={20} /></div>
                <div>
                  <strong className="text-slate-900">全功能无阉割：</strong> 
                  Google Play 上的版本往往因为合规限制，移除了合约交易（Futures）、期权（Options）以及部分理财赚币功能。官方 APK 则保留了所有专业功能，支持 125x 杠杆及复杂的委托策略。
                </div>
              </li>
              <li className="flex gap-3">
                <div className="shrink-0 mt-1"><CheckCircle className="text-green-500" size={20} /></div>
                <div>
                  <strong className="text-slate-900">Web3 钱包深度集成：</strong> 
                  内置 MPC 无私钥钱包技术，支持比特币、以太坊、Solana 等 80+ 条公链。您可以直接在 APP 内进行 DEX 兑换、NFT 市场交易以及 DeFi 挖矿，无需在多个应用间切换。
                </div>
              </li>
              <li className="flex gap-3">
                <div className="shrink-0 mt-1"><CheckCircle className="text-green-500" size={20} /></div>
                <div>
                  <strong className="text-slate-900">抗网络封锁技术：</strong> 
                  APP 内置了动态 DNS 解析和全球 CDN 加速节点。当某个 API 接口被地区运营商屏蔽时，客户端会自动切换至备用线路，确保在极端网络环境下也能下单平仓，解决“网络连接错误”痛点。
                </div>
              </li>
            </ul>

            <h2>国产手机“纯净模式”安装拦截终极解决方案</h2>
            <p>
              近年来，为了构建闭环生态，国产安卓手机（华为 HarmonyOS、小米 HyperOS、OPPO ColorOS、Vivo OriginOS 等）加强了对非应用商店来源 APK 的拦截力度。用户在安装<b>欧易APP</b>时，常遇到“风险应用”、“高危病毒”或“禁止安装”的误报。这是因为涉及金融类应用未缴纳“渠道税”而被系统标记。
            </p>
            <p><strong>请注意：欧易官方 APP 绝对不包含病毒。</strong>以下是针对各品牌的详细绕过指南：</p>

            <div className="grid grid-cols-1 gap-6 my-8 not-prose">
              {/* Huawei */}
              <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 bg-red-600 rounded-full"></span>
                  华为/荣耀 (HarmonyOS)
                </h3>
                <div className="space-y-3 text-sm text-slate-700">
                  <p>华为系统的“纯净模式”最为严格，通常无法直接关闭。最有效的方案是<strong>“断网安装法”</strong>：</p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>使用浏览器下载好 APK 文件（此时不要点击打开）。</li>
                    <li>下拉通知栏，<strong>关闭 WiFi 和 移动数据</strong>，开启“飞行模式”。</li>
                    <li>进入手机【文件管理】，找到下载好的安装包，点击安装。</li>
                    <li>系统因无法联网校验黑名单库，会直接放行。安装完成后再恢复网络即可。</li>
                  </ol>
                  <p className="text-xs text-slate-500 mt-2">* 备选方案：设置 > 系统和更新 > 纯净模式 > 退出（部分新机型已隐藏此入口）。</p>
                </div>
              </div>

              {/* Xiaomi */}
              <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                  小米/红米 (HyperOS/MIUI)
                </h3>
                <div className="space-y-3 text-sm text-slate-700">
                  <p>小米系统会在安装界面弹出“安全守护”提示：</p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>在拦截页面，点击右上角的【设置】图标（齿轮状）。</li>
                    <li>关闭【安全检测】和【安全守护】开关。</li>
                    <li>如果系统提示“需验证小米账号”，此时直接<strong>断开网络</strong>，再点击安装即可跳过验证。</li>
                  </ol>
                </div>
              </div>

              {/* OV */}
              <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 bg-green-600 rounded-full"></span>
                  OPPO / Vivo / 一加
                </h3>
                <div className="space-y-3 text-sm text-slate-700">
                  <p>OV系手机通常会要求输入锁屏密码来授权安装：</p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>在文件管理中找到 APK，长按选择“以其他方式打开” > “软件包安装程序”。</li>
                    <li>若弹出“高危提示”，请勾选“我已了解风险”，然后点击“继续安装”。</li>
                    <li>输入您的锁屏密码或指纹进行身份验证。</li>
                    <li><strong>重要：</strong> Vivo 手机若提示“禁止安装”，请前往 设置 > 安全与隐私 > 更多安全设置 > 关闭“禁止安装恶意应用”。</li>
                  </ol>
                </div>
              </div>
            </div>

            <h2>常见问题 (FAQ)</h2>
            <div className="not-prose mt-8">
              <FAQItem 
                q="为什么我的手机提示“解析包出现错误”？"
                a="这通常有两个原因：1. 下载的文件不完整。请不要使用迅雷等第三方工具下载，直接使用 Chrome 或系统自带浏览器下载，并确保文件大小在 280MB 左右。2. 系统版本过低。欧易 v6.48.1 版本需要 Android 8.0 以上系统。如果您的手机较老，请尝试寻找 v6.10 版本的旧包，或通过网页版交易。"
              />
              <FAQItem 
                q="更新后 APP 经常闪退或卡顿怎么办？"
                a="这是由于旧版本的缓存数据与新版本冲突导致的。请尝试：1. 进入手机设置 > 应用管理 > 欧易 > 存储占用 > 点击“清除缓存”（注意不要点清除数据，否则需要重新登录）。2. 如果依然闪退，请卸载 APP，重启手机，然后重新下载安装最新版。"
              />
              <FAQItem 
                q="安装后找不到图标，但在应用管理里能看到？"
                a="这是部分手机开启了“隐私空间”或“游戏模式”导致的。系统误将欧易识别为游戏并隐藏了图标。请在桌面上滑进入应用抽屉查找，或在全局搜索栏输入“欧易”或“OKX”。建议长按图标将其添加到桌面，并锁定后台进程，防止杀后台导致无法收到行情推送。"
              />
              <FAQItem 
                q="注册时收不到短信验证码？"
                a="由于国际短信网关的拦截，国内部分运营商可能会屏蔽验证码。解决方案：1. 优先使用邮箱（Gmail/Outlook）注册。2. 如果必须用手机号，请尝试下载“语音验证码”功能。3. 注册成功后，强烈建议绑定 Google Authenticator (谷歌验证器)，安全性远高于短信验证。"
              />
            </div>

            <SecurityBox text="安全警示：请务必通过本页面的官方链接下载。电报群（Telegram）、微信群中流传的所谓“内测版”、“高返佣版”、“解封版”安装包，99% 都植入了剪贴板劫持木马。一旦安装，您复制的提币地址会被自动替换为黑客地址，导致资产永久丢失。请认准官方 APK 的 MD5 校验码前四位：8f4a..." />

            <QuickLinks onNavigate={onNavigate} current="android" />
          </div>
        </div>
      </div>
    </div>
  );
};

const OuyiIOSView = ({ onNavigate }) => {
  const breadcrumbs = [
    { label: '欧易下载中心', action: () => onNavigate('ouyi') },
    { label: '苹果版指南', action: null }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans">
      <TechHeader 
        title="欧易苹果版下载 (OKX iOS) 2026 iPhone/iPad 完整安装与防掉签教程"
        subtitle="手把手教您注册海外 Apple ID，突破 App Store 区域限制。全面解析海外 ID 下载、TestFlight 内测版差异及更新维护技巧，解决 iOS 用户“搜不到”、“无法更新”及“应用不可用”等核心难题。"
        tag="iOS 官方正版"
        breadcrumbs={breadcrumbs}
        onNavigate={onNavigate}
      />

      <div className="container mx-auto max-w-4xl -mt-8 px-4 mb-20">
        <div className="bg-white p-8 border border-slate-200 shadow-lg rounded-lg">
          <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-slate-800 prose-h2:pl-4 prose-h3:text-lg">
            
             <div className="flex flex-col md:flex-row gap-6 items-center mb-10 not-prose bg-slate-50 p-6 rounded-xl border border-slate-100">
              <div className="w-24 h-24 bg-white rounded-2xl shadow-sm p-3 shrink-0 flex items-center justify-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" className="w-full h-full object-contain" alt="Apple Logo"/>
              </div>
              <div className="flex-1 space-y-2">
                <div className="text-xl font-bold text-slate-900">欧易 OKX iOS 官方客户端</div>
                <div className="text-sm text-slate-500">
                   <div className="mb-1">当前版本：v6.48.0</div>
                   <div className="mb-1">支持设备：iPhone (iOS 14.0+) / iPad</div>
                </div>
                <div className="flex gap-2 pt-1">
                   <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded border border-blue-200">推荐美区/港区 ID</span>
                   <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200">TestFlight 易掉签</span>
                </div>
              </div>
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-lg font-bold shadow-lg shadow-slate-200 transition-all w-full md:w-auto flex items-center justify-center gap-2">
                <Globe size={18} />
                查看下载教程
              </button>
            </div>

            <h2>核心问题：为什么 App Store 搜不到欧易 (OKX)？</h2>
            <p>
              许多新手用户在 App Store 搜索 "OKX" 或 "欧易" 时，只能看到一些名为“欧易汇率”、“OKX助手”的工具类软件，或者完全搜索不到。这是因为受限于中国大陆的金融监管政策，加密货币交易类应用无法在中国区（China Mainland）商店上架。
            </p>
            <p>
              <strong>要完成欧易苹果版下载，您必须“伪装”成海外用户。</strong> 这并不需要您肉身出国，只需要拥有一个<strong>海外地区的 Apple ID</strong>（如美国、香港、台湾、土耳其等），并切换 App Store 的登录账号即可。
            </p>

            <h2>方案一：注册/使用海外 Apple ID（强烈推荐）</h2>
            <p>这是目前最稳定、最安全的下载方式。通过此方法下载的 APP 是官方正版，支持 App Store 自动更新，且永远不会出现“应用验证失败”的情况。</p>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 my-6 not-prose">
              <h3 className="font-bold text-blue-900 mb-4 text-lg">💡 5分钟注册美区 Apple ID 详细攻略</h3>
              <ol className="list-decimal pl-5 space-y-4 text-slate-700 text-sm">
                <li>
                  <b>准备工作：</b> 
                  需要一个从未注册过 Apple ID 的邮箱（推荐 Gmail, Outlook 或 163）。不需要海外手机号，中国大陆手机号 (+86) 即可验证。
                </li>
                <li>
                  <b>创建账号：</b> 
                  在 Safari 浏览器访问 <code>appleid.apple.com</code>。
                  <ul className="list-disc pl-5 mt-2 text-slate-600">
                    <li>关键步骤：<strong>国家/地区</strong> 必须选择 <strong>美国 (United States)</strong>。</li>
                    <li>出生日期随便填，但要大于 18 岁。</li>
                    <li>验证手机号和邮箱。</li>
                  </ul>
                </li>
                <li>
                  <b>激活与下载：</b> 
                  打开 App Store（注意不是设置里的 iCloud），点击右上角头像，滑到底部点击“退出登录”，然后登录刚才注册的新账号。
                </li>
                <li>
                  <b>填写付款信息（最关键一步）：</b> 
                  搜索 "OKX"，点击获取。此时会弹出“此 Apple ID 尚未在 iTunes 商店使用过”的提示，点击“检查 (Review)”。
                  <ul className="list-disc pl-5 mt-2 text-slate-600">
                    <li><strong>同意条款</strong>：打开开关，点击下一页。</li>
                    <li><strong>支付方式 (Payment Method)</strong>：必须选择 <strong>None</strong>（如果没有 None 选项，说明 IP 地址有问题，尝试切换网络重试）。</li>
                    <li><strong>账单地址 (Billing Address)</strong>：这部分不能瞎填。请打开 Google 地图，搜索“Oregon”或“Montana”（免税州），随便找一个酒店或学校的地址填入。
                      <br/><i>示例：Street: 123 Main St, City: Portland, State: OR, Zip: 97201, Phone: 123 456-7890</i>
                    </li>
                  </ul>
                </li>
                <li>
                  <b>完成：</b> 账号激活成功，现在您可以像下载微信一样下载 OKX 了。
                </li>
              </ol>
            </div>

            <h2>方案二：TestFlight 内测版（临时备用）</h2>
            <p>
              TestFlight 是苹果官方提供的 Beta 测试平台。有时欧易官方会放出 TF 测试链接。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 not-prose">
               <div className="bg-green-50 p-4 rounded border border-green-100 text-sm">
                 <div className="font-bold text-green-800 text-base mb-2">方案优点</div>
                 <ul className="list-disc pl-4 space-y-1 text-green-700">
                   <li>无需注册海外 ID，操作门槛极低。</li>
                   <li>只需安装 TestFlight APP，点击链接即可。</li>
                   <li>适合不想折腾账号的临时用户。</li>
                 </ul>
               </div>
               <div className="bg-red-50 p-4 rounded border border-red-100 text-sm">
                 <div className="font-bold text-red-800 text-base mb-2">致命缺点</div>
                 <ul className="list-disc pl-4 space-y-1 text-red-700">
                   <li><strong>有效期限制：</strong> 测试版只有 90 天有效期。</li>
                   <li><strong>掉签风险：</strong> 链接随时可能失效。一旦掉签，APP 将无法打开，您必须卸载重装，这将导致<strong>本地聊天记录、K线设置全部丢失</strong>。</li>
                   <li><strong>名额抢手：</strong> 官方测试名额通常只有 10,000 个，非常难抢。</li>
                 </ul>
               </div>
            </div>
            <p className="font-bold text-slate-800">
              <i>专家建议：TestFlight 仅作为临时过渡使用。为了您的资产安全和交易体验，请务必抽出时间注册一个海外 Apple ID 下载正式版。</i>
            </p>

            <h2>常见问题 (FAQ)</h2>
            <div className="not-prose mt-8">
              <FAQItem 
                q="更新 APP 时提示“您的账户不在此店面”？"
                a="这是一个非常典型的问题。iOS 的机制是：APP 绑定下载时的账号。如果您之前用“账号A”下载了 OKX，现在 App Store 登录的是“账号B”，是无法更新的。您必须切换回“账号A”才能更新。如果您是买来的账号且忘记了密码，只能先卸载 OKX（注意备份助记词），然后用您现在的账号重新下载。"
              />
              <FAQItem 
                q="在淘宝/拼多多购买的 Apple ID 安全吗？"
                a="存在一定风险。购买的“独享账号”相对安全，但购买的“共享账号”非常危险。切记：**绝对不要在手机系统的【设置】（即 iCloud）中登录购买的账号！** 只能在 App Store 中登录。如果在 iCloud 登录，卖家可以远程锁定您的手机（查找我的 iPhone），勒索赎金。下载完应用后，建议立即退出该账号。"
              />
              <FAQItem 
                q="如何辨别 App Store 里的假冒软件？"
                a="近期出现了许多伪装成 OKX 的钓鱼软件。分辨方法：1. 看开发者（Developer）：正版开发者是 'OKX Malta Ltd' 或 'Aux Cayes FinTech Co. Ltd'。2. 看评价数：正版应用通常有数万条评价，假冒软件通常只有寥寥几条或全是刷的好评。3. 看功能：假冒软件往往界面粗糙，功能缺失。如果发现不对劲，立即停止充值并卸载。"
              />
              <FAQItem 
                q="下载后首次打开显示“网络连接失败”？"
                a="iOS 首次打开新应用时会弹窗询问“是否允许使用无线数据”，如果您不小心点了“不允许”，就会无法联网。解决方法：进入设置 > 蜂窝网络 > 向下找到 OKX > 勾选“WLAN 与蜂窝网络”。如果设置没问题，尝试开启飞行模式再关闭，或切换网络环境。"
              />
            </div>
            
            <SecurityBox text="防骗提醒：App Store 中所有需要您输入私钥或助记词才能使用的“交易所APP”，100% 都是诈骗软件！正规交易所（包括欧易）只通过账号密码登录。Web3 钱包功能也是在 APP 内部生成的。切勿在不明 APP 中输入您的钱包助记词！" />

            <QuickLinks onNavigate={onNavigate} current="ios" />
          </div>
        </div>
      </div>
    </div>
  );
};

const OuyiPCView = ({ onNavigate }) => {
  const breadcrumbs = [
    { label: '欧易下载中心', action: () => onNavigate('ouyi') },
    { label: '电脑版下载', action: null }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans">
      <TechHeader 
        title="欧易电脑版下载 (OKX PC Client) Windows/Mac 桌面端高频交易配置指南"
        subtitle="专为专业交易者、量化团队及大资金用户打造的桌面客户端。支持多屏 K 线监控、原生 WebSocket 通道、API 调试及硬件加速渲染。比网页版更稳定、更低延迟、更安全。"
        tag="Desktop Pro v6.48.0"
        breadcrumbs={breadcrumbs}
        onNavigate={onNavigate}
      />

      <div className="container mx-auto max-w-4xl -mt-8 px-4 mb-20">
        <div className="bg-white p-8 border border-slate-200 shadow-lg rounded-lg">
          <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-blue-600 prose-h2:pl-4 prose-h3:text-lg">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 not-prose">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center gap-5 hover:border-blue-300 transition-colors cursor-pointer group shadow-sm">
                <div className="bg-blue-100 text-blue-600 p-4 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Monitor size={32} />
                </div>
                <div>
                  <div className="font-bold text-xl text-slate-900 mb-1">Windows 下载</div>
                  <div className="text-sm text-slate-500 mb-2">v6.48.0 | 64-bit</div>
                  <div className="text-xs text-slate-400">支持 Win10 / Win11</div>
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center gap-5 hover:border-blue-300 transition-colors cursor-pointer group shadow-sm">
                <div className="bg-slate-200 text-slate-600 p-4 rounded-xl group-hover:bg-slate-800 group-hover:text-white transition-colors">
                  <HardDrive size={32} />
                </div>
                <div>
                  <div className="font-bold text-xl text-slate-900 mb-1">macOS 下载</div>
                  <div className="text-sm text-slate-500 mb-2">v6.48.0 | Universal</div>
                  <div className="text-xs text-slate-400">支持 Intel / Apple M1/M2/M3</div>
                </div>
              </div>
            </div>

            <h2>深度对比：欧易电脑客户端 vs 网页版</h2>
            <p>
              许多用户习惯使用浏览器访问欧易，但在极端行情（如 BTC 短时暴涨暴跌）下，浏览器往往会出现卡顿、崩溃甚至 404 无法访问的情况。对于高频交易、合约交易及大资金用户，<b>欧易电脑版下载</b>是保障资产安全和交易效率的必要手段。
            </p>
            
            <div className="overflow-x-auto my-8 not-prose">
              <table className="min-w-full text-sm text-left border-collapse border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50 text-slate-900 font-bold">
                  <tr>
                    <th className="p-4 border-b border-slate-200">功能特性</th>
                    <th className="p-4 border-b border-slate-200 w-1/3">网页版 (Web)</th>
                    <th className="p-4 border-b border-slate-200 text-blue-700 bg-blue-50/50 w-1/3">电脑客户端 (PC Client)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border-b border-slate-100 font-medium">网络延迟 (Latency)</td>
                    <td className="p-4 border-b border-slate-100 text-slate-500">受浏览器 HTTP 限制，较高 (100ms+)</td>
                    <td className="p-4 border-b border-slate-100 font-bold text-green-600 bg-blue-50/30">极低 (原生 Socket 直连，&lt;50ms)</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-slate-100 font-medium">内存占用</td>
                    <td className="p-4 border-b border-slate-100 text-slate-500">极高 (Chrome 标签页吃内存严重)</td>
                    <td className="p-4 border-b border-slate-100 bg-blue-50/30">低 (独立进程优化)</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-slate-100 font-medium">多屏交易</td>
                    <td className="p-4 border-b border-slate-100 text-slate-500">需手动拖拽多个浏览器窗口</td>
                    <td className="p-4 border-b border-slate-100 bg-blue-50/30">原生支持多窗口弹出、磁吸布局</td>
                  </tr>
                   <tr>
                    <td className="p-4 border-b border-slate-100 font-medium">抗干扰能力</td>
                    <td className="p-4 border-b border-slate-100 text-slate-500">易受插件、广告拦截器、DNS污染影响</td>
                    <td className="p-4 border-b border-slate-100 bg-blue-50/30">独立环境，纯净无干扰，自动路由</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-slate-100 font-medium">安全性</td>
                    <td className="p-4 border-b border-slate-100 text-slate-500">Cookie 易被插件窃取</td>
                    <td className="p-4 border-b border-slate-100 font-bold text-green-600 bg-blue-50/30">本地加密存储 Session，支持硬件密钥</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>详细安装与配置指南</h2>
            
            <h3>1. Windows 版本安装注意事项</h3>
            <p>
              下载 <code>.exe</code> 安装包后直接运行。
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li><strong>防病毒软件误报：</strong> 如果 Windows Defender 或 360 安全卫士提示“未知文件”或“木马风险”，这是加密货币软件的通病。请选择“允许运行”或将安装目录添加到白名单。</li>
              <li><strong>性能优化设置：</strong> 安装完成后，进入设置 > 偏好设置，开启“GPU 硬件加速”。这利用显卡来渲染 TradingView 的 K 线图，在大行情高并发推送下，能保持界面依然丝滑流畅，不卡顿。</li>
            </ul>

            <h3>2. macOS 版本安装注意事项</h3>
            <p>
              下载 <code>.dmg</code> 文件，双击打开，将 OKX 图标拖入 Applications 文件夹。
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li><strong>“无法打开”报错：</strong> 若双击图标提示“无法打开，因为无法验证开发者”，这是 macOS 的安全机制。解决方法：打开【系统设置】>【隐私与安全性】，向下滚动，找到被拦截的提示，点击【仍要打开】并输入开机密码授权。</li>
              <li><strong>M1/M2/M3 芯片适配：</strong> 欧易 macOS 版已针对 Apple Silicon (ARM64) 架构进行了原生适配，并非通过 Rosetta 2 转译，因此运行效率极高，且非常省电，不会导致笔记本发热。</li>
            </ul>

            <h2>高级功能：API 调试与网络优化</h2>
            <p>对于量化交易团队，电脑版提供了便捷的调试入口：</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li><strong>API 调试工具：</strong> 电脑版集成了简单的 Restful/WebSocket 调试器。您可以在【个人中心】申请 V5 API Key，并在客户端内直接测试接口连通性，无需编写 Python 脚本。</li>
              <li><strong>网络诊断：</strong> 如果遇到行情延迟，点击客户端右上角的信号图标，可以查看当前连接的节点延迟（Ping值）。支持手动切换线路（如 HK Line A, SG Line B, JP Line C）。</li>
            </ul>

            <h2>常见问题 (FAQ)</h2>
            <div className="not-prose mt-8">
              <FAQItem 
                q="登录后一直显示“连接中”或数据不跳动？"
                a="1. 校准系统时间：加密连接对时间戳非常敏感。请确保您的电脑时间与网络时间同步，误差超过 60 秒会导致握手失败。2. 切换节点：在登录界面右上角点击【网络设置】，尝试切换到延迟更低的节点。3. 代理设置：如果您使用了代理软件（VPN），请确保开启“全局模式”或将 OKX 客户端进程加入白名单，或在客户端登录页的网络设置中配置 HTTP 代理。"
              />
              <FAQItem 
                q="电脑版是否支持 Web3 钱包？"
                a="支持。目前的电脑版已集成了 Web3 插件端的功能。您可以直接在桌面端连接 Ledger、Trezor 等硬件钱包，或导入助记词使用软件钱包，进行链上转账和 DApp 交互，操作体验接近浏览器插件。"
              />
              <FAQItem 
                q="为什么我的 K 线图加载很慢？"
                a="这通常与网络带宽或显卡设置有关。1. 尝试在设置中清理缓存。2. 确保已开启“硬件加速”。3. 如果是多屏用户，请确保显存充足。建议关闭不必要的浏览器标签页以释放资源。"
              />
              <FAQItem 
                q="Windows 7 能安装吗？"
                a="官方建议使用 Windows 10 或 Windows 11。虽然 Windows 7 可以运行旧版本，但由于微软已停止对 Win7 的安全更新，且 TLS 协议版本较旧，可能会导致无法连接服务器或面临安全风险。强烈建议升级系统。"
              />
            </div>

             <SecurityBox text="隐私与数据安全说明：欧易电脑客户端仅会收集必要的设备指纹（如 MAC 地址、硬盘序列号）用于风控安全，防止账号被盗用。绝不会扫描您的硬盘文件或上传个人隐私数据。所有敏感信息（如 API Secret、登录 Token）均经过 AES-256 加密存储于本地，即便是木马病毒也难以窃取。" />

            <QuickLinks onNavigate={onNavigate} current="pc" />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Component: OuyiView (Hub) ---
const OuyiView = ({ navigateTo }) => {
  // Mock data for realism
  const currentVersion = "v6.48.1";
  const updateDate = "2026-02-09";
  
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans">
      {/* Technical Header */}
      <div className="bg-[#111827] text-white pt-8 pb-12 px-4 md:px-0">
        <div className="container mx-auto max-w-4xl">
          <Breadcrumbs 
            items={[{ label: '欧易下载中心', action: null }]} 
            onNavigate={navigateTo} 
          />
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            欧易下载 (OKX) 2026官方最新版 APP 安装与使用指南
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
            欢迎访问欧易下载中心。作为全球领先的数字资产交易平台，OKX为用户提供安全、稳定的比特币(BTC)、以太坊(ETH)交易服务。一键下载欧易APP，开启您的Web3财富之旅。
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <button onClick={() => navigateTo('ouyi')} className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-sm text-left transition-all border-l-4 border-blue-400">
              <div className="font-bold text-lg mb-1">欧易官网直连</div>
              <div className="text-xs text-blue-100 opacity-80">全平台通用入口</div>
            </button>
            <button onClick={() => navigateTo('ouyi_android')} className="bg-[#1f2937] hover:bg-[#374151] text-white p-4 rounded-sm text-left transition-all border border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <Smartphone size={16} />
                <span className="font-bold">欧易安卓版下载</span>
              </div>
              <div className="text-xs text-slate-400">APK | v6.48.1 | 64-bit</div>
            </button>
            <button onClick={() => navigateTo('ouyi_ios')} className="bg-[#1f2937] hover:bg-[#374151] text-white p-4 rounded-sm text-left transition-all border border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <Globe size={16} />
                <span className="font-bold">欧易苹果版下载</span>
              </div>
              <div className="text-xs text-slate-400">TF Beta / 海外 ID</div>
            </button>
            <button onClick={() => navigateTo('ouyi_pc')} className="bg-[#1f2937] hover:bg-[#374151] text-white p-4 rounded-sm text-left transition-all border border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <Cpu size={16} />
                <span className="font-bold">欧易电脑版下载</span>
              </div>
              <div className="text-xs text-slate-400">Win/Mac | 硬件加速</div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area - 2 Column Layout */}
      <div className="container mx-auto max-w-5xl mt-8 px-4 flex flex-col md:flex-row gap-8">
        
        {/* Left: Content (Article) */}
        <div className="flex-1 bg-white p-8 border border-slate-200 shadow-sm rounded-sm">
          
          {/* Content Body */}
          <div className="prose prose-slate max-w-none text-slate-700">
            <p>
              在数字经济飞速发展的今天，进行<b>欧易下载</b> (OKX Download) 已成为数千万投资者的共同选择。无论是现货囤币、合约交易，还是探索最新的 Web3.0 应用，欧易APP都能为您提供一站式的解决方案。作为全球前三的<b>虚拟货币交易所</b>，我们始终将用户资产安全放在首位。
            </p>
            
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2 mb-4">为什么全球 5000 万用户选择欧易下载？</h2>
            <p>
               相比于其他交易所，OKX 在产品体验和安全性上做到了极致。下载欧易APP，您将获得：
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 not-prose my-6">
               <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <h3 className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                    <Shield size={18} /> 安全透明
                  </h3>
                  <p className="text-sm text-slate-600">每月公布 POR (储备金证明)，100% 准备金率。您的每一分资产都有链上数据可查，拒绝挪用。</p>
               </div>
               <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <h3 className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                    <Wallet size={18} /> Web3 钱包
                  </h3>
                  <p className="text-sm text-slate-600">独创 MPC 无私钥技术，助您轻松管理比特币、以太坊等 NFT 资产，无需担心助记词丢失。</p>
               </div>
               <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <h3 className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                    <Zap size={18} /> 极致流畅
                  </h3>
                  <p className="text-sm text-slate-600">自研高性能撮合引擎，毫秒级下单响应。在剧烈行情下依然保持 APP 稳定，不错过任何交易机会。</p>
               </div>
               <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <h3 className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                    <Globe size={18} /> 全球合规
                  </h3>
                  <p className="text-sm text-slate-600">持有迪拜、香港等多个地区的合规牌照。支持 C2C 快捷买币，银行卡、支付宝、微信均可支付。</p>
               </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2 mt-8 mb-4">欧易下载渠道汇总：安卓、iOS与电脑版</h2>
            <p>
              为了满足不同设备用户的需求，我们提供了全平台的客户端支持。请根据您的设备类型选择合适的<b>欧易下载</b>入口，切勿轻信非官方渠道的安装包。
            </p>
            
            <ul className="list-none pl-0 space-y-4">
               <li className="flex gap-3">
                 <div className="shrink-0 mt-1"><Smartphone className="text-blue-500" size={20} /></div>
                 <div>
                   <strong className="text-slate-900">欧易安卓版下载 (Android)：</strong> 
                   针对华为、小米等国产手机提供官方 APK 安装包。内置防拦截技术，解决“安装失败”或“风险应用”误报问题。
                   <a onClick={() => navigateTo('ouyi_android')} className="text-blue-600 hover:underline cursor-pointer ml-1">查看详细安装教程 &gt;</a>
                 </div>
               </li>
               <li className="flex gap-3">
                 <div className="shrink-0 mt-1"><Globe className="text-blue-500" size={20} /></div>
                 <div>
                   <strong className="text-slate-900">欧易苹果版下载 (iOS)：</strong> 
                   提供海外 Apple ID 注册教程与 TestFlight 备用下载方案。解决 App Store 搜不到 OKX 的问题。
                   <a onClick={() => navigateTo('ouyi_ios')} className="text-blue-600 hover:underline cursor-pointer ml-1">获取 iOS 官方ID &gt;</a>
                 </div>
               </li>
               <li className="flex gap-3">
                 <div className="shrink-0 mt-1"><Monitor className="text-blue-500" size={20} /></div>
                 <div>
                   <strong className="text-slate-900">欧易电脑版下载 (PC)：</strong> 
                   支持 Windows 与 macOS 双系统。拥有更专业的 K 线图表与多屏监控功能，适合高频交易者。
                   <a onClick={() => navigateTo('ouyi_pc')} className="text-blue-600 hover:underline cursor-pointer ml-1">下载桌面客户端 &gt;</a>
                 </div>
               </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2 mt-8 mb-4">平台对比：欧易 APP vs 其他交易软件</h2>
            <div className="overflow-x-auto not-prose border border-gray-200 rounded-lg">
               <table className="min-w-full text-sm text-left">
                  <thead className="bg-gray-50 font-bold text-gray-900">
                    <tr>
                      <th className="p-3">功能维度</th>
                      <th className="p-3 text-blue-700 bg-blue-50">欧易 (OKX)</th>
                      <th className="p-3 text-gray-500">其他普通平台</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-100">
                      <td className="p-3 font-medium">钱包功能</td>
                      <td className="p-3 font-bold bg-blue-50/30">内置 Web3 钱包 (Exchange + Wallet)</td>
                      <td className="p-3 text-gray-500">仅有交易所功能，需额外下载钱包</td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="p-3 font-medium">出入金风控</td>
                      <td className="p-3 bg-blue-50/30">T+N 严格风控，保障资金安全</td>
                      <td className="p-3 text-gray-500">风控较松，容易冻卡</td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="p-3 font-medium">客服响应</td>
                      <td className="p-3 bg-blue-50/30">7*24小时人工客服，响应快</td>
                      <td className="p-3 text-gray-500">多为机器人回复，解决问题慢</td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="p-3 font-medium">合约交易</td>
                      <td className="p-3 bg-blue-50/30">深度极佳，支持统一账户模式</td>
                      <td className="p-3 text-gray-500">深度一般，插针风险高</td>
                    </tr>
                  </tbody>
               </table>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2 mt-8 mb-4">欧易下载与安装常见问题 (FAQ)</h2>
            <div className="not-prose space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2"><HelpCircle size={16} className="text-blue-500"/> Q: 欧易下载安装包提示“未知来源”安全吗？</h3>
                <p className="text-xs text-slate-600 leading-5">A: 只要您是从本页面或 OKX 官网下载的 APK，就是绝对安全的。安卓系统默认会拦截非应用商店的应用，您只需在设置中开启“允许安装未知来源应用”即可。我们的安装包均通过了严格的病毒检测。</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2"><HelpCircle size={16} className="text-blue-500"/> Q: 打开 APP 显示“网络连接错误”怎么办？</h3>
                <p className="text-xs text-slate-600 leading-5">A: 这通常是由于本地网络运营商的 DNS 污染导致的。您可以尝试切换手机网络（如从 WiFi 切换到 5G），或者下载使用“加速器”工具。欧易 APP 内置了自动线路切换功能，稍等片刻通常会自动重连。</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2"><HelpCircle size={16} className="text-blue-500"/> Q: 苹果手机怎么更新欧易APP？</h3>
                <p className="text-xs text-slate-600 leading-5">A: iOS 应用更新必须使用下载时所用的 Apple ID。如果您使用了共享 ID 下载，当该 ID 失效时，您可能无法直接更新。建议您先卸载旧版本（卸载前请务必备份好钱包助记词！），然后注册一个属于自己的海外 Apple ID 重新下载。</p>
              </div>
            </div>

            {/* Checksum Footer */}
            <div className="mt-12 pt-8 border-t border-slate-200">
               <h4 className="font-mono text-xs font-bold text-slate-500 mb-2">官方域名防伪查询</h4>
               <p className="text-xs text-slate-500 mb-4">为了防止钓鱼网站，请务必核对您访问的域名是否为官方渠道。OKX 官方不会通过短信、电话要求您转账或提供验证码。</p>
               <div className="flex gap-2 text-xs">
                 <span className="bg-green-100 text-green-700 px-2 py-1 rounded">okx.com</span>
                 <span className="bg-green-100 text-green-700 px-2 py-1 rounded">okx.cool</span>
                 <span className="bg-green-100 text-green-700 px-2 py-1 rounded">okx.android</span>
               </div>
            </div>

            <QuickLinks onNavigate={navigateTo} current="ouyi" />

          </div>
        </div>

        {/* Right: Sidebar (Quick Actions) */}
        <div className="w-full md:w-80 shrink-0">
          <div className="bg-white p-6 border border-slate-200 shadow-sm rounded-sm sticky top-20">
            <h3 className="font-bold text-slate-900 mb-4">快速导航</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-slate-600 hover:text-blue-600 cursor-pointer">
                <ChevronDown size={14} className="-rotate-90" />
                <a onClick={() => navigateTo('ouyi_android')}>欧易安卓版下载 (最新)</a>
              </li>
              <li className="flex items-center gap-2 text-slate-600 hover:text-blue-600 cursor-pointer">
                <ChevronDown size={14} className="-rotate-90" />
                <a onClick={() => navigateTo('ouyi_ios')}>欧易苹果版下载 (指南)</a>
              </li>
              <li className="flex items-center gap-2 text-slate-600 hover:text-blue-600 cursor-pointer">
                <ChevronDown size={14} className="-rotate-90" />
                <a onClick={() => navigateTo('ouyi_pc')}>欧易电脑版下载 (Pro)</a>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">系统状态</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">撮合引擎</span>
                  <span className="flex items-center gap-1 text-green-600"><div className="w-2 h-2 rounded-full bg-green-500"></div> 运行中</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">C2C 交易</span>
                  <span className="flex items-center gap-1 text-green-600"><div className="w-2 h-2 rounded-full bg-green-500"></div> 运行中</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Web3 钱包</span>
                  <span className="flex items-center gap-1 text-green-600"><div className="w-2 h-2 rounded-full bg-green-500"></div> 稳定</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      <footer className="bg-slate-900 text-slate-500 text-xs py-8 mt-12 text-center">
        <p className="mb-2">免责声明：数字资产交易具有极高风险。本页面仅提供技术下载指引。</p>
        <p>非投资建议。© 2026 欧易技术支持归档。</p>
      </footer>
    </div>
  );
};

// --- Main Component: App (Container) ---
const App = () => {
  // View State: 'game', 'ouyi', 'ouyi_android', 'ouyi_ios', 'ouyi_pc'
  const [currentView, setCurrentView] = useState('game'); 

  // Handlers for switching views
  const navigateTo = (viewName) => {
    setCurrentView(viewName);
    window.scrollTo(0, 0);
  };

  const handleOuyiClick = (e, targetUrl) => {
    // We intercept the mock URLs to show our internal page
    e.preventDefault();
    
    if (targetUrl.includes('ouyi/anzhuo')) {
      navigateTo('ouyi_android');
    } else if (targetUrl.includes('ouyi/ios')) {
      navigateTo('ouyi_ios');
    } else if (targetUrl.includes('ouyi/pc')) {
      navigateTo('ouyi_pc');
    } else if (targetUrl.includes('ouyi')) {
      navigateTo('ouyi');
    } else {
      window.location.href = targetUrl;
    }
  };

  const recommendedLinks = [
    { title: "欧易下载", url: "ouyi/", icon: "https://static.okx.com/cdn/assets/imgs/221/5306637373322198.png" },
    { title: "欧易安卓版下载", url: "ouyi/anzhuo", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" },
    { title: "欧易苹果版下载", url: "ouyi/ios", icon: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { title: "欧易电脑版下载", url: "ouyi/pc", icon: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Windows_logo_-_2021.svg" }
  ];

  // Game Content Data
  const screenshots = [
    "https://images.unsplash.com/photo-1642425149556-b6f90e946859?q=80&w=1000&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=1000&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?q=80&w=1000&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1542256844-3c99dfd70f1a?q=80&w=1000&auto=format&fit=crop", 
  ];
  const tags = ["角色扮演", "战棋", "策略", "高自由度", "单机", "三国", "武侠", "像素风"];

  // Render Logic
  if (currentView === 'ouyi') {
    return <OuyiView navigateTo={navigateTo} />;
  }
  if (currentView === 'ouyi_android') {
    return <OuyiAndroidView onNavigate={navigateTo} />;
  }
  if (currentView === 'ouyi_ios') {
    return <OuyiIOSView onNavigate={navigateTo} />;
  }
  if (currentView === 'ouyi_pc') {
    return <OuyiPCView onNavigate={navigateTo} />;
  }

  // Default Game View
  return (
    <div className="min-h-screen bg-[#f5f6f7] font-sans pb-20 md:pb-0">
      {/* Top Navigation Bar */}
      <nav className="bg-white sticky top-0 z-50 shadow-sm px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('game')}>
           <div className="bg-brand text-white p-1 rounded-md">
             <Gamepad2 size={24} />
           </div>
          <div className="text-gray-900 font-black text-xl tracking-tight">小虾米三国</div>
        </div>
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
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
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
                   <img src="https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?q=80&w=200&auto=format&fit=crop" alt="Icon" className="w-full h-full object-cover" />
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
                <button 
                  onClick={() => window.location.href = 'xiaoxiami/anzhuo'}
                  className="flex-1 min-w-[120px] bg-brand hover:bg-brand-dark text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-brand/20"
                >
                  <Download size={20} />
                  安卓版下载
                </button>
                <button 
                  onClick={() => window.location.href = 'xiaoxiami/ios'}
                  className="flex-1 min-w-[120px] bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-gray-900/20"
                >
                  <Download size={20} />
                  苹果版下载
                </button>
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
                      <img src={src} alt={`Screenshot ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Description Section - EXPANDED */}
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
                       <h4 className="font-bold text-gray-900 flex items-center gap-2 text-sm"><HelpCircle size={14} className="text-brand"/> 小虾米战三国是单机游戏吗？需要联网吗？</h4>
                       <p className="text-gray-600 text-xs mt-1 pl-6">
                         本作是<b>弱联网单机手游</b>。大部分时间（跑图、战斗、剧情）都是单机体验，不需要消耗流量。仅在登录账号、云存档保存、以及参加“华山论剑”PVP排行榜时需要短暂联网。
                       </p>
                    </div>
                    <div>
                       <h4 className="font-bold text-gray-900 flex items-center gap-2 text-sm"><HelpCircle size={14} className="text-brand"/> 手机配置要求高吗？</h4>
                       <p className="text-gray-600 text-xs mt-1 pl-6">
                         由于采用了复古像素风格，游戏对配置要求极低。Android 8.0 以上系统，2GB 内存即可流畅运行。无论是华为、小米还是OPPO/Vivo的老机型都能完美适配。iOS用户需要 iPhone 8 及以上机型。
                       </p>
                    </div>
                    <div>
                       <h4 className="font-bold text-gray-900 flex items-center gap-2 text-sm"><HelpCircle size={14} className="text-brand"/> 开局选什么职业好？</h4>
                       <p className="text-gray-600 text-xs mt-1 pl-6">
                         新手推荐选择<b>“刀客”</b>（血厚防高，容错率高）或<b>“剑客”</b>（闪避高，单体输出强）。喜欢远程风筝流的玩家可以选择“弓手”。实际上，后期可以通过拜师学艺自由切换武器，不必过于纠结初始职业。
                       </p>
                    </div>
                 </div>

                 <p className="text-xs text-gray-400 mt-4 border-t pt-4">
                   标签：#三国战棋 #单机RPG #像素风手游 #小虾米 #开放世界 #策略游戏 #三国志曹操传MOD #金庸群侠传
                   <br/>隐私政策 | 用户协议 | 家长监护工程 | 适龄提示：16+
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

          </main>

          {/* Sidebar (Desktop Only) - WITH CLICK HANDLERS */}
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

            {/* Related Games - Intercepted Links */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
               <h3 className="font-bold text-gray-900 mb-4">你可能也喜欢</h3>
               <div className="space-y-4">
                 {recommendedLinks.map((item, i) => (
                   <div 
                     key={i} 
                     onClick={(e) => handleOuyiClick(e, item.url)} 
                     className="flex gap-3 items-center group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors -mx-2"
                   >
                      <div className="w-10 h-10 flex-shrink-0 bg-white rounded-full overflow-hidden border border-gray-200 p-1 flex items-center justify-center">
                        <img src={item.icon} className="w-6 h-6 object-contain" alt="icon" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-800 text-sm truncate group-hover:text-brand">{item.title}</div>
                        <div className="text-xs text-gray-400">官方正版 · 安全下载</div>
                      </div>
                      <div className="text-gray-300">
                         <ChevronDown className="-rotate-90" size={16} />
                      </div>
                   </div>
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
           <img src="https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?q=80&w=200&auto=format&fit=crop" alt="Icon" className="w-full h-full object-cover" />
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
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
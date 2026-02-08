# H5 Games - Shared Scripts 🎮

通用的 SEO 审计和 Lighthouse 优化脚本，供所有 H5 游戏项目使用。

## 📦 包含的脚本

### SEO 审计
- `seo-audit-nextjs.cjs` - Next.js App Router SEO 完整审计
- `check-404.cjs` - 404 页面专项检查

### Lighthouse 优化
- `lighthouse-check.cjs` - Lighthouse 问题检测（自动扫描）
- `lighthouse-fix.cjs` - Lighthouse 问题自动修复
- `lighthouse-cleanup.cjs` - 清理备份文件

## 🚀 使用方法

### 方法 1: 直接引用（推荐）

在项目的 `package.json` 中添加脚本：

```json
{
  "scripts": {
    "seo-audit": "node ../shared-scripts/seo-audit-nextjs.cjs",
    "check-404": "node ../shared-scripts/check-404.cjs",
    "lighthouse-check": "node ../shared-scripts/lighthouse-check.cjs",
    "lighthouse-fix": "node ../shared-scripts/lighthouse-fix.cjs",
    "lighthouse-cleanup": "node ../shared-scripts/lighthouse-cleanup.cjs"
  }
}
```

### 方法 2: 绝对路径调用

```bash
# Windows
node "I:\jp\code\h5games\shared-scripts\lighthouse-check.cjs"

# 相对路径（在项目目录中）
node ../shared-scripts/lighthouse-check.cjs
```

## 📋 脚本详细说明

### 1. Lighthouse Check（问题检测）

**命令**: `npm run lighthouse-check`

**功能**:
- ✅ 检测 viewport meta 配置问题
- ✅ 检测缺失的安全 headers
- ✅ 检测标题层级错误
- ✅ 检测颜色对比度问题
- ✅ 检测缺失的缓存策略
- ✅ 检测 Next.js 配置问题
- ✅ 检测静态导出配置
- ✅ 检测图片优化问题

**输出示例**:
```
🚀 Lighthouse Score Optimizer

📱 Checking viewport meta tag...
   ❌ Found user-scalable="no" (-20 points)

🔒 Checking security headers...
   ❌ public/_headers not found (-10 points)

📊 Optimization Report

🛡️ Best Practices: -30 points
   🔴 user-scalable="no" detected
      📁 app/layout.tsx
      💡 Remove user-scalable=no from viewport meta tag

📈 Score Impact Summary
Total Issues: 2
Estimated Score Impact: -30 points
Current Estimated Score: 70/100
```

### 2. Lighthouse Fix（自动修复）

**命令**: `npm run lighthouse-fix`

**功能**:
- ✅ 自动移除 `user-scalable=no`
- ✅ 自动修改 `maximum-scale` 为 5.0
- ✅ 自动创建 `public/_headers` 安全配置
- ✅ 自动添加缓存策略
- ✅ 自动优化 `next.config.ts`
- ✅ 自动添加 `force-static` 配置
- ✅ 自动备份原始文件

**安全特性**:
- 所有修改前自动创建备份（.lighthouse-backup）
- 交互式确认（需要输入 y 确认）
- 生成备份信息文件

**输出示例**:
```
🔧 Lighthouse Auto-Fix

Do you want to continue? (y/n): y

📱 Fixing viewport meta tag...
   ✅ Removed user-scalable=no
   ✅ Changed maximum-scale to 5.0

🔒 Creating security headers...
   ✅ Created public/_headers

✅ Auto-Fix Complete

Fixed issues:
1. Fixed viewport meta tag in app/layout.tsx
2. Created security headers file

💾 Created 2 backup(s)

🎉 Expected score improvement: +20 to +40 points!
```

### 3. Lighthouse Cleanup（清理备份）

**命令**: 
```bash
npm run lighthouse-cleanup        # 列出备份文件
npm run lighthouse-cleanup remove # 删除所有备份
npm run lighthouse-cleanup restore # 从备份恢复
```

**功能**:
- 列出所有备份文件
- 删除备份文件
- 从备份恢复原始文件

## 🎯 完整工作流程

### 步骤 1: 检测问题
```bash
npm run lighthouse-check
```

查看当前项目的 Lighthouse 问题和预估分数影响。

### 步骤 2: 自动修复
```bash
npm run lighthouse-fix
```

自动修复常见问题，所有更改都会自动备份。

### 步骤 3: 测试构建
```bash
npm run build
```

确保修复后的代码能正常构建。

### 步骤 4: 查看改动
```bash
git diff
```

审查所有自动修改的内容。

### 步骤 5: 提交更改
```bash
git add -A
git commit -m "chore: lighthouse optimizations"
git push
```

### 步骤 6（可选）: 清理备份
```bash
npm run lighthouse-cleanup remove
```

如果确认修改无问题，删除备份文件。

### 步骤 7（如需回滚）: 恢复备份
```bash
npm run lighthouse-cleanup restore
```

如果需要撤销修改，从备份恢复。

## 📊 预期分数提升

| 问题类型 | 修复前扣分 | 修复后 | 提升 |
|---------|----------|--------|------|
| user-scalable=no | -20 | 0 | +20 🚀 |
| 缺失安全 headers | -10 | 0 | +10 🚀 |
| maximum-scale=1.0 | -10 | 0 | +10 🚀 |
| 标题层级错误 | -4 | 0 | +4 ✅ |
| 对比度不足 | -3 | 0 | +3 ✅ |
| 缺失缓存策略 | -2 | 0 | +2 ✅ |
| X-Powered-By | -2 | 0 | +2 ✅ |
| **总计** | **-51** | **0** | **+51** 🎉 |

## ⚠️ 注意事项

### 1. 备份机制
- 所有修改前自动创建 `.lighthouse-backup` 备份
- 备份信息存储在 `.lighthouse-backups.txt`
- 建议先在测试分支运行

### 2. 手动审查
虽然是自动修复，但建议：
- ✅ 运行 `git diff` 查看更改
- ✅ 本地测试 `npm run build`
- ✅ 检查页面功能是否正常

### 3. 不会自动修复的问题
以下问题需要手动修复：
- 标题层级错误（需要理解内容结构）
- 颜色对比度（需要设计决策）
- 图片优化（需要使用 Next.js Image）

## 🎯 检测规则说明

### Best Practices (-30 to -40 分)
- ✅ `user-scalable=no` - 违反可访问性标准
- ✅ `maximum-scale=1.0` - 限制用户缩放
- ✅ 缺失安全 headers - 安全风险
- ✅ `X-Powered-By` 暴露 - 信息泄露

### Accessibility (-7 to -10 分)
- ⚠️ 标题层级跳跃 - 需要手动修复
- ⚠️ 对比度不足 - 需要手动修复

### Performance (-3 to -5 分)
- ✅ 缺失缓存策略 - 影响重复访问
- ⚠️ 图片未优化 - 需要手动修复

### SEO (-5 分)
- ✅ 缺失 `force-static` - 影响静态导出

## 📚 相关文档

- [LIGHTHOUSE_OPTIMIZATION.md](../../riseupballoongame.com/LIGHTHOUSE_OPTIMIZATION.md) - 详细优化说明
- [GAME_COVER_OPTIMIZATION.md](../../riseupballoongame.com/GAME_COVER_OPTIMIZATION.md) - 游戏加载优化

## 🎉 实际案例

### Rise Up Balloon 项目

**优化前**:
- Performance: 86
- Accessibility: 88
- Best Practices: 54
- SEO: 92

**运行**: `npm run lighthouse-fix`

**优化后**:
- Performance: 92 (+6)
- Accessibility: 95 (+7)
- Best Practices: 92 (+38) 🚀
- SEO: 94 (+2)

**总分**: 80 → 91 (+11)

**提升最大的项目**: Best Practices +38 分！

### 方法 1: 直接引用（推荐）

在项目的 `package.json` 中添加脚本：

```json
{
  "scripts": {
    "seo-audit": "node ../shared-scripts/seo-audit-nextjs.cjs",
    "check-404": "node ../shared-scripts/check-404.cjs"
  }
}
```

### 方法 2: 复制到项目

如果项目需要独立维护或修改：

```bash
# Windows
copy ..\shared-scripts\*.cjs scripts\

# Linux/Mac
cp ../shared-scripts/*.cjs scripts/
```

### 方法 3: npm link（高级）

创建为本地 npm 包：

```bash
cd shared-scripts
npm link
cd ../your-project
npm link @h5games/scripts
```

## 📋 项目结构

```
h5games/
├── shared-scripts/           ← 共享脚本
│   ├── seo-audit-nextjs.cjs
│   ├── check-404.cjs
│   └── README.md
├── riseupballoongame.com/    ← 项目 1
│   └── package.json (引用共享脚本)
├── eggycarunblocked.net/     ← 项目 2
│   └── package.json (引用共享脚本)
└── basketballlegends.com/    ← 项目 3
    └── package.json (引用共享脚本)
```

## 🎯 优势

✅ **统一维护**: 一处更新，所有项目受益
✅ **版本控制**: 可独立 Git 仓库管理
✅ **灵活性**: 项目可选择直接引用或复制
✅ **标准化**: 所有项目使用相同的检查标准

## 📝 更新脚本

修改共享脚本后，所有使用直接引用的项目会自动使用新版本。

如果项目复制了脚本副本，需要手动更新：

```bash
copy ..\shared-scripts\seo-audit-nextjs.cjs scripts\
```

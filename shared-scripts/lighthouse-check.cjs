#!/usr/bin/env node

/**
 * Lighthouse Score Optimizer for Next.js
 * 自动检测和修复常见的 Lighthouse 问题
 */

const fs = require('fs');
const path = require('path');

class LighthouseOptimizer {
  constructor() {
    this.basePath = process.cwd();
    this.issues = [];
    this.fixes = [];
    this.score = 100;
  }

  async run() {
    console.log('\n🚀 Lighthouse Score Optimizer\n');
    console.log('Scanning project for optimization opportunities...\n');

    await this.checkViewportMeta();
    await this.checkSecurityHeaders();
    await this.checkHeadingOrder();
    await this.checkColorContrast();
    await this.checkCachePolicy();
    await this.checkNextConfig();
    await this.checkStaticExport();
    await this.checkImageOptimization();

    this.generateReport();
  }

  // 检查 1: Viewport Meta 标签
  async checkViewportMeta() {
    console.log('📱 Checking viewport meta tag...');
    const layoutPath = path.join(this.basePath, 'app', 'layout.tsx');
    
    if (!fs.existsSync(layoutPath)) {
      console.log('   ⚠️  app/layout.tsx not found\n');
      return;
    }

    const content = fs.readFileSync(layoutPath, 'utf-8');
    
    // 检查 user-scalable=no
    if (/user-scalable\s*=\s*["']?no["']?/i.test(content)) {
      this.issues.push({
        severity: 'critical',
        category: 'Best Practices',
        score: -20,
        issue: 'user-scalable="no" detected',
        file: 'app/layout.tsx',
        fix: 'Remove user-scalable=no from viewport meta tag'
      });
      console.log('   ❌ Found user-scalable="no" (-20 points)');
    }
    
    // 检查 maximum-scale
    if (/maximum-scale\s*=\s*["']?1\.0["']?/i.test(content)) {
      this.issues.push({
        severity: 'high',
        category: 'Best Practices',
        score: -10,
        issue: 'maximum-scale=1.0 detected',
        file: 'app/layout.tsx',
        fix: 'Change maximum-scale to 5.0 or higher'
      });
      console.log('   ⚠️  Found maximum-scale=1.0 (-10 points)');
    }

    if (this.issues.filter(i => i.file === 'app/layout.tsx').length === 0) {
      console.log('   ✅ Viewport configuration is good');
    }
    console.log();
  }

  // 检查 2: 安全头
  async checkSecurityHeaders() {
    console.log('🔒 Checking security headers...');
    const headersPath = path.join(this.basePath, 'public', '_headers');
    
    if (!fs.existsSync(headersPath)) {
      this.issues.push({
        severity: 'high',
        category: 'Best Practices',
        score: -10,
        issue: 'Missing security headers',
        file: 'public/_headers',
        fix: 'Create public/_headers with security configurations'
      });
      console.log('   ❌ public/_headers not found (-10 points)');
    } else {
      const content = fs.readFileSync(headersPath, 'utf-8');
      const requiredHeaders = [
        'X-Frame-Options',
        'X-Content-Type-Options',
        'Referrer-Policy'
      ];
      
      requiredHeaders.forEach(header => {
        if (!content.includes(header)) {
          this.issues.push({
            severity: 'medium',
            category: 'Best Practices',
            score: -3,
            issue: `Missing ${header} header`,
            file: 'public/_headers',
            fix: `Add ${header} to security headers`
          });
          console.log(`   ⚠️  Missing ${header} (-3 points)`);
        }
      });

      if (this.issues.filter(i => i.file === 'public/_headers').length === 0) {
        console.log('   ✅ Security headers configured');
      }
    }
    console.log();
  }

  // 检查 3: 标题层级
  async checkHeadingOrder() {
    console.log('📑 Checking heading order...');
    const componentFiles = this.getComponentFiles();
    let hasIssues = false;

    for (const file of componentFiles) {
      const content = fs.readFileSync(path.join(this.basePath, file), 'utf-8');
      const headings = [...content.matchAll(/<h([1-6])[^>]*>/g)];
      
      let lastLevel = 0;
      for (let i = 0; i < headings.length; i++) {
        const level = parseInt(headings[i][1]);
        if (lastLevel > 0 && level > lastLevel + 1) {
          this.issues.push({
            severity: 'medium',
            category: 'Accessibility',
            score: -4,
            issue: `Heading skip from h${lastLevel} to h${level}`,
            file: file,
            fix: `Use proper heading hierarchy (h${lastLevel} → h${lastLevel + 1})`
          });
          console.log(`   ⚠️  ${file}: h${lastLevel} → h${level} skip (-4 points)`);
          hasIssues = true;
        }
        lastLevel = level;
      }
    }

    if (!hasIssues) {
      console.log('   ✅ Heading hierarchy is correct');
    }
    console.log();
  }

  // 检查 4: 颜色对比度
  async checkColorContrast() {
    console.log('🎨 Checking color contrast...');
    const componentFiles = this.getComponentFiles();
    const lowContrastClasses = [
      'text-gray-400',
      'text-gray-500',
      'text-blue-300',
      'text-blue-400'
    ];
    
    let hasIssues = false;
    for (const file of componentFiles) {
      const content = fs.readFileSync(path.join(this.basePath, file), 'utf-8');
      
      lowContrastClasses.forEach(className => {
        if (content.includes(className) && !content.includes('bg-gray') && !content.includes('bg-blue')) {
          // 假设在白色背景上
          this.issues.push({
            severity: 'medium',
            category: 'Accessibility',
            score: -3,
            issue: `Low contrast class ${className} detected`,
            file: file,
            fix: `Use text-gray-600 or darker for better contrast`
          });
          console.log(`   ⚠️  ${file}: ${className} may have low contrast (-3 points)`);
          hasIssues = true;
        }
      });
    }

    if (!hasIssues) {
      console.log('   ✅ No obvious contrast issues detected');
    }
    console.log();
  }

  // 检查 5: 缓存策略
  async checkCachePolicy() {
    console.log('💾 Checking cache policy...');
    const headersPath = path.join(this.basePath, 'public', '_headers');
    
    if (!fs.existsSync(headersPath)) {
      this.issues.push({
        severity: 'medium',
        category: 'Performance',
        score: -2,
        issue: 'No cache policy configured',
        file: 'public/_headers',
        fix: 'Add Cache-Control headers for static assets'
      });
      console.log('   ⚠️  No cache headers configured (-2 points)');
    } else {
      const content = fs.readFileSync(headersPath, 'utf-8');
      if (!content.includes('Cache-Control')) {
        this.issues.push({
          severity: 'medium',
          category: 'Performance',
          score: -2,
          issue: 'Cache-Control not found in headers',
          file: 'public/_headers',
          fix: 'Add Cache-Control headers'
        });
        console.log('   ⚠️  Cache-Control not configured (-2 points)');
      } else {
        console.log('   ✅ Cache policy configured');
      }
    }
    console.log();
  }

  // 检查 6: Next.js 配置
  async checkNextConfig() {
    console.log('⚙️  Checking Next.js config...');
    const configPath = path.join(this.basePath, 'next.config.ts');
    
    if (!fs.existsSync(configPath)) {
      console.log('   ⚠️  next.config.ts not found\n');
      return;
    }

    const content = fs.readFileSync(configPath, 'utf-8');
    
    // 检查 poweredByHeader
    if (!content.includes('poweredByHeader') || content.includes('poweredByHeader: true')) {
      this.issues.push({
        severity: 'low',
        category: 'Best Practices',
        score: -2,
        issue: 'X-Powered-By header not disabled',
        file: 'next.config.ts',
        fix: 'Add poweredByHeader: false'
      });
      console.log('   ⚠️  X-Powered-By header not disabled (-2 points)');
    }

    // 检查 compress
    if (!content.includes('compress')) {
      this.issues.push({
        severity: 'low',
        category: 'Performance',
        score: -1,
        issue: 'Compression not explicitly enabled',
        file: 'next.config.ts',
        fix: 'Add compress: true'
      });
      console.log('   ℹ️  Compression not explicitly enabled (-1 point)');
    }

    if (this.issues.filter(i => i.file === 'next.config.ts').length === 0) {
      console.log('   ✅ Next.js config optimized');
    }
    console.log();
  }

  // 检查 7: 静态导出配置
  async checkStaticExport() {
    console.log('📦 Checking static export config...');
    const routeFiles = ['sitemap.ts', 'robots.ts', 'manifest.ts'];
    let hasIssues = false;

    for (const file of routeFiles) {
      const filePath = path.join(this.basePath, 'app', file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        if (!content.includes('force-static')) {
          this.issues.push({
            severity: 'high',
            category: 'SEO',
            score: -5,
            issue: `Missing force-static in ${file}`,
            file: `app/${file}`,
            fix: 'Add: export const dynamic = "force-static"'
          });
          console.log(`   ⚠️  app/${file}: missing force-static (-5 points)`);
          hasIssues = true;
        }
      }
    }

    if (!hasIssues) {
      console.log('   ✅ Static export properly configured');
    }
    console.log();
  }

  // 检查 8: 图片优化
  async checkImageOptimization() {
    console.log('🖼️  Checking image optimization...');
    const componentFiles = this.getComponentFiles();
    let hasIssues = false;

    for (const file of componentFiles) {
      const content = fs.readFileSync(path.join(this.basePath, file), 'utf-8');
      
      // 检查是否使用了 <img> 而不是 Next.js Image
      const imgTags = content.match(/<img[^>]+src=/g);
      if (imgTags && imgTags.length > 0 && !content.includes('next/image')) {
        this.issues.push({
          severity: 'medium',
          category: 'Performance',
          score: -2,
          issue: `Using <img> tag instead of Next.js Image`,
          file: file,
          fix: 'Use Next.js Image component for optimization'
        });
        console.log(`   ⚠️  ${file}: Using <img> tag (-2 points)`);
        hasIssues = true;
      }
    }

    if (!hasIssues) {
      console.log('   ✅ Images properly optimized');
    }
    console.log();
  }

  // 生成报告
  generateReport() {
    console.log('═'.repeat(60));
    console.log('📊 Optimization Report\n');

    // 按类别分组
    const categories = {
      'Best Practices': [],
      'Accessibility': [],
      'Performance': [],
      'SEO': []
    };

    this.issues.forEach(issue => {
      categories[issue.category].push(issue);
    });

    // 计算分数影响
    let totalImpact = 0;
    Object.entries(categories).forEach(([category, issues]) => {
      if (issues.length > 0) {
        const categoryImpact = issues.reduce((sum, i) => sum + i.score, 0);
        totalImpact += categoryImpact;
        
        console.log(`${this.getCategoryIcon(category)} ${category}: ${categoryImpact} points`);
        issues.forEach(issue => {
          console.log(`   ${this.getSeverityIcon(issue.severity)} ${issue.issue}`);
          console.log(`      📁 ${issue.file}`);
          console.log(`      💡 ${issue.fix}`);
        });
        console.log();
      }
    });

    // 总结
    console.log('═'.repeat(60));
    console.log('\n📈 Score Impact Summary\n');
    
    const estimatedScore = 100 + totalImpact;
    console.log(`Total Issues: ${this.issues.length}`);
    console.log(`Estimated Score Impact: ${totalImpact} points`);
    console.log(`Current Estimated Score: ${estimatedScore}/100`);
    
    if (estimatedScore >= 90) {
      console.log('\n🎉 Great! Your score is excellent!');
    } else if (estimatedScore >= 80) {
      console.log('\n👍 Good score, but there\'s room for improvement.');
    } else {
      console.log('\n⚠️  Score needs improvement. Please fix the issues above.');
    }

    console.log('\n💡 Run "npm run lighthouse-fix" to auto-fix some issues\n');
  }

  // 辅助方法
  getComponentFiles() {
    const files = [];
    const scanDir = (dir) => {
      if (!fs.existsSync(dir)) return;
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const relativePath = path.relative(this.basePath, fullPath);
        if (fs.statSync(fullPath).isDirectory()) {
          scanDir(fullPath);
        } else if (item.match(/\.(tsx|jsx)$/)) {
          files.push(relativePath);
        }
      });
    };
    
    scanDir(path.join(this.basePath, 'app'));
    scanDir(path.join(this.basePath, 'components'));
    return files;
  }

  getCategoryIcon(category) {
    const icons = {
      'Best Practices': '🛡️',
      'Accessibility': '♿',
      'Performance': '⚡',
      'SEO': '🔍'
    };
    return icons[category] || '📌';
  }

  getSeverityIcon(severity) {
    const icons = {
      'critical': '🔴',
      'high': '🟠',
      'medium': '🟡',
      'low': '🔵'
    };
    return icons[severity] || '⚪';
  }
}

// 运行脚本
if (require.main === module) {
  const optimizer = new LighthouseOptimizer();
  optimizer.run().catch(console.error);
}

module.exports = LighthouseOptimizer;

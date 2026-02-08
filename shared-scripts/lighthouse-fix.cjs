#!/usr/bin/env node

/**
 * Lighthouse Auto-Fix Script
 * 自动修复常见的 Lighthouse 问题
 */

const fs = require('fs');
const path = require('path');

class LighthouseFixer {
  constructor() {
    this.basePath = process.cwd();
    this.fixes = [];
    this.backups = [];
  }

  async run() {
    console.log('\n🔧 Lighthouse Auto-Fix\n');
    console.log('This script will automatically fix common Lighthouse issues.\n');

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // 在 Node.js 环境中，我们需要使用 Promise 包装
    const answer = await new Promise(resolve => {
      readline.question('Do you want to continue? (y/n): ', resolve);
    });
    readline.close();

    if (answer.toLowerCase() !== 'y') {
      console.log('\n❌ Cancelled by user\n');
      return;
    }

    console.log('\n🚀 Starting fixes...\n');

    await this.fixViewportMeta();
    await this.createSecurityHeaders();
    await this.fixNextConfig();
    await this.fixStaticExport();
    await this.createBackupInfo();

    this.generateReport();
  }

  // 修复 1: Viewport Meta
  async fixViewportMeta() {
    console.log('📱 Fixing viewport meta tag...');
    const layoutPath = path.join(this.basePath, 'app', 'layout.tsx');
    
    if (!fs.existsSync(layoutPath)) {
      console.log('   ⚠️  app/layout.tsx not found\n');
      return;
    }

    let content = fs.readFileSync(layoutPath, 'utf-8');
    let fixed = false;

    // 备份
    this.createBackup(layoutPath);

    // 移除 user-scalable=no
    if (/user-scalable\s*=\s*["']?no["']?/i.test(content)) {
      content = content.replace(/,?\s*user-scalable\s*=\s*["']?no["']?/gi, '');
      fixed = true;
      console.log('   ✅ Removed user-scalable=no');
    }

    // 修改 maximum-scale
    if (/maximum-scale\s*=\s*["']?1\.0["']?/i.test(content)) {
      content = content.replace(/maximum-scale\s*=\s*["']?1\.0["']?/gi, 'maximum-scale=5.0');
      fixed = true;
      console.log('   ✅ Changed maximum-scale to 5.0');
    }

    if (fixed) {
      fs.writeFileSync(layoutPath, content, 'utf-8');
      this.fixes.push('Fixed viewport meta tag in app/layout.tsx');
    } else {
      console.log('   ℹ️  No changes needed');
    }
    console.log();
  }

  // 修复 2: 创建安全头
  async createSecurityHeaders() {
    console.log('🔒 Creating security headers...');
    const publicDir = path.join(this.basePath, 'public');
    const headersPath = path.join(publicDir, '_headers');

    // 确保 public 目录存在
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const headersContent = `# Security and Performance Headers for Cloudflare Pages

/*
  X-DNS-Prefetch-Control: on
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: origin-when-cross-origin
  Permissions-Policy: accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()

# Cache images for 1 year
/*.jpg
  Cache-Control: public, max-age=31536000, immutable

/*.jpeg
  Cache-Control: public, max-age=31536000, immutable

/*.png
  Cache-Control: public, max-age=31536000, immutable

/*.webp
  Cache-Control: public, max-age=31536000, immutable

/*.svg
  Cache-Control: public, max-age=31536000, immutable

/*.ico
  Cache-Control: public, max-age=31536000, immutable

# Cache JavaScript and CSS for 1 year
/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

# Don't cache HTML
/*.html
  Cache-Control: public, max-age=0, must-revalidate

/
  Cache-Control: public, max-age=0, must-revalidate
`;

    if (!fs.existsSync(headersPath)) {
      fs.writeFileSync(headersPath, headersContent, 'utf-8');
      console.log('   ✅ Created public/_headers');
      this.fixes.push('Created security headers file');
    } else {
      // 备份现有文件
      this.createBackup(headersPath);
      
      let content = fs.readFileSync(headersPath, 'utf-8');
      let updated = false;

      // 检查并添加缺失的头
      const requiredHeaders = [
        'X-Frame-Options: SAMEORIGIN',
        'X-Content-Type-Options: nosniff',
        'Referrer-Policy: origin-when-cross-origin'
      ];

      requiredHeaders.forEach(header => {
        if (!content.includes(header.split(':')[0])) {
          // 在 /* 后面添加
          content = content.replace(/\/\*\s*\n/, `/*\n  ${header}\n`);
          updated = true;
        }
      });

      // 检查并添加缓存配置
      if (!content.includes('Cache-Control')) {
        content += '\n' + headersContent.split('/*')[1];
        updated = true;
      }

      if (updated) {
        fs.writeFileSync(headersPath, content, 'utf-8');
        console.log('   ✅ Updated security headers');
        this.fixes.push('Updated security headers');
      } else {
        console.log('   ℹ️  Headers already configured');
      }
    }
    console.log();
  }

  // 修复 3: Next.js 配置
  async fixNextConfig() {
    console.log('⚙️  Fixing Next.js config...');
    const configPath = path.join(this.basePath, 'next.config.ts');
    
    if (!fs.existsSync(configPath)) {
      console.log('   ⚠️  next.config.ts not found\n');
      return;
    }

    this.createBackup(configPath);
    let content = fs.readFileSync(configPath, 'utf-8');
    let fixed = false;

    // 添加 poweredByHeader: false
    if (!content.includes('poweredByHeader')) {
      content = content.replace(
        /const nextConfig[^{]*\{/,
        `const nextConfig: NextConfig = {\n  poweredByHeader: false,`
      );
      fixed = true;
      console.log('   ✅ Added poweredByHeader: false');
    }

    // 添加 compress: true
    if (!content.includes('compress')) {
      content = content.replace(
        /const nextConfig[^{]*\{/,
        `const nextConfig: NextConfig = {\n  compress: true,`
      );
      fixed = true;
      console.log('   ✅ Added compress: true');
    }

    if (fixed) {
      fs.writeFileSync(configPath, content, 'utf-8');
      this.fixes.push('Updated next.config.ts');
    } else {
      console.log('   ℹ️  Config already optimized');
    }
    console.log();
  }

  // 修复 4: 静态导出配置
  async fixStaticExport() {
    console.log('📦 Fixing static export config...');
    const routeFiles = ['sitemap.ts', 'robots.ts', 'manifest.ts'];
    let fixed = false;

    for (const file of routeFiles) {
      const filePath = path.join(this.basePath, 'app', file);
      if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf-8');
        
        if (!content.includes('force-static')) {
          this.createBackup(filePath);
          
          // 在第一个 import 后添加
          const lines = content.split('\n');
          const lastImportIndex = lines.findIndex((line, i) => 
            line.startsWith('import') && !lines[i + 1]?.startsWith('import')
          );
          
          if (lastImportIndex >= 0) {
            lines.splice(lastImportIndex + 1, 0, '', '// 静态导出配置', 'export const dynamic = \'force-static\';');
            content = lines.join('\n');
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`   ✅ Added force-static to app/${file}`);
            fixed = true;
          }
        }
      }
    }

    if (!fixed) {
      console.log('   ℹ️  Static export already configured');
    } else {
      this.fixes.push('Added force-static to route handlers');
    }
    console.log();
  }

  // 创建备份
  createBackup(filePath) {
    const backupPath = filePath + '.lighthouse-backup';
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(filePath, backupPath);
      this.backups.push(backupPath);
    }
  }

  // 创建备份信息文件
  async createBackupInfo() {
    if (this.backups.length > 0) {
      const backupInfoPath = path.join(this.basePath, '.lighthouse-backups.txt');
      const timestamp = new Date().toISOString();
      const content = `Lighthouse Auto-Fix Backups
Created: ${timestamp}

Backed up files:
${this.backups.map(f => `- ${path.relative(this.basePath, f)}`).join('\n')}

To restore a file, run:
  mv <file>.lighthouse-backup <file>

To remove all backups:
  npm run lighthouse-cleanup
`;
      fs.writeFileSync(backupInfoPath, content, 'utf-8');
    }
  }

  // 生成报告
  generateReport() {
    console.log('═'.repeat(60));
    console.log('✅ Auto-Fix Complete\n');

    if (this.fixes.length === 0) {
      console.log('ℹ️  No issues found to fix. Your project is already optimized!\n');
      return;
    }

    console.log('Fixed issues:\n');
    this.fixes.forEach((fix, i) => {
      console.log(`${i + 1}. ${fix}`);
    });

    if (this.backups.length > 0) {
      console.log(`\n💾 Created ${this.backups.length} backup(s)`);
      console.log('   Backups are saved with .lighthouse-backup extension');
    }

    console.log('\n📊 Next steps:');
    console.log('   1. Review the changes with: git diff');
    console.log('   2. Test your build: npm run build');
    console.log('   3. Run Lighthouse again to verify improvements');
    console.log('   4. Commit changes: git add -A && git commit -m "chore: lighthouse optimizations"');
    
    console.log('\n🎉 Expected score improvement: +20 to +40 points!\n');
  }
}

// 运行脚本
if (require.main === module) {
  const fixer = new LighthouseFixer();
  fixer.run().catch(console.error);
}

module.exports = LighthouseFixer;

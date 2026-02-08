#!/usr/bin/env node

/**
 * Lighthouse Cleanup Script
 * 清理备份文件和恢复原始文件
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

class LighthouseCleanup {
  constructor() {
    this.basePath = process.cwd();
  }

  async run(action = 'list') {
    console.log('\n🧹 Lighthouse Cleanup\n');

    const backupFiles = glob.sync('**/*.lighthouse-backup', {
      cwd: this.basePath,
      absolute: true,
      ignore: ['node_modules/**', '.next/**', 'out/**']
    });

    if (backupFiles.length === 0) {
      console.log('✅ No backup files found\n');
      return;
    }

    if (action === 'list') {
      console.log(`Found ${backupFiles.length} backup file(s):\n`);
      backupFiles.forEach((file, i) => {
        const relativePath = path.relative(this.basePath, file);
        console.log(`${i + 1}. ${relativePath}`);
      });
      console.log('\nUsage:');
      console.log('  npm run lighthouse-cleanup        # List backups');
      console.log('  npm run lighthouse-cleanup remove # Remove all backups');
      console.log('  npm run lighthouse-cleanup restore # Restore from backups\n');
    } else if (action === 'remove') {
      console.log(`Removing ${backupFiles.length} backup file(s)...\n`);
      backupFiles.forEach(file => {
        fs.unlinkSync(file);
        console.log(`✅ Removed: ${path.relative(this.basePath, file)}`);
      });
      
      const infoPath = path.join(this.basePath, '.lighthouse-backups.txt');
      if (fs.existsSync(infoPath)) {
        fs.unlinkSync(infoPath);
        console.log('✅ Removed: .lighthouse-backups.txt');
      }
      console.log('\n🎉 All backups removed\n');
    } else if (action === 'restore') {
      console.log(`Restoring ${backupFiles.length} file(s) from backup...\n`);
      backupFiles.forEach(backupFile => {
        const originalFile = backupFile.replace('.lighthouse-backup', '');
        fs.copyFileSync(backupFile, originalFile);
        console.log(`✅ Restored: ${path.relative(this.basePath, originalFile)}`);
      });
      console.log('\n🎉 All files restored from backups\n');
    }
  }
}

// 运行脚本
if (require.main === module) {
  const action = process.argv[2] || 'list';
  const cleanup = new LighthouseCleanup();
  cleanup.run(action).catch(console.error);
}

module.exports = LighthouseCleanup;

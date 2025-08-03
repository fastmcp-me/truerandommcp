#!/usr/bin/env node

/**
 * 自动化发布脚本
 * 使用方法: node publish.js [patch|minor|major]
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

const versionType = process.argv[2] || 'patch';

console.log('🚀 开始发布流程...\n');

try {
  // 1. 检查git状态
  console.log('📋 检查git状态...');
  try {
    const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
    if (gitStatus.trim()) {
      console.log('⚠️  警告: 有未提交的更改');
      console.log(gitStatus);
    }
  } catch (e) {
    console.log('ℹ️  未检测到git仓库');
  }

  // 2. 清理并构建
  console.log('\n🧹 清理旧构建...');
  execSync('npm run clean', { stdio: 'inherit' });
  
  console.log('\n🔨 构建项目...');
  execSync('npm run build', { stdio: 'inherit' });

  // 3. 更新版本
  console.log(`\n📈 更新版本 (${versionType})...`);
  const versionOutput = execSync(`npm version ${versionType}`, { encoding: 'utf8' });
  const newVersion = versionOutput.trim().replace('v', '');
  console.log(`✅ 新版本: ${newVersion}`);

  // 4. 检查包内容
  console.log('\n📦 检查包内容...');
  execSync('npm pack --dry-run', { stdio: 'inherit' });

  // 5. 确认发布
  console.log('\n❓ 确认发布? (y/N)');
  
  // 在实际使用中，您可能想要添加交互式确认
  // 这里我们直接发布
  console.log('🚀 发布到npm...');
  execSync('npm publish', { stdio: 'inherit' });

  console.log('\n🎉 发布成功!');
  console.log(`📦 包名: random-org-mcp-server@${newVersion}`);
  console.log('🔗 查看: https://www.npmjs.com/package/random-org-mcp-server');

  // 6. 推送git标签（如果有git仓库）
  try {
    console.log('\n📤 推送git标签...');
    execSync('git push --follow-tags', { stdio: 'inherit' });
    console.log('✅ Git标签已推送');
  } catch (e) {
    console.log('ℹ️  跳过git推送');
  }

} catch (error) {
  console.error('\n❌ 发布失败:', error.message);
  process.exit(1);
}

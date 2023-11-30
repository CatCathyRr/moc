const { execSync } = require('child_process');
const fs = require('fs');

// 获取Git提交哈希
const gitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();

// 获取当前日期
const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');

// 生成版本号
const version = `${currentDate}-${gitHash}`;

// 将版本号写入一个文件
fs.writeFileSync('version.json', JSON.stringify({ version }));

console.log(`生成的版本号: ${version}`);

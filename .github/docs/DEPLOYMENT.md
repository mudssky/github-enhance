# 部署说明

## 🚀 自动发布到 GitHub Release

本项目已配置完整的自动发布流程，当代码推送到 `main` 分支时会自动：

1. **版本管理** - 基于提交信息自动确定版本号
2. **构建脚本** - 自动构建用户脚本文件
3. **创建发布** - 在 GitHub 创建新的 Release
4. **上传文件** - 将用户脚本文件上传到 Release
5. **更新文档** - 自动更新 CHANGELOG.md

## 📝 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
# 新功能 (次要版本 1.x.0)
git commit -m "feat: 添加新的外部服务支持"

# 修复问题 (补丁版本 1.0.x)
git commit -m "fix: 修复下拉菜单显示问题"

# 破坏性变更 (主要版本 x.0.0)
git commit -m "feat!: 重构组件架构"
```

## 🔗 用户安装链接

用户可以通过以下链接安装最新版本：

```
https://github.com/mudssky/github-enhance/releases/latest/download/github-enhance.user.js
```

## 🛠️ 本地测试

发布前建议本地测试：

```bash
# 安装依赖
pnpm install

# 运行测试
pnpm test

# 构建脚本
pnpm build

# 检查生成的文件
cat dist/github-enhance.user.js | head -20
```

## 📦 发布文件

每次发布包含：

- `github-enhance.user.js` - 用户脚本文件
- Release Notes - 基于提交信息生成
- 自动更新支持 - 用户脚本会自动检测更新

## 🔧 配置文件说明

- `.releaserc.cjs` - semantic-release 配置
- `.github/workflows/release.yml` - GitHub Actions 工作流
- `vite.config.ts` - 构建配置，包含用户脚本元数据
- `package.json` - 项目信息和版本号

## ⚠️ 注意事项

1. 只有推送到 `main` 分支才会触发发布
2. 提交信息必须符合 Conventional Commits 规范
3. 版本号会自动更新，无需手动修改
4. 发布失败时检查 GitHub Actions 日志

## 🎯 快速发布流程

1. 开发完成后提交代码：
   ```bash
   git add .
   git commit -m "feat: 添加新功能"
   git push origin main
   ```

2. GitHub Actions 自动执行发布

3. 用户可以从 Release 页面下载最新版本

4. Tampermonkey 会自动检测并提示更新
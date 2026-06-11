# DeepSeek Chrome Extension

基于 **WXT + React + TypeScript + Tailwind + Zustand** 的 DeepSeek Chrome 插件，通过网页端 Web API 实现与 [chat.deepseek.com](https://chat.deepseek.com) 的账号登录和会话同步。

## 功能

- Side Panel 聊天界面（左侧历史会话 + 中间对话区）
- 官方网页账号登录（邮箱 / Google / 微信）
- 与网页端共享会话列表和历史消息
- 流式回复、深度思考、联网搜索

## 技术栈

- WXT (Manifest V3)
- React 19 + TypeScript
- Tailwind CSS 4
- Zustand
- deepseek-driver（Web API / PoW / SSE）

## 开发

```bash
pnpm install
pnpm dev
```

然后在 Chrome 中打开 `chrome://extensions`，加载 `.output/chrome-mv3` 目录。

## 使用

1. 点击扩展图标打开 Side Panel
2. 点击「前往登录」，在 chat.deepseek.com 完成登录
3. 返回 Side Panel 即可看到历史会话并开始聊天

## 构建

```bash
pnpm build
pnpm zip
```

## 说明

本项目使用 DeepSeek 网页端非公开 API，仅供学习和个人使用。DeepSeek 可能随时调整接口实现。

**本扩展不是 DeepSeek 官方产品。**

## 上架 Chrome 网上应用店

- 隐私政策：[docs/PRIVACY.md](./docs/PRIVACY.md)
- 上架步骤与商店文案：[docs/CHROME_WEB_STORE.md](./docs/CHROME_WEB_STORE.md)

```bash
pnpm zip   # 生成可上传商店的 zip 包
```

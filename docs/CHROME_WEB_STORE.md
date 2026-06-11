# Chrome 网上应用店上架指南

本文档提供本扩展上架 Chrome Web Store 的步骤，以及可直接复制到开发者后台的文案。

---

## 一、发布前检查清单

- [ ] 执行 `pnpm build && pnpm zip`，确认 zip 可正常安装
- [ ] 更新 `package.json` 中的 `version`（每次上架新版本需递增）
- [ ] 准备 128×128 图标与至少 1 张截图（建议 1280×800）
- [ ] 将 [PRIVACY.md](./PRIVACY.md) 发布为可公开访问的 URL（见下文）
- [ ] 确认扩展名称含「非官方」等说明，避免商标误导

---

## 二、隐私政策公开 URL

Chrome 审核要求填写**隐私政策链接**。可选方案：

### 方案 A：GitHub Pages（推荐）

1. 仓库 Settings → Pages → Source 选 `Deploy from a branch`
2. Branch 选 `master`，目录选 `/docs`（或将 `PRIVACY.md` 放到 Pages 根目录）
3. 启用后 URL 类似：  
   `https://chenxiaochun.github.io/deepseek-chrome-extension/PRIVACY`  
   （若用 `/docs` 文件夹，需确保 Markdown 能访问；更简单是在 `docs/` 放 `privacy.html` 或把 PRIVACY.md 链接到 GitHub 渲染页）

### 方案 B：GitHub 仓库内 Markdown 直链

```
https://github.com/chenxiaochun/deepseek-chrome-extension/blob/master/docs/PRIVACY.md
```

部分审核可通过，但 Pages 独立域名更稳妥。

---

## 三、开发者后台填写文案

### 扩展名称（建议）

```
DeepSeek 侧边栏助手（非官方）
```

英文备选：

```
DeepSeek Side Chat (Unofficial)
```

### 简短说明（132 字符以内，manifest `description` 同步）

**中文：**

```
在浏览器侧边栏使用 DeepSeek 网页账号聊天，与 chat.deepseek.com 同步会话。非 DeepSeek 官方产品。
```

**English：**

```
Chat with your DeepSeek web account in the side panel, synced with chat.deepseek.com. Not official.
```

### 详细说明（商店「详细说明」栏）

**中文：**

```
DeepSeek 侧边栏助手（非官方）让您在 Chrome 侧边栏中使用已在 chat.deepseek.com 登录的账号进行对话。

【重要】本扩展不是 DeepSeek 官方产品，与 DeepSeek 公司无任何关联。

主要功能：
• 侧边栏聊天界面，布局接近网页端
• 与网页端共享会话列表与历史消息
• 支持快速模式 / 专家模式、深度思考、联网搜索
• 流式回复

使用方式：
1. 安装扩展后点击工具栏图标打开侧边栏
2. 点击「前往登录」，在官方站点 chat.deepseek.com 完成登录
3. 返回侧边栏即可开始聊天

隐私与安全：
• 不在扩展内收集账号密码
• 登录 Token 仅保存在您本机浏览器
• 数据仅请求 DeepSeek 官方域名 chat.deepseek.com
• 不含广告或第三方统计

本扩展使用 DeepSeek 网页端接口，仅供个人学习与交流。接口可能变更，功能不保证永久可用。
```

**English：**

```
DeepSeek Side Chat (Unofficial) lets you chat in Chrome's side panel using your existing chat.deepseek.com account.

IMPORTANT: This is NOT an official DeepSeek product.

Features:
• Side panel chat UI
• Sync sessions and history with the web app
• Fast / Expert modes, deep thinking, web search
• Streaming responses

How to use:
1. Click the extension icon to open the side panel
2. Sign in at chat.deepseek.com
3. Return to the side panel to chat

Privacy:
• No password collection in the extension
• Token stored locally only
• Network requests only to chat.deepseek.com
• No ads or third-party analytics

Uses unofficial web APIs for personal/educational use. APIs may change without notice.
```

---

## 四、权限用途说明（审核「隐私实践」）

在后台逐项填写，可参考：

| 权限 | 用途说明（中文） |
| ---- | ---------------- |
| storage | 在本地保存登录 Token 与用户主题偏好，不上传服务器。 |
| sidePanel | 在浏览器侧边栏显示聊天界面。 |
| webRequest | 当用户已在 chat.deepseek.com 登录时，读取该站点 API 请求的 Authorization 头以获取 Bearer Token，用于调用同一官方 API。 |
| cookies | 备用方式：从 chat.deepseek.com 的 Cookie 读取登录态。 |
| tabs | 打开官方登录页面 https://chat.deepseek.com。 |
| host_permissions (chat.deepseek.com) | 调用 DeepSeek 官方 Web API，同步会话与消息。 |

**单一用途（Single purpose）：**

```
在 Chrome 侧边栏中使用用户已在 chat.deepseek.com 登录的账号进行 AI 对话，并与网页端同步会话记录。
```

---

## 五、数据使用声明（Chrome 后台问卷）

按实际情况选择，建议：

| 问题 | 建议回答 |
| ---- | -------- |
| 是否收集个人身份信息 | 否（扩展不收集姓名、邮箱等；Token 为认证凭证，仅存本地） |
| 是否将数据出售给第三方 | 否 |
| 是否将数据用于非扩展核心功能 | 否 |
| 是否需隐私政策 | **是** — 填写 PRIVACY.md 的公开 URL |

数据收集说明（若需文字描述）：

```
本扩展仅在用户已登录 chat.deepseek.com 时，于本地保存 Bearer Token 以维持登录状态，并将聊天相关请求发送至 DeepSeek 官方服务器。不收集密码，不使用第三方分析服务。
```

---

## 六、打包与上传

```bash
pnpm install
pnpm build
pnpm zip
```

上传 `.output/` 目录下生成的 `*-chrome.zip` 到 [Chrome 开发者信息中心](https://chrome.google.com/webstore/devconsole)。

首次需支付 **$5** 注册开发者账号。

---

## 七、审核可能被拒的原因及对策

| 风险 | 对策 |
| ---- | ---- |
| 商标 / 误导用户 | 名称与描述中明确标注「非官方」 |
| webRequest 敏感权限 | 在权限说明中写清仅读取 chat.deepseek.com 的 Authorization |
| 缺少隐私政策 | 提供可访问的 PRIVACY.md URL |
| 功能与描述不符 | 截图与说明保持一致 |
| 非公开 API | 说明仅供个人学习，不声称官方背书 |

---

## 八、版本更新

1. 修改 `package.json` 的 `version`
2. `pnpm zip`
3. 开发者后台 → 上传新包 → 填写更新说明 → 提交审核

---

## 九、相关链接

- [Chrome Web Store 开发者文档](https://developer.chrome.com/docs/webstore)
- [程序政策](https://developer.chrome.com/docs/webstore/program-policies)
- [隐私政策要求](https://developer.chrome.com/docs/webstore/program-policies/privacy)

# 隐私政策

**生效日期：** 2026 年 6 月 11 日  
**扩展名称：** DeepSeek 侧边栏助手（非官方）  
**开发者：** chenxiaochun（个人开发者）

本隐私政策说明「DeepSeek 侧边栏助手（非官方）」（以下简称「本扩展」）如何收集、使用与存储您的信息。

> **重要声明：** 本扩展**不是** DeepSeek 官方产品，与 DeepSeek 及其关联公司无任何隶属或授权关系。您使用本扩展即表示理解并同意本政策。

---

## 1. 我们收集哪些信息

本扩展**不会**要求您在本扩展内输入 DeepSeek 账号或密码。

在您已在浏览器中登录 [chat.deepseek.com](https://chat.deepseek.com) 的前提下，本扩展可能处理以下信息：

| 数据类型 | 说明 |
| -------- | ---- |
| 登录凭证（Bearer Token） | 从您对 `chat.deepseek.com` 的 API 请求中读取，用于代表您调用同一官方 Web API |
| 会话与消息内容 | 通过官方 API 拉取或发送，用于在侧边栏展示与同步 |
| 本地偏好设置 | 例如主题选择，保存在浏览器本地 |

本扩展**不**收集姓名、邮箱、密码、支付信息，也**不**运行独立的账号注册或登录表单。

---

## 2. 信息存储在哪里

- **登录 Token：** 仅保存在您本机 Chrome 的 `chrome.storage.local`（键名 `deepseekToken`），不会上传至开发者自有服务器。
- **主题等设置：** 同样仅保存在本机 `chrome.storage.local`。
- **会话与消息：** 由 DeepSeek 官方服务存储；本扩展仅在内存中临时展示，不另建远程数据库。

---

## 3. 信息会发送到哪里

本扩展的网络请求**仅**发往：

- `https://chat.deepseek.com`（DeepSeek 官方聊天服务）

**不会**将您的 Token、会话或消息发送给开发者服务器或任何其他第三方分析/广告服务。

本扩展**不包含**第三方统计、广告或崩溃上报 SDK。

---

## 4. 权限用途说明

| 权限 | 用途 |
| ---- | ---- |
| `storage` | 本地保存登录 Token 与主题偏好 |
| `sidePanel` | 在浏览器侧边栏显示聊天界面 |
| `webRequest` | 在用户已登录官方站点时，读取 API 请求中的 Authorization 头以获取 Token |
| `cookies` | 在 Token 不可用时，尝试从官方站点 Cookie 读取登录态（备用） |
| `tabs` | 打开官方登录页 `chat.deepseek.com` |
| `host_permissions: chat.deepseek.com` | 调用官方 API、读取该站点登录相关数据 |

---

## 5. 数据共享

我们不会出售、出租或向第三方共享您的个人数据。

唯一的数据传输对象是 **DeepSeek 官方服务**，且为您主动使用聊天功能所必需，等同于您直接在官网操作。

---

## 6. 数据保留与删除

- 卸载本扩展后，本机 `chrome.storage.local` 中的相关数据将随扩展一并清除（以 Chrome 行为为准）。
- 您可在扩展内点击「退出登录」清除本地 Token。
- 聊天记录的保留与删除遵循 DeepSeek 官方服务规则。

---

## 7. 儿童隐私

本扩展不面向 13 岁以下儿童，也不会故意收集儿童信息。

---

## 8. 安全说明

- Token 仅用于访问您已授权的 DeepSeek 账号。
- 请勿在不可信环境安装来路不明的扩展版本。
- 本扩展开源，您可自行审查代码。

---

## 9. 政策变更

我们可能更新本政策。重大变更时，会在项目仓库或扩展更新说明中注明新的生效日期。

---

## 10. 联系我们

如有隐私相关问题，请通过 GitHub Issues 联系：  
[https://github.com/chenxiaochun/deepseek-chrome-extension/issues](https://github.com/chenxiaochun/deepseek-chrome-extension/issues)

---

## Privacy Policy (English Summary)

This unofficial extension is **not** affiliated with DeepSeek.

- We do **not** collect passwords or run our own login server.
- When you are logged in to chat.deepseek.com, we read the Bearer token from that site's API requests and store it **locally only** (`chrome.storage.local`).
- Chat data is sent **only** to `https://chat.deepseek.com`.
- We do **not** sell data or use third-party analytics.
- Uninstalling the extension or using "Log out" removes local credentials.

For questions: open an issue on the GitHub repository above.

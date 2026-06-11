import {
  extractTokenFromRequestHeaders,
  cacheTokenToExtensionStorage,
} from 'deepseek-driver';

export default defineBackground(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

  chrome.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
      const token = extractTokenFromRequestHeaders(details.requestHeaders);
      if (token) {
        void cacheTokenToExtensionStorage(token);
        void chrome.runtime.sendMessage({ type: 'TOKEN_UPDATED' }).catch(() => {});
      }
    },
    { urls: ['https://chat.deepseek.com/api/*'] },
    ['requestHeaders'],
  );

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === 'OPEN_LOGIN') {
      void chrome.tabs.create({ url: 'https://chat.deepseek.com' });
      sendResponse({ ok: true });
      return true;
    }

    if (message.type === 'GET_TOKEN') {
      void chrome.storage.local.get(['deepseekToken']).then((result) => {
        sendResponse({ token: result.deepseekToken ?? null });
      });
      return true;
    }

    return false;
  });
});

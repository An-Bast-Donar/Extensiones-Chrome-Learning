chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && /^https/.test(tab.url)) {
    chrome.scripting
      .executeScript({
        target: { tabId: tabId },
        files: ["./buscaGoogle.js"],
      })
      .then(() => {
        console.log("INJECTED THE FOREGROUND SCRIPT.");
      })
      .catch((err) => {console.log("error:", err)});
  }
});
